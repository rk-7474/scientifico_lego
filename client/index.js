import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
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

const CARDBOARD_MODE = true;

let camera = new THREE.PerspectiveCamera( CARDBOARD_MODE ? 125 : 75, window.innerWidth / window.innerheigth, 0.1, 1000 );
camera.rotation.order = 'YXZ';

if (CARDBOARD_MODE) {
    renderer = new StereoEffect( renderer );
    // setup_device_motion(window, camera);
} else {
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
}

scene.background = new THREE.Color(0xD3E8F0);

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
    // const loader = new GLTFLoader();

    // loader.load( './modern_bedroom/scene.gltf', function ( gltf ) {
    //     scene.add( gltf.scene );
    //     room = gltf.scene;
    // }, undefined, function ( error ) {
    //     console.error( error );
    // } );

    const width = 5, heigth = 3.5, depth = 10; 

    const geometries_data = [
        {x: 0, y: heigth/2, z: depth/2, heigth, width, depth: 0.01},
        {x: 0, y: heigth/2, z: -depth/2, heigth, width, depth: 0.01},

        {x: width/2, y: heigth/2, z: 0, heigth, width: 0.01, depth},
        {x: -width/2, y: heigth/2, z: 0, heigth, width: 0.01, depth},

        {x: 0, y: 0, z: 0, heigth: 0.01, width, depth},
        {x: 0, y: heigth, z: 0, heigth: 0.01, width, depth},
    ]

    const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} ); 

    let geometries = [];

    for (const {x, y, z, width, heigth, depth} of geometries_data) {
        const geometry = new THREE.BoxGeometry( width, heigth, depth );
        geometry.translate(x, y, z)
        geometries.push(geometry);
    }

    
    const final = BufferGeometryUtils.mergeGeometries(geometries)
    const object = new THREE.Mesh( final, material );
    scene.add( object );
    room = object;

    const light = new THREE.PointLight( 0xff0000, 1000 );
    light.position.set( 0, heigth-1, 0 );
    scene.add( light );
}

export const getRenderer = () => renderer;
export const getCamera = () => camera;
export const setCamera = (n) => camera = n;
export const getRoom = () => room;
export const addToScene = (object) => scene.add(object);
export const removeFromScene = (object) => scene.remove(object);

////////////////////////////////////////////////////////////////

renderer.setSize( window.innerWidth, window.innerheigth );

const playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1.8, 0 ), 0.35 );
let playerVelocity = new THREE.Vector3();
const playerDirection = new THREE.Vector3();

camera.position.set( 0, 2, 0 );

listenersInit(camera, renderer);

cameraInit();

loadRoomObject();

loadRoomFrames();

animate();
