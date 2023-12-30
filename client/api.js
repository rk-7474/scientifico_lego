const SERVER_URL = "http://localhost:3000"

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

export const updateFrames = async (room_id, data) => {
    const endpoint = `${SERVER_URL}/rooms?id=${room_id}`;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        body: data
    });

    if (!response.ok) console.error("Failed to update room data. Check your internet connection.");
}