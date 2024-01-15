import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import { VRButton } from 'three/addons/webxr/VRButton'
import { Octree } from 'three/addons/math/Octree.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { controls, listenersInit } from './movement.js'
import { init as cameraInit, setGamepadCamera} from './camera.js';
import { updateRaycast } from "./raycast.js";
import { loadRoomFrames } from "./frames_loader.js"
import { gamepadConnected } from "./gamepad.js"
import { loadRoomObject } from './load_room.js';

let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const worldOctree = new Octree();

const CARDBOARD_MODE = false;

let camera = new THREE.PerspectiveCamera( CARDBOARD_MODE ? 125 : 75, window.innerWidth / window.innerheigth, 0.1, 1000 );
camera.rotation.order = 'YXZ';
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

if (CARDBOARD_MODE) {
    renderer = new StereoEffect( renderer );
    // setup_device_motion(window, camera);
} else {
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
}

scene.background = new THREE.Color(0xD3E8F0);

function playerCollisions(deltaTime) {
    const result = worldOctree.capsuleIntersect( playerCollider );

    if ( result ) {
        const translateVector = result.normal.multiplyScalar( result.depth );
        translateVector.y = 0
        playerCollider.translate( translateVector );
    }
}

function updatePlayer( deltaTime ) {
    playerVelocity = controls(deltaTime, playerVelocity, camera, playerDirection);

    const deltaPosition = playerVelocity.clone().multiplyScalar( deltaTime );

    playerCollider.translate( deltaPosition );

    if (gamepadConnected()) setGamepadCamera();

    playerCollisions(deltaTime);
    camera.position.copy( playerCollider.end );
}

function animate() {
	requestAnimationFrame( animate );

    updatePlayer( clock.getDelta() );

    updateRaycast(camera)

    renderer.render( scene, camera );
}

let room;

export const getRenderer = () => renderer;
export const getCamera = () => camera;
export const setCamera = (n) => camera = n;
export const getRoom = () => room;
export const setRoom = (n) => {
    room = n;
    scene.add( room );
    worldOctree.fromGraphNode( room );
}
export const addToScene = (object) => scene.add(object);
export const removeFromScene = (object) => scene.remove(object);

////////////////////////////////////////////////////////////////

const playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1.8, 0 ), 0.35 );
let playerVelocity = new THREE.Vector3(0, 0, 0);
const playerDirection = new THREE.Vector3(0, 0, 0);

camera.position.set( 0, 2, 0 );

listenersInit();

cameraInit();

loadRoomObject();

loadRoomFrames();

animate();
