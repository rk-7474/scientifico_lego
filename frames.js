import $ from "jquery";
import * as THREE from 'three'
import { addToScene, removeFromScene } from "./index.js";
import { get_thumbnail, load_image } from "./image_loader.js";
import { getInteractingFrame } from "./raycast.js";

let currentFrame;

let frames = []

let input_mode = false;

export const getInputMode = () => input_mode;

export async function place_frame() {
    $(".container").fadeIn(500);
    $(".container").css("display", "flex")

    $("img").hide();

    document.exitPointerLock();

    input_mode = true;

    await new Promise(resolve => {
        $("button").one("click", event => {
            resolve();
        });
    });

    input_mode = false;

    const url = $("input").val();

    document.body.requestPointerLock();

    await new Promise(resolve => $(".container").fadeOut(500, resolve));
    $("img").show();

    if (url == "")
        return;
    else if (url.includes("youtube.com/watch?v="))
        var image = get_thumbnail(url);
    else
        var image = url;

    const [material, size] = await load_image(image);

    const [width, height] = reduce(size.width, size.height);

    const geometry = new THREE.BoxGeometry( width, height, 0.01 );
    currentFrame = new THREE.Mesh( geometry, material );
    
    // frame.position.y = 1.0;
    // frame.position.x = 2.85;

    addToScene(currentFrame);

    frames.push( { object: currentFrame, content: url, side: width > height ? "w" : "h" } )

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
} 

export const stopFramePlacing = (confirmed) => {
    frame_placing = false;

    if (!confirmed) {
        currentFrame.position.set( 0, -10, 0 );
    }
}

export const toggleFramePlacing = () => {
    frame_placing ? stopFramePlacing() : startFramePlacing();
} 

export const getFramePlacing = () => frame_placing;
export const getFrame        = () => currentFrame;
export const getFrames       = () => frames;

let visualizeMode = false;

export async function toggleVisualizeFrame() {
    visualizeMode = !visualizeMode;
    if (visualizeMode) {
        const {content} = getInteractingFrame();
        $(".center").children("img").hide();
        $(".center").append(
            `<img class="frame" src="${content}"/>`
        )
        $(".frame").fadeIn(250);
        frames.at(-1) === "w" ? $(".frame").css("width", "80vw") : $(".frame").css("height", "80vh"); 
    } else {
        await new Promise(resolve => $(".frame").fadeOut(250, resolve));
        $(".center").children(".frame").remove();
        $(".center").children("img").show();
    }

}

export const getVisualizeMode = () => visualizeMode;

export function removeFrame() {
    const temp_frame = getInteractingFrame();
    removeFromScene(temp_frame.object);
    const index = frames.findIndex(e => e.content === temp_frame.content);
    frames.splice(index, 1);
    console.log(index)
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
  