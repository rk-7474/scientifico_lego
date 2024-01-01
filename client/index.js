import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { controls, listenersInit } from './movement.js'
import { init as cameraInit, setGamepadCamera} from './camera.js';
import { updateRaycast } from "./raycast";
import { loadRoomFrames } from "./frames_loader.js"
import { gamepadConnected } from "./gamepad.js"

let renderer = new THREE.WebGLRenderer();
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();
const scene = new THREE.Scene();

const CARDBOARD_MODE = false;

let camera = new THREE.PerspectiveCamera( CARDBOARD_MODE ? 125 : 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = 'YXZ';

if (CARDBOARD_MODE) {
    renderer = new StereoEffect( renderer );
    // setup_device_motion(window, camera);
} else {
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
}

function updatePlayer( deltaTime ) {
    playerVelocity = controls(deltaTime, playerVelocity, camera, playerDirection);

    const deltaPosition = playerVelocity.clone().multiplyScalar( deltaTime );
    playerCollider.translate( deltaPosition );

    if (gamepadConnected()) setGamepadCamera();

    // playerCollisions();

    camera.position.copy( playerCollider.end );
}

function animate() {
	requestAnimationFrame( animate );

    updatePlayer( clock.getDelta() );

    updateRaycast(camera)

	renderer.render( scene, camera );
}

let room;

function loadRoomObject() {
    const loader = new GLTFLoader();

    loader.load( './modern_bedroom/scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
        room = gltf.scene;
    }, undefined, function ( error ) {
        console.error( error );
    } );
}

export const getRenderer = () => renderer;
export const getCamera = () => camera;
export const setCamera = (n) => camera = n;
export const getRoom = () => room;
export const addToScene = (object) => scene.add(object);
export const removeFromScene = (object) => scene.remove(object);

////////////////////////////////////////////////////////////////

renderer.setSize( window.innerWidth, window.innerHeight );

const playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1.8, 0 ), 0.35 );
let playerVelocity = new THREE.Vector3();
const playerDirection = new THREE.Vector3();

camera.position.set( 0, 2, 0 );

listenersInit(camera, renderer);

cameraInit();

loadRoomObject();

loadRoomFrames();

animate();
