import { addToScene } from './index.js';
import { fetchRoomInfo } from './api.js'
import { createFrame, ROOM_ID } from './frames.js';

export const loadRoomFrames = async () => {
    try {
        var frames = await fetchRoomInfo(ROOM_ID);
    } catch (e) {
        return;
    }
    
    if (!frames) return;

    for (const {url, position, rotation} of frames) {
        const object = await createFrame(url, position, rotation);
        addToScene(object)
    }
}

// window.onload = function() {
//     // Get the current path
//     var path = window.location.pathname;

//     // Redirect all paths to a specific page (e.g., "target-page.html")
//     window.location.replace("/target-page.html");

//     // Extract information from the path (you can modify this part based on your needs)
//     var extractedInfo = path.split('/').filter(function (part) {
//       return part.trim() !== '';
//     });

//     // Log or use the extracted information
//     console.log(extractedInfo);
//   }