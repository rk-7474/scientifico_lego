import { writable } from 'svelte/store';

export const showCursor = writable(true);
export const showResize = writable(false);
export const showUrlInput = writable(false);
export const showInfoInput = writable(false);

export const innerHeight = writable(0);
export const innerWidth = writable(0);
export const devicePixelRatio = writable(0);

// export const navigator = writable();
