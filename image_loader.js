import * as THREE from 'three';

export async function load_image(url) {
  const material = await new Promise(resolve => 
    imageUrlToBase64(url, base64 => {
      var texture = new THREE.TextureLoader().load(base64);
      var material = new THREE.MeshBasicMaterial( { map: texture } );
      resolve(material);
    })
  );

  const size = await getImageSize(url); 

  return [material, size];
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

function imageUrlToBase64(url, callback) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(blob);
    })
    .catch(error => console.error('Error fetching image:', error));
}


export function get_thumbnail(url) {
  const youtube_video_id = url.substring(32, url.length);
  console.log(youtube_video_id);
  const thumb_url = 'https://img.youtube.com/vi/'+youtube_video_id+'/0.jpg'
  return thumb_url;
}