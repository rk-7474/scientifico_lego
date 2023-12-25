import * as THREE from 'three';


export function load_image(url) {
    const loader = new THREE.ImageLoader();

    loader.load(
        url,
    
        function ( image ) {
            const canvas = document.createElement( 'canvas' );
            const context = canvas.getContext( '2d' );
            context.drawImage( image, 100, 100 );
        },
    
        undefined,
    
        function () {
            console.error( 'An error happened.' );
        }
    );

    return loader;
}

