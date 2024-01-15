import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import "jquery";
import { setRoom } from './index.js';
import { ROOM_ID } from './frames.js';

//Caricamento modello stanza con loading screen
export function loadRoomObject() {
    const loader = new GLTFLoader();
    loader.load( `/files/${ROOM_ID}/scene.gltf`, function ( gltf ) {;
        setRoom(gltf.scene);
        finishedLoading();
    }, 
    function ( xhr ) {
        $("#loadingbar").width(`${xhr.loaded / xhr.total * 300}px`);
	}, function ( error ) {
        console.error( error );
    } );
}

async function finishedLoading() {
    await new Promise(resolve => setTimeout(() => resolve(), 200));
    $(".loading").fadeOut(800);
}
