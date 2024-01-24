import { addToScene } from './index.js';
import { fetchRoomInfo } from './api.js'
import { createFrame, addFrame, ROOM_ID } from './frames.js';

export const loadRoomFrames = async () => {
    try {
        var frames = await fetchRoomInfo(ROOM_ID);
    } catch (e) {
        return;
    }
    
    if (!frames) return;

    for (const {url, position, rotation, scale, desc, title} of frames) {
        console.log(frames)
        const frame = await createFrame(url, position, rotation, scale);
        console.log(desc, title)
        addToScene(frame.object);
        addFrame({...frame, scale, desc, title})
    }
}
