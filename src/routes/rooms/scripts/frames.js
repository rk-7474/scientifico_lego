import "jquery";
import * as THREE from 'three'
import { addToScene, removeFromScene } from "./index.js";
import { get_thumbnail, load_image } from "./image_loader.js";
import { getInteractingFrame } from "./raycast.js";
import { updateFrames } from "./api.js";

let ids = 0;

export const ROOM_ID = new URLSearchParams(window.location.search).get('id');

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
    $("#url > input").val("");

    $("#url").fadeIn(500);
    $("#url").css("display", "flex")

    $("#cursor").hide();

    document.exitPointerLock();

    input_mode = true;

    await handleInputKeys();

    await new Promise(resolve => $(".container").fadeOut(500, resolve));

    let url = $("#url > input").val();

    if (exited_input || !url) { 
        input_mode = false;
        $("#cursor").show();
        return;
    }

    // const url = "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    
    startFramePlacing(url);
}

async function askInfo() {
    $("#title").val("");
    $("#desc").val("");
    $("#tag").val("");

    $("#info").fadeIn(500);
    $("#info").css("display", "flex")

    document.exitPointerLock();

    await handleInputKeys();

    await new Promise(resolve => $(".container").fadeOut(500, resolve));

    const title = $("input#title").val()
    const desc = $("input#desc").val()
    const tag = $("input#tag").val()

    if (exited_input)
        return false;


    return {title, desc, tag};
}

let frame_placing = false;

//Funzione che muove il frame a seconda del cursore fino a quando non viene confermato
export const startFramePlacing = async (url) => {
    const info = await askInfo();

    if (info == false) {
        input_mode = false;
        $("#cursor").show();
        return;
    }


    const {title, desc, tag} = info;

    let data = await createFrame(url);

    $("#cursor").show();

    input_mode = false;

    document.exitPointerLock();

    if (!data) {
        input_mode = false;
        $("#cursor").show();
        return;
    }

    console.log(data)

    input_mode = true; 

    frame_placing = true;

    const scale = await resizeFrame(currentFrame);
    data = {...data, scale, title, desc, tags: tag.split(" ")};

    input_mode = false;

    frames.push(data);

    await new Promise(resolve => {
        $(document).one("mousedown", event => {
            resolve();
        });
    });

    stopFramePlacing(true);

    updateFrames(ROOM_ID, frames);
} 

export const stopFramePlacing = (confirmed) => {
    frame_placing = false;

    if (!confirmed || currentFrame.position.y === -10) {
        removeFromScene(currentFrame);
        frames.pop();
    }
}

export const toggleFramePlacing = () => {
    frame_placing ? stopFramePlacing() : startFramePlacing();
} 

export const getFramePlacing = () => frame_placing;
export const getFrame        = () => currentFrame;
export const getFrames       = () => frames;
export const setFrames       = (new_frames) => frames = new_frames;
export const addFrame        = (frametoadd) => frames.push(frametoadd);

let visualizeMode = false;

export async function toggleVisualizeFrame() {
    visualizeMode = !visualizeMode;

    if (visualizeMode) {
        const {content, title, type, desc} = getInteractingFrame();

        $(".center").children("img").hide();
        
        if (type === "youtube") {
            const src = `https://www.youtube.com/embed/${content.substring(32, content.length)}?&controls=0&rel=0`
            $(".center").append(
                `<iframe class="frame" style='width:40vw' src="${src}" frameborder="0" allowfullscreen></iframe>`
            )
            document.exitPointerLock();
        } else {
            $(".center").append(
                `<div class="frame">
                    <img src="${content}"/>
                    <div class="frameinfo">
                        <h1>${title}</h1>
                        <p>${desc}</p>
                    <div>
                </div>`
            )
           
            // side === "w" ? $(".frame").css("width", "40%") : $(".frame").css("height", "40%"); 
        }

        $(".frame").fadeIn(250);
    
        if (type !== "youtube") 
            $(".frame").css("display", "flex")
        
    } else {
        await new Promise(resolve => $(".center").children(".frame").fadeOut(250, resolve));
        $(".center").children(".frame").remove();
        $(".center").children("img").show();

        document.body.requestPointerLock();
    }

}

export const getVisualizeMode = () => visualizeMode;

export function removeFrame() {
    const temp_frame = getInteractingFrame();
    removeFromScene(temp_frame.object);
    const index = frames.findIndex(e => e.uuid === temp_frame.uuid);
    frames.splice(index, 1);

    updateFrames(ROOM_ID, frames)
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
    console.log(url)
    const [type, image] = validateUrl(url);
    const image_data = await load_image(image);

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

const resizeFrame = async (frame) => {
    $('#resizer').fadeIn(300);
    $("#resizer").css("display", "flex")
    let scale = 0;
    $('.slider').on('change', function(e) {
        scale = e.target.value/100;
        frame.scale.set(scale, scale, 1);
    });
    await new Promise(resolve => 
        $('#resizer > button').click(() => {
            resolve();
        })    
    )
    $('.slider').unbind();
    $('#resizer > button').unbind();
    $('#resizer').fadeOut(300);
    return scale;
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