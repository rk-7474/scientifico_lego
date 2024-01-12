const SERVER_URL = "http://localhost:3000/api"

export const fetchImage = async (url) => {
    const endpoint = `${SERVER_URL}/image?url=${url}`;
    const response = await fetch(endpoint);
    if (!response.ok) return;
    const blob = await response.blob();
    return blob;
}

export const fetchRoomInfo = async (room_id) => {
    const endpoint = `${SERVER_URL}/rooms?id=${room_id}`;
    const response = await fetch(endpoint);
    if (!response.ok) return;
    const data = await response.json();
    return data;
}

export const updateFrames = async (room_id, frames) => {
    let data = []

    for (const {object, content} of frames) {
        let {x, y, z} = object.position;
        const position = {x, y, z};

        ({x, y, z} = object.rotation);
        const rotation = {x, y, z};

        data.push({url: content, position, rotation})
    }
        

    const endpoint = `${SERVER_URL}/rooms?id=${room_id}`;
    
    data = JSON.stringify(data);

    const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) console.error("Failed to update room data. Check your internet connection.");
}