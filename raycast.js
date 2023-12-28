import * as THREE from 'three';
import { getRenderer, getRoom } from "./index";
import { getFramePlacing, getFrame, getFrames } from './frames';
import { showNotify } from './notify';
import { getMouseEvent } from './camera.js';

let pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let show_notify = false;
let interacting_frame;  

export function updateRaycast( event, camera ) {

    const renderer = getRenderer();
    const room = getRoom();
    const helper = getFrame();
    const {clientX, clientY} = getMouseEvent();
    pointer.x = ( clientX / renderer.domElement.clientWidth ) * 2 - 1;
    pointer.y = - ( clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );  

    if (!getFramePlacing()) {

        show_notify = false;

        for (const frame of getFrames()) {
            const intersects = raycaster.intersectObject( frame.object );

            if ( intersects.length > 0 ) {
                show_notify = true;
                interacting_frame = frame;
            }
        }

        showNotify(show_notify);

        if (!show_notify)
            interacting_frame = null;
    } else {
        const intersects = raycaster.intersectObject( room );

        if ( intersects.length > 0 ) {
    
            helper.position.set( 0, 0, 0 );
            helper.lookAt( intersects[ 0 ].face.normal );
    
            helper.position.copy( intersects[ 0 ].point );
    
        }
    }
}

export const getInteractingFrame = () => interacting_frame;

