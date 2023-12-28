import * as THREE from 'three'


const SERVER_URL = "http://localhost:3000"

export async function load_image(url) {
  const blob = await fetchImage(url);
  const base64 = await blobToBase64(blob);   

  const texture = new THREE.TextureLoader().load(base64);
  const material = new THREE.MeshBasicMaterial( { map: texture } );

  const size = await getImageSize(base64); 

  return [material, size];
}

async function fetchImage(url) {
  const endpoint = `${SERVER_URL}/image?url=${url}`;
  console.log(endpoint)
  const response = await fetch(endpoint);
  const blob = await response.blob();
  return blob;
}

export function get_thumbnail(url) {
  const youtube_video_id = url.substring(32, url.length);
  const thumb_url = 'https://img.youtube.com/vi/'+youtube_video_id+'/0.jpg'
  return thumb_url;
}

async function getImageSize(url) {
  const img = await new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
  })
  return img;
}


function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}