import { place_frame, getFramePlacing, toggleFramePlacing } from './frames.js';
import {getForwardVector, getSideVector} from './vectors.js'

let keyStates = {};

export function setup_listeners(document, camera, window, renderer) {

    document.addEventListener( 'keydown', ( event ) => {

        keyStates[ event.code ] = true;

        if (event.code == "KeyT")
            if (getFramePlacing())
                toggleFramePlacing()
            else
                place_frame();

    });

    document.addEventListener( 'keyup', ( event ) => {

        keyStates[ event.code ] = false;

    } );

    document.addEventListener( 'mousedown', () => {


        // if ( document.pointerLockElement === document.body && getFramePlacing() ) {
        //     place
        // }
    } );

    window.addEventListener( 'resize', onWindowResize );

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

export function controls( deltaTime, playerVelocity, camera, playerDirection ) {

    const speedDelta = deltaTime * 250;

    playerVelocity.x = 0;
    playerVelocity.y = 0;
    playerVelocity.z = 0;

    if ( keyStates[ 'KeyW' ] ) {

        playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( speedDelta ) );

    }

    if ( keyStates[ 'KeyS' ] ) {

        playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( - speedDelta ) );

    }

    if ( keyStates[ 'KeyA' ] ) {

        playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( - speedDelta ) );

    }

    if ( keyStates[ 'KeyD' ] ) {

        playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( speedDelta ) );

    }

    return playerVelocity;
}