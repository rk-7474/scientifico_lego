import { writable } from 'svelte/store';

export const showCursor = writable(true);
export const showResize = writable(false);
export const showUrlInput = writable(false);
export const showInfoInput = writable(false);
export const state = writable("loading");
export const loadingBar = writable(0);
export const loadingTotal = writable(0);
export const urlInput = writable("");
export const descInput = writable("");
export const titleInput = writable("");
export const tagInput = writable("");
export const frameImg = writable({
    show : false,
    content : "",
    title : "",
    desc: ""
});

export const innerHeight = writable(0);
export const innerWidth = writable(0);
export const devicePixelRatio = writable(0);

// export const navigator = writable();
