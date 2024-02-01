import { addToScene } from './index.js';
import { fetchRoomInfo } from './api.js'
import { createFrame, addFrame, ROOM_ID } from './frames.js';

export const loadRoomFrames = async () => {
    console.log("ciao")
    try {
        var frames = await fetchRoomInfo(ROOM_ID);
    } catch (e) {
        console.error(e);
        return;
    }
    
    if (!frames) return;

    for (const {url, position, rotation, scale, desc, title} of frames) {
        const frame = await createFrame(url, position, rotation, scale);
        addToScene(frame.object);
        addFrame({...frame, scale, desc, title})
    }
}
