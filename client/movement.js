import { place_frame, getFramePlacing, toggleFramePlacing } from './frames.js';
import {getForwardVector, getSideVector} from './vectors.js'
import { toggleVisualizeFrame, getVisualizeMode, removeFrame, getInputMode } from './frames.js';
import {getInteractingFrame} from './raycast.js'
import { gamepadConnected, gamepadMovement } from './gamepad.js';

let keyStates = {};

export function setup_listeners(document, camera, window, renderer) {

    document.addEventListener( 'keydown', ( event ) => { 

        if (event.code == "KeyE" && (getVisualizeMode() || getInteractingFrame() != null))
            toggleVisualizeFrame();
        
        else if (event.code == "KeyT")
            if (getFramePlacing())
                toggleFramePlacing()
            else
                place_frame();
        
        else if (event.code == "KeyY" && getInteractingFrame() != null)
            removeFrame();
    
        else if (!getInputMode())
            keyStates[ event.code ] = true;

    });

    document.addEventListener( 'keyup', ( event ) => {

        keyStates[ event.code ] = false;

    } );

    document.addEventListener( 'mousedown', () => {

        if (getInputMode()) return;

        if (getVisualizeMode()) 
            toggleVisualizeFrame()

        document.body.requestPointerLock();

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

    playerVelocity.set(0, 0, 0)

    if (!gamepadConnected()) {

        if ( keyStates[ 'KeyW' ] ) playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( speedDelta ) );

        if ( keyStates[ 'KeyS' ] ) playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( - speedDelta ) );

        if ( keyStates[ 'KeyA' ] ) playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( - speedDelta ) );

        if ( keyStates[ 'KeyD' ] ) playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( speedDelta ) );

        return playerVelocity;
    }


    const gamepad = gamepadMovement();

    playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( speedDelta * gamepad.y ) );

    playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( speedDelta * gamepad.x ) );

    return playerVelocity;
}