import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { controls, setup_listeners } from './movement.js'
import { setup_camera_movement, setup_device_motion } from './camera.js';
import { updateRaycast } from "./raycast";

const CARDBOARD_MODE = false;

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( CARDBOARD_MODE ? 125 : 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = 'YXZ';

let room;

let renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );

if (CARDBOARD_MODE) {
    renderer = new StereoEffect( renderer );
    setup_device_motion(window, camera);
} else {
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
    setup_camera_movement(
        () => camera,
    
        (new_camera) => {
            camera = new_camera
        }
    );
}

renderer.setSize( window.innerWidth, window.innerHeight );

const playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1.8, 0 ), 0.35 );
let playerVelocity = new THREE.Vector3();
const playerDirection = new THREE.Vector3();

const clock = new THREE.Clock();

camera.position.set( 0, 2, 0 );

const loader = new GLTFLoader();

loader.load( './modern_bedroom/scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
    room = gltf.scene;
}, undefined, function ( error ) {
	console.error( error );
} );

setup_listeners(document, camera, window, renderer);

export const getRenderer = () => renderer;
export const getRoom = () => room;
export const addToScene = (object) => scene.add(object);
export const removeFromScene = (object) => scene.remove(object);

// controls.update( clock.getDelta() );


function updatePlayer( deltaTime ) {
    playerVelocity = controls(deltaTime, playerVelocity, camera, playerDirection);

    const deltaPosition = playerVelocity.clone().multiplyScalar( deltaTime );
    playerCollider.translate( deltaPosition );


    // playerCollisions();

    camera.position.copy( playerCollider.end );
}

function animate() {
	requestAnimationFrame( animate );

    updatePlayer( clock.getDelta() );

    updateRaycast(camera)

	renderer.render( scene, camera );
}

animate();