import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import "jquery";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import { addToScene, setRoom } from './index.js';
import { ROOM_ID } from './frames.js';

let lastnum = 0;

//Caricamento modello stanza con loading screen
export function loadRoomObject() {
    const loader = new GLTFLoader();
    loader.load( `/files/${ROOM_ID}/scene.gltf`, function ( gltf ) {;
        setRoom(gltf.scene);
        finishedLoading();
    }, 
    function ( xhr ) {
        if (xhr != lastnum) {
            $("#loadingbar").width(`${xhr.loaded / xhr.total * 300}px`);
            lastnum = xhr;
        }
	}, function ( error ) {
        console.error( error );
    } );

    // const heigth = 3, width = 5, depth = 5;

    // const geometries_data = [
    //     {x: 0, y: heigth/2, z: depth/2, heigth, width, depth: 0.01},
    //     {x: 0, y: heigth/2, z: -depth/2, heigth, width, depth: 0.01},

    //     {x: width/2, y: heigth/2, z: 0, heigth, width: 0.01, depth},
    //     {x: -width/2, y: heigth/2, z: 0, heigth, width: 0.01, depth},

    //     {x: 0, y: 0, z: 0, heigth: 0.01, width, depth},
    //     {x: 0, y: heigth, z: 0, heigth: 0.01, width, depth},
    // ]

    // const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} ); 

    // let geometries = [];

    // for (const {x, y, z, width, heigth, depth} of geometries_data) {
    //     const geometry = new THREE.BoxGeometry( width, heigth, depth );
    //     geometry.translate(x, y, z)
    //     geometries.push(geometry);
    // }

    // const geometriesBuffer = BufferGeometryUtils.mergeGeometries(geometries)
    // const object = new THREE.Mesh( geometriesBuffer, material );
    // object.updateMatrix();

    // // const floor = new THREE.BoxGeometry( width, 0.02, depth );
    // // const final = new THREE.Mesh( floor, material );
    // // final.mergeGeometries(object);

    // setRoom(object)
    // addToScene( object );

    // const light = new THREE.PointLight( 0xff0000, 1000, 1000, 1.5 );
    // light.position.set( 0, heigth-1, 0 );
    // addToScene( light );
    // finishedLoading()
}

async function finishedLoading() {
    await new Promise(resolve => setTimeout(() => resolve(), 200));
    $(".loading").fadeOut(800);
}
