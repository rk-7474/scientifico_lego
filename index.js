import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { controls, setup_listeners } from './movement.js'
import { setup_camera_movement, setup_device_motion } from './camera.js';
import { load_image } from './image_loader.js';

const CARDBOARD_MODE = false;

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( CARDBOARD_MODE ? 125 : 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = 'YXZ';

const image = load_image('https://media.licdn.com/dms/image/C4E0BAQEWpHzepmBgHg/company-logo_200_200/0/1630637531639?e=2147483647&v=beta&t=V77Rz3SeQHpL101lAtojnK568N9HkluUa62A6f3tCmw');

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

const geometry = new THREE.BoxGeometry( 0.25, 1, 3 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add(cube);
scene.add(image);

cube.position.y = 2.5;
cube.position.x = 2.85;


const loader = new GLTFLoader();

loader.load( './modern_bedroom/scene.gltf', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

setup_listeners(document, camera, window, renderer);

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


	renderer.render( scene, camera );
}

animate();