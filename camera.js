// import { MathUtils } from "three";
import { getInputMode } from "./frames";
import { onPointerMove } from "./raycast";

export function setup_camera_movement(get_camera, camera_function) {

    document.body.addEventListener( 'mousemove', ( event ) => {

        if (getInputMode()) return;

        document.body.requestPointerLock();

        let camera = get_camera();

        if ( document.pointerLockElement === document.body ) {

            let tomove = event.movementY / 500;

            if (tomove > 0 && camera.rotation.x < -1.45)
                tomove = 0;
            else if (tomove < 0 && camera.rotation.x > 1.45)
                tomove = 0;

            // MathUtils.clamp(event.movementY / 500, -1.45, 1.45);

            camera.rotation.y -= event.movementX / 500;
            camera.rotation.x -= tomove;

        }

        onPointerMove(event, camera)
        
        camera_function(camera);

    
    } );
}

export function setup_device_motion(window, camera) {
    if (window.DeviceOrientationEvent) {
        console.log(true)
        window.addEventListener('deviceorientation', function (eventData) {
    
            var tiltX =  eventData.gamma * 2;
            var tiltY =   eventData.beta * 2;
    
            deviceOrientationHandler(tiltX,tiltY);
            console.log(tiltX, tiltY)
        }, false);
    }
    
    function deviceOrientationHandler(tiltX, tiltY){
        camera.rotation.y = tiltY/200;
        camera.rotation.x = tiltX/200;
    }
}