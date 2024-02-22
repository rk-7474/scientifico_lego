import { writable } from 'svelte/store';

export const showCursor = writable(true);
export const showResize = writable(false);
export const showUrlInput = writable(false);
export const showInfoInput = writable(false);