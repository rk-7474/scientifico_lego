import * as THREE from 'three'
import { addToScene, removeFromScene } from "./index.js";
import { get_thumbnail, load_image } from "./image_loader.js";
import { getInteractingFrame } from "./raycast.js";
import { pushFrame, deleteFrame } from "./api.js";
import { showCursor, showInfoInput, showResize, frameImg, frameVideo} from './stores.js';
// videoFrameInner
let ids = 0;

export let ROOM_ID;

export const setRoomId = (id) => ROOM_ID = id;

let currentFrame;

let frames = []

let input_mode = false;

export const getInputMode = () => input_mode;

let exited_input = false;

const handleInputKeys = async () => {
    exited_input = false;

    await new Promise(resolve => {

        const completed = (event) => {
            $(this).off(event);
            document.body.requestPointerLock();
            resolve();  
        }

        $(document).on("keydown", event => {
            switch (event.key) {
                case "Escape":
                    exited_input = true;
                    completed(event);
                    return;
                case "Enter":
                    completed(event);
                    return;
            }    
        });
        
        $("button").one("click", event => {
            if (event.button === 0) completed(event);   
        })
    });
}

export async function placeFrame() {
    showCursor.update(() => false);

    showInfoInput.update(() => true);

    document.exitPointerLock();

    input_mode = true;

    // await new Promise(resolve => $(".container").fadeOut(500, resolve));
}

export function sendUpdate(form) {
    if (form?.done == "info") {
        startFramePlacing(form.info)
    }
}
let frame_placing = false;

let currentData;
//Funzione che muove il frame a seconda del cursore fino a quando non viene confermato
export const startFramePlacing = async (info) => {
    const {url, title, desc, tags} = info;

    let data = await createFrame(url);

    showCursor.update(() => true);

    input_mode = false;

    document.exitPointerLock();

    if (!data) {
        input_mode = false;
        return;
    }

    input_mode = true; 

    currentData = {...data, title, desc, scale: 1, tags: tags.split(" ")};

    frame_placing = true;

    showResize.update(() => true);
}

export const confirmResizer = () => {
    showResize.update(() => false);

    input_mode = false;
}

export const stopFramePlacing = (confirmed) => {
    frame_placing = false;

    if (!confirmed || currentFrame.position.y === -10) {
        removeFromScene(currentFrame);
        return
    }

    frames.push({...currentData, object: currentFrame});

    pushFrame(ROOM_ID, currentData);
}

export const toggleFramePlacing = () => {
    frame_placing ? stopFramePlacing() : startFramePlacing();
} 

export const getFramePlacing = () => frame_placing;
export const getFrame        = () => currentFrame;
export const getFrames       = () => frames;
export const setFrames       = (new_frames) => frames = new_frames;
export const setInputMode    = (state) => input_mode = state;
export const addFrame        = (frametoadd) => frames.push(frametoadd);

let visualizeMode = false;

export async function toggleVisualizeFrame() {
    visualizeMode = !visualizeMode;

    if (visualizeMode) {
        const {content, title, type, desc} = getInteractingFrame();

        // $(".center").children("img").hide();
        
        if (type === "youtube") {

            const src = `https://www.youtube.com/embed/${content.substring(32, content.length)}?&controls=0&rel=0`
            
            frameVideo.update(() => ({
                show: true, 
                inner: `
                    <iframe class="frame" style='width:60vw; height:60vh' src="${src}" frameborder="0" allowfullscreen></iframe>
                    <div class="frameinfo">
					    <h1>${title}</h1>
					    <p>${desc}</p>
				    </div>
                `
            }))

            document.exitPointerLock();
        } else {
            // $(".center").append(
            //     `<div class="frame">
            //         <img src="${content}"/>
            //         <div class="frameinfo">
            //             <h1>${title}</h1>
            //             <p>${desc}</p>
            //         <div>
            //     </div>`
            // )
           
            frameImg.update(() => ({
                show: true,
                content,
                title,
                desc
            }));

            // side === "w" ? $(".frame").css("width", "40%") : $(".frame").css("height", "40%"); 
        }

        // $(".frame").fadeIn(250);
    
        // if (type !== "youtube") 
        //     $(".frame").css("display", "flex")
        
    } else {
        // await new Promise(resolve => $(".center").children(".frame").fadeOut(250, resolve));
        // $(".center").children(".frame").remove();
        // $(".center").children("img").show();

        frameImg.update(() => ({
            show: false
        }));

        
        frameVideo.update(() => ({
            show: false, 
            inner: ``
        }))

        // videoFrameInner.update(() => ({show: false, inner: ""}))


        // frameVideo.update(() => ({
        //     show: false
        // }));

        document.body.requestPointerLock();
    }

}

export const getVisualizeMode = () => visualizeMode;


//TODO: da rifare
export function removeFrame() {
    const temp_frame = getInteractingFrame();
    removeFromScene(temp_frame.object);
    const index = frames.findIndex(e => e.id === temp_frame.id);
    frames.splice(index, 1);

    deleteFrame(ROOM_ID, temp_frame.id);
}

const validateUrl = (url) => {
    if (url == "")
        return;
    else if (url.includes("youtube.com/watch?v=")) {
        if (url.includes("&"))
            url = url.split("&")[0];

        var type = "youtube" 
        var image = get_thumbnail(url);
    } else {
        var type = "image" 
        var image = url;
    }
    return [type, image];
}
  
export const createFrame = async (url, position, rotation, scale) => {
    const [type, image] = validateUrl(url);
    const image_data = await load_image(image);

    console.log(url, position, rotation, scale)

    if (!image_data) return;

    const [material, size] = image_data;

    const [width, height] = reduce(size.width, size.height);

    const geometry = new THREE.BoxGeometry( width, height, 0.01 );
    const frame = new THREE.Mesh( geometry, material );

    if (position) {
        const {x, y, z} = position;
        frame.position.set( x, y, z );
    } else {
        frame.position.set( 0, -10, 0 );
    }

    if (rotation) {
        const {x, y, z} = rotation;
        frame.rotation.set( x, y, z );
    }

    if (scale) {
        frame.scale.set(scale, scale, 1);
    }

    addToScene(frame);
    currentFrame = frame;

    const data = { object: frame, type, content: url, width, height, side: width > height ? "w" : "h", uuid: ids++};

    return data;
}

export const handleResize = (e) => {
    const scale = e.target.value/100;
    currentFrame.scale.set(scale, scale, 1);

    currentData.scale = scale;
}


function reduce(numerator,denominator){
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);

    numerator /= gcd;
    denominator /= gcd;

    if (numerator > denominator) {
        return [ 2*numerator/denominator, 2 ]
    } else {
        return [ 1.5, 1.5*denominator/numerator ];
    }
}