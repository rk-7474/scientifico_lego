import { addToScene } from './index.js';
import { createFrame, addFrame, ROOM_ID } from './frames.js';

export const loadRoomFrames = async (frames) => {
    if (!frames) return;

    for (const {url, position, rotation, scale, desc, title} of frames) {
        const frame = await createFrame(url, position, rotation, scale);
        addToScene(frame.object);
        addFrame({...frame, scale, desc, title})
    }
}
