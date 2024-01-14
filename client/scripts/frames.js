import "jquery";
import * as THREE from 'three'
import { addToScene, removeFromScene } from "./index.js";
import { get_thumbnail, load_image } from "./image_loader.js";
import { getInteractingFrame } from "./raycast.js";
import { updateFrames } from "./api.js";

let ids = 0;

export const ROOM_ID = "prova";

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
    $("input").val("");

    $(".container").fadeIn(500);
    $(".container").css("display", "flex")

    $("img").hide();

    document.exitPointerLock();

    input_mode = true;

    await handleInputKeys();

    input_mode = false;

    await new Promise(resolve => $(".container").fadeOut(500, resolve));
    $("img").show();

    if (exited_input) return;

    let url = $("input").val();

    // const url = "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    
    const temp = await createFrame(url);

    if(!temp) return;

    currentFrame = temp;
    // frame.position.y = 1.0;
    // frame.position.x = 2.85;

    addToScene(currentFrame);
    
    startFramePlacing();
}

let frame_placing = false;

export const startFramePlacing = async () => {
    frame_placing = true;

    await new Promise(resolve => {
        $(document).one("mousedown", event => {
            resolve();
        });
    });

    stopFramePlacing(true);

    updateFrames(ROOM_ID, frames)
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

let visualizeMode = false;

export async function toggleVisualizeFrame() {
    visualizeMode = !visualizeMode;

    if (visualizeMode) {
        const {content, side, type} = getInteractingFrame();

        $(".center").children("img").hide();
        
        if (type === "youtube") {
            const src = `https://www.youtube.com/embed/${content.substring(32, content.length)}?autoplay=1&controls=0&rel=0`
            $(".center").append(
                `<iframe class="frame" style='width:80vw; aspect-ratio: 16 / 9;' src="${src}" frameborder="0" allowfullscreen></iframe>`
            )
            document.exitPointerLock();
        } else {
            $(".center").append(
                `<img class="frame" src="${content}"/>`
            )
           
            side === "w" ? $(".frame").css("width", "80%") : $(".frame").css("height", "80%"); 
        }

        $(".frame").fadeIn(250);
        
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
  
export const createFrame = async (url, position, rotation) => {
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

    frames.push( { object: frame, type, content: url, side: width > height ? "w" : "h", uuid: ids++} )

    return frame;
}