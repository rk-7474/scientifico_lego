import { addToScene } from './index.js';
import { fetchRoomInfo } from './api.js'
import { createFrame, ROOM_ID } from './frames.js';

//Funzione per caricare e piazzare i frame salvati
export const loadRoomFrames = async () => {
    try {
        var frames = await fetchRoomInfo(ROOM_ID);
    } catch (e) {
        return;
    }

    if (!frames) return;

    for (const {url, position, rotation} of frames) {
        const object = await createFrame(url, position, rotation);
        addToScene(object);
    }
}
