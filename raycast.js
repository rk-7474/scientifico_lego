import * as THREE from 'three';
import { getRenderer, getRoom } from "./index";
import { getFramePlacing, getFrame } from './frames';

let pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export function onPointerMove( event, camera ) {

    if (!getFramePlacing()) return;

    const renderer = getRenderer();
    const room = getRoom();
    const helper = getFrame();
    pointer.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObject( room );

    if ( intersects.length > 0 ) {

        helper.position.set( 0, 0, 0 );
        helper.lookAt( intersects[ 0 ].face.normal );

        helper.position.copy( intersects[ 0 ].point );

    }
}

