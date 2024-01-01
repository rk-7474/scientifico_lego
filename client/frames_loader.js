import { addToScene } from './index.js';
import { fetchRoomInfo } from './api.js'
import { createFrame } from './frames.js';

export const loadRoomFrames = async () => {
    const frames = await fetchRoomInfo("prova");
    if (!frames) return;

    for (const {url, position, rotation} of frames) {
        const object = await createFrame(url, position, rotation);
        addToScene(object)
    }
}

