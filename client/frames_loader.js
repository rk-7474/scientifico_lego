import * as THREE from 'three'
import { addToScene } from './index.js';
import * as fs from 'fs';
import { setFrames } from './frames.js';

const DB_PATH = "./data.json";

const loader = new THREE.ObjectLoader();

export const loadFrame = (json_object) => {
    const object = loader.parse( json_object );
    addToScene( object );
}

export const loadRoom = async () => {
    const frames = fetchJson();
    
    for (const frame of frames)
        loadFrame(frame);

    setFrames(frames);
}
