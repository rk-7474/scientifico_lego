import * as THREE from 'three';
import { getRoom } from "./index";
import { getFramePlacing, getFrame, getFrames } from './frames';
import { showNotify } from './notify';

let pointer = new THREE.Vector2(0, 0);
const raycaster = new THREE.Raycaster();

let show_notify = false;
let interacting_frame;  

export function updateRaycast( camera ) {

    const room = getRoom();
    const helper = getFrame();

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
            const faced_rotation = getFacedRotation( intersects[ 0 ].face.normal );
            if (faced_rotation != undefined) {
                const {x, y, z} = faced_rotation
                helper.rotation.set(x, y, z);
                helper.position.copy( intersects[ 0 ].point );
            }
            
        }
    }
}

const getFacedRotation = ({x, y, z}) => {
    if (x != 0 && y == 0 && z == 0) 
        return {y: Math.PI / 2, x: 0, z: 0};
    else if (x == 0 && y != 0 && z == 0) 
        return {z: 0, x: 0, y: 0};
    else if (x == 0 && y == 0 && z != 0) 
        return {x: Math.PI / 2, y: 0, z: 0};
}


export const getInteractingFrame = () => interacting_frame;

