import $ from "jquery";
import * as THREE from 'three'
import { addToScene } from "./index.js";
import { get_thumbnail, load_image } from "./image_loader.js";

let currentFrame;

let input_mode = false;

export const getInputMode = () => input_mode;

export async function place_frame() {
    $(".container").fadeIn(500);
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

    const material = await load_image(image);

    const geometry = new THREE.BoxGeometry( 3.2, 1.8, 0.01 );
    currentFrame = new THREE.Mesh( geometry, material );
    
    // frame.position.y = 1.0;
    // frame.position.x = 2.85;

    addToScene(currentFrame);

    startFramePlacing();
}

let frame_placing = false;

export const startFramePlacing = async () => {

    await new Promise(resolve => {
        $(document).one("mousedown", event => {
            resolve();
        });
    });

    frame_placing = true;
} 

export const stopFramePlacing = (confirmed) => {
    frame_placing = false;

    if (!confirmed) {
        currentFrame.position.set( 0,-10, 0 );
    }
}

export const toggleFramePlacing = () => {
    frame_placing ? stopFramePlacing() : startFramePlacing();
} 

export const getFramePlacing = () => frame_placing;
export const getFrame = () => currentFrame;

