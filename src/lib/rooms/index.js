import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import { VRButton } from 'three/addons/webxr/VRButton'
import { Octree } from 'three/addons/math/Octree.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { controls } from './movement.js'
import { init as cameraInit, setGamepadCamera} from './camera.js';
import { updateRaycast } from "./raycast.js";
import { loadRoomFrames } from "./frames_loader.js"
import { gamepadConnected } from "./gamepad.js"
import { loadRoomObject } from './load_room.js';
import { setRoomId } from './frames.js';
import { innerHeight as innerHeightStore, innerWidth as innerWidthStore, devicePixelRatio as devicePixelRatioStore } from './stores';

let clock, scene, worldOctree, camera, renderer, room, playerCollider, playerVelocity, playerDirection, innerWidth, innerHeight, devicePixelRatio;

// document.documentElement.requestFullscreen();


devicePixelRatioStore.subscribe(a => devicePixelRatio = a);

const init = (cardboard) => {
    camera = new THREE.PerspectiveCamera( cardboard ? 160 : 75, innerWidth / innerHeight, 0.1, 1000 );
    camera.rotation.order = 'YXZ';
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    
    scene.background = new THREE.Color(0xD3E8F0);
    
    const light = new THREE.AmbientLight( 0xFFFFFF );
    scene.add( light );

    camera.position.set( 0, 2, 0 );

    innerHeightStore.subscribe(a => {
        innerHeight = a;
        onWindowResize();
    });
    innerWidthStore.subscribe(a => {
        innerWidth = a
        onWindowResize();
    });
}

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

    // if (gamepadConnected()) setGamepadCamera();

    playerCollisions(deltaTime);
    camera.position.copy( playerCollider.end );
}


function animate() {
	requestAnimationFrame( animate );

    updatePlayer( clock.getDelta() );

    updateRaycast(camera)

    renderer.render( scene, camera );
}

export function onWindowResize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( innerWidth, innerHeight );
}


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

export let hasPerms;

export const createScene = async (id, data, frames, el, cardboard, perms) => {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    worldOctree = new Octree();

    hasPerms = perms;

    playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1.8, 0 ), 0.35 );
    playerVelocity = new THREE.Vector3(0, 0, 0);
    playerDirection = new THREE.Vector3(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });

    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize( innerWidth, innerHeight );

    if (cardboard) {
        renderer = new StereoEffect( renderer );
        // setup_device_motion(window, camera);
    }

    init(cardboard);

    cameraInit();

    setRoomId(id)

    await loadRoomObject(data);

    loadRoomFrames(frames);

    animate();
}
