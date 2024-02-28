import { placeFrame, getFramePlacing, toggleFramePlacing } from './frames.js';
import {getForwardVector, getSideVector} from './vectors.js'
import { toggleVisualizeFrame, getVisualizeMode, removeFrame, getInputMode } from './frames.js';
import {getInteractingFrame} from './raycast.js'
import { gamepadConnected, gamepadMovement } from './gamepad.js';
import { getCamera, getRenderer } from './index.js';

let keyStates = {};


export function onKeyDown( event ) {
    if (event.code == "KeyE" && (getVisualizeMode() || getInteractingFrame() != null))
        toggleVisualizeFrame();
    
    else if (!getInputMode()) {
        if (event.code == "KeyT")
            if (getFramePlacing())
                toggleFramePlacing()
            else
                placeFrame();
        
        else if (event.code == "KeyY" && getInteractingFrame() != null)
            removeFrame();
    
        else
            keyStates[ event.code ] = true;   
    }
}

export function onKeyUp( event ) {
    keyStates[ event.code ] = false;
}

export function onMouseDown( event ) {

    if (getInputMode()) return;

    if (getVisualizeMode()) 
        toggleVisualizeFrame()
    
    document.body.requestPointerLock();

}

export function controls( deltaTime, playerVelocity, camera, playerDirection ) {

    const speedDelta = deltaTime * 250;

    playerVelocity.set(0, 0, 0)

    // if (!gamepadConnected()) {

        if ( keyStates[ 'KeyW' ] ) playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( speedDelta ) );

        if ( keyStates[ 'KeyS' ] ) playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( - speedDelta ) );

        if ( keyStates[ 'KeyA' ] ) playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( - speedDelta ) );

        if ( keyStates[ 'KeyD' ] ) playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( speedDelta ) );

        return playerVelocity;
    // }

    // const gamepad = gamepadMovement();
    
    // playerVelocity.add( getForwardVector(camera, playerDirection).multiplyScalar( speedDelta * gamepad.y ) );

    // playerVelocity.add( getSideVector(camera, playerDirection).multiplyScalar( speedDelta * gamepad.x ) );

    return playerVelocity;
}