import { addToScene } from './index.js';
import { createFrame, addFrame, ROOM_ID } from './frames.js';

export const loadRoomFrames = async (frames) => {
    if (!frames) return;

    console.log(frames)

    for (const {path, x, y, z, rotation_x, rotation_y, rotation_z, scale, desc, title, id} of frames) {
        const frame = await createFrame(path, {x,y,z}, {x: rotation_x, y: rotation_y, z: rotation_z}, scale);
        addToScene(frame.object);
        addFrame({...frame, scale, desc, title, id})
    }
}
