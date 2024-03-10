import { c as create_ssr_component, a as subscribe, f as set_store_value, b as add_attribute, e as escape } from './ssr-oU8yitx9.js';
import { w as writable } from './index2-7JCj9GQB.js';
import * as THREE from 'three';
import './client-_MkdHwD5.js';
import './exports-mq_1S73-.js';

const ___ASSET___0 = "/_app/immutable/assets/cursor.hcR63a2m.png";
const showCursor = writable(true);
const showResize = writable(false);
const showInfoInput = writable(false);
const state = writable("loading");
const loadingBar = writable(0);
const loadingTotal = writable(0);
const frameImg = writable({
  show: false,
  content: "",
  title: "",
  desc: ""
});
const innerHeight = writable(0);
const innerWidth = writable(0);
const devicePixelRatio = writable(0);
const SERVER_URL = "/api";
const fetchImage = async (url) => {
  const endpoint = `${SERVER_URL}/image`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: url,
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok)
    return;
  const blob = await response.blob();
  return blob;
};
async function load_image(url) {
  var blob = await fetchImage(url);
  try {
    var base64 = await blobToBase64(blob);
  } catch (e) {
    return;
  }
  const texture = new THREE.TextureLoader().load(base64);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const size = await getImageSize(base64);
  return [material, size];
}
function get_thumbnail(url) {
  const youtube_video_id = url.substring(32, url.length);
  const thumb_url = "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
  return thumb_url;
}
async function getImageSize(url) {
  const img = await new Promise((resolve) => {
    const img2 = new Image();
    img2.src = url;
    img2.onload = () => {
      resolve(img2);
    };
  });
  return img;
}
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
new THREE.Vector2(0, 0);
new THREE.Raycaster();
let ids = 0;
function sendUpdate(form) {
  if (form?.done == "info") {
    startFramePlacing(form.info);
  }
}
const startFramePlacing = async (info) => {
  const { url, title, desc, tags } = info;
  let data = await createFrame(url);
  showCursor.update(() => true);
  document.exitPointerLock();
  if (!data) {
    return;
  }
  ({ ...data, title, desc, scale: 1, tags: tags.split(" ") });
  showResize.update(() => true);
};
const validateUrl = (url) => {
  if (url == "")
    return;
  else if (url.includes("youtube.com/watch?v=")) {
    if (url.includes("&"))
      url = url.split("&")[0];
    var type = "youtube";
    var image = get_thumbnail(url);
  } else {
    var type = "image";
    var image = url;
  }
  return [type, image];
};
const createFrame = async (url, position, rotation, scale) => {
  const [type, image] = validateUrl(url);
  const image_data = await load_image(image);
  console.log(url, position, rotation, scale);
  if (!image_data)
    return;
  const [material, size] = image_data;
  const [width, height] = reduce(size.width, size.height);
  const geometry = new THREE.BoxGeometry(width, height, 0.01);
  const frame = new THREE.Mesh(geometry, material);
  if (position) {
    const { x, y, z } = position;
    frame.position.set(x, y, z);
  } else {
    frame.position.set(0, -10, 0);
  }
  if (rotation) {
    const { x, y, z } = rotation;
    frame.rotation.set(x, y, z);
  }
  if (scale) {
    frame.scale.set(scale, scale, 1);
  }
  addToScene(frame);
  const data = { object: frame, type, content: url, width, height, side: width > height ? "w" : "h", uuid: ids++ };
  return data;
};
function reduce(numerator, denominator) {
  var gcd = function gcd2(a, b) {
    return b ? gcd2(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  numerator /= gcd;
  denominator /= gcd;
  if (numerator > denominator) {
    return [2 * numerator / denominator, 2];
  } else {
    return [1.5, 1.5 * denominator / numerator];
  }
}
let scene;
devicePixelRatio.subscribe((a) => a);
const addToScene = (object) => scene.add(object);
const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');.svelte-1btm6bo.svelte-1btm6bo{font-family:'Inter', sans-serif;color:white}.center.svelte-1btm6bo.svelte-1btm6bo{position:absolute;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center}.container.svelte-1btm6bo.svelte-1btm6bo{position:absolute;width:500px;height:200px;background-color:rgba(43, 43, 43, 0.601);box-shadow:2px 2px 8px rgba(0, 0, 0, 0.25);display:flex;flex-direction:column;align-items:center;justify-content:space-evenly}input[type="text"].svelte-1btm6bo.svelte-1btm6bo{font-size:16px;padding:10px;background-color:rgba(43, 43, 43, 0.877);border:none;width:70%;outline:none;color:white}.confirm.svelte-1btm6bo.svelte-1btm6bo{width:120px;height:40px;background-color:rgba(43, 43, 43, 0.877);font-size:1.2rem;color:white;outline:none;border:none;border-radius:5px;cursor:pointer;opacity:0.5;transition:.25ms ease-in-out}.confirm.svelte-1btm6bo.svelte-1btm6bo:hover{opacity:1}.frame.svelte-1btm6bo.svelte-1btm6bo{position:absolute;justify-content:space-evenly;align-items:center;width:100%;height:100%}.frameinfo.svelte-1btm6bo.svelte-1btm6bo{padding:40px;padding-top:0;background-color:rgba(43, 43, 43, 0.601);box-shadow:2px 2px 8px rgba(0, 0, 0, 0.25);min-width:25%;text-align:center}.frameinfo.svelte-1btm6bo>p.svelte-1btm6bo{font-size:0.7rem}.frame.svelte-1btm6bo>img.svelte-1btm6bo{display:block;width:65vw;height:auto}#loadingbar.svelte-1btm6bo.svelte-1btm6bo{width:0;transition:width 2s ease-in-out;height:20px;background-color:white;border-radius:100px;display:block}.slider.svelte-1btm6bo.svelte-1btm6bo{-webkit-appearance:none;width:20vw;height:10px;background:#d3d3d3;outline:none;opacity:0.7;transition:opacity .2s;border-radius:10px}.slider.svelte-1btm6bo.svelte-1btm6bo:hover{opacity:1}.slider.svelte-1btm6bo.svelte-1btm6bo::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;background:#04AA6D;cursor:pointer;border-radius:100%}.slider.svelte-1btm6bo.svelte-1btm6bo::-moz-range-thumb{width:25px;height:25px;background:#04AA6D;cursor:pointer}.resizercontainer.svelte-1btm6bo.svelte-1btm6bo{background-color:rgba(43, 43, 43, 0.601);position:absolute;display:flex;flex-direction:column;bottom:20%;align-items:center;justify-content:center;align-items:end}.resizercontainer.svelte-1btm6bo>.svelte-1btm6bo{margin:10px}`,
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let $showInfoInput, $$unsubscribe_showInfoInput;
  let $loadingBar, $$unsubscribe_loadingBar;
  let $loadingTotal, $$unsubscribe_loadingTotal;
  let $showCursor, $$unsubscribe_showCursor;
  let $showResize, $$unsubscribe_showResize;
  let $frameImg, $$unsubscribe_frameImg;
  let $$unsubscribe_innerHeight;
  let $$unsubscribe_innerWidth;
  let $$unsubscribe_devicePixelRatio;
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  $$unsubscribe_showInfoInput = subscribe(showInfoInput, (value) => $showInfoInput = value);
  $$unsubscribe_loadingBar = subscribe(loadingBar, (value) => $loadingBar = value);
  $$unsubscribe_loadingTotal = subscribe(loadingTotal, (value) => $loadingTotal = value);
  $$unsubscribe_showCursor = subscribe(showCursor, (value) => $showCursor = value);
  $$unsubscribe_showResize = subscribe(showResize, (value) => $showResize = value);
  $$unsubscribe_frameImg = subscribe(frameImg, (value) => $frameImg = value);
  $$unsubscribe_innerHeight = subscribe(innerHeight, (value) => value);
  $$unsubscribe_innerWidth = subscribe(innerWidth, (value) => value);
  $$unsubscribe_devicePixelRatio = subscribe(devicePixelRatio, (value) => value);
  let { data } = $$props;
  let { form } = $$props;
  let three_scene;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  {
    {
      sendUpdate(form);
      console.log(form);
      if (form?.done == "info")
        set_store_value(showInfoInput, $showInfoInput = false, $showInfoInput);
      if (form?.done == "info")
        set_store_value(showInfoInput, $showInfoInput = false, $showInfoInput);
    }
  }
  $$unsubscribe_state();
  $$unsubscribe_showInfoInput();
  $$unsubscribe_loadingBar();
  $$unsubscribe_loadingTotal();
  $$unsubscribe_showCursor();
  $$unsubscribe_showResize();
  $$unsubscribe_frameImg();
  $$unsubscribe_innerHeight();
  $$unsubscribe_innerWidth();
  $$unsubscribe_devicePixelRatio();
  return `${$$result.head += `<!-- HEAD_svelte-18g587p_START -->${$$result.title = `<title>Space 4 Art - Room</title>`, ""}<script src="https://www.youtube.com/iframe_api" class="svelte-1btm6bo" data-svelte-h="svelte-2lmn1n"><\/script><!-- HEAD_svelte-18g587p_END -->`, ""} ${$state == "error" ? `<div class="svelte-1btm6bo" data-svelte-h="svelte-1wmyf8r"><h1 class="svelte-1btm6bo">We couldn&#39;t find the room you are looking for.<br class="svelte-1btm6bo">:(</h1> <p class="svelte-1btm6bo">The room at this url might have been deleted or made private.</p><p class="svelte-1btm6bo"></p></div>` : `${$state == "loading" ? `<div class="svelte-1btm6bo"><h1 class="svelte-1btm6bo" data-svelte-h="svelte-17egpjd">Entering room...</h1> <div class="svelte-1btm6bo"><div id="loadingbar" style="${"width: " + escape($loadingBar / $loadingTotal * 300, true) + "px"}" class="svelte-1btm6bo"></div></div></div>` : `${$state == "done" ? `<div class="center svelte-1btm6bo">${$showCursor ? `<img${add_attribute("src", ___ASSET___0, 0)} alt="cursor" id="cursor" width="15" class="svelte-1btm6bo">` : ``} ${$showInfoInput ? `<form method="post" action="?/info" class="container svelte-1btm6bo" id="info" data-svelte-h="svelte-m2z66d"><input value="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsfondo.info%2Fi%2Foriginal%2F5%2F0%2Fe%2F12051.jpg&f=1&nofb=1&ipt=b690017e4bc2b8d5c48ad32ad0635894d1eda00e4dcf7d49645591b9620024eb&ipo=images" autocomplete="off" name="url" type="text" placeholder="Inserisci URL immagine o video" class="svelte-1btm6bo"> <input value="ciao" autocomplete="off" name="title" type="text" placeholder="Inserisci titolo opera..." class="svelte-1btm6bo"> <input value="ciao" autocomplete="off" name="desc" type="text" placeholder="Inserisci descrizione opera..." class="svelte-1btm6bo"> <input value="ciao" autocomplete="off" name="tags" type="text" placeholder="Inserisci tag..." class="svelte-1btm6bo"> <button type="submit" class="confirm svelte-1btm6bo">Conferma</button></form>` : ``} ${$showResize ? `<div class="resizercontainer svelte-1btm6bo"><h2 class="svelte-1btm6bo" data-svelte-h="svelte-1odjpvy">Modifica dimensione frame</h2> <input type="range" min="10" max="300" value="100" class="slider svelte-1btm6bo"> <button class="confirm svelte-1btm6bo" data-svelte-h="svelte-d2x4oq">Conferma</button></div>` : ``} ${$frameImg.show === true ? `<div class="frame svelte-1btm6bo"><img${add_attribute("src", $frameImg.content, 0)} class="svelte-1btm6bo"> <div class="frameinfo svelte-1btm6bo"><h1 class="svelte-1btm6bo">${escape($frameImg.title)}</h1> <p class="svelte-1btm6bo">${escape($frameImg.desc)}</p></div></div>` : ``}</div>` : ``}`}`} <canvas class="svelte-1btm6bo"${add_attribute("this", three_scene, 0)}></canvas> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-p2mgWhuT.js.map
