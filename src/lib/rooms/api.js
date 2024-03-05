const SERVER_URL = "/api"

//Fetch API per bypassare CORS
export const fetchImage = async (url) => {
    const endpoint = `${SERVER_URL}/image`;
    const response = await fetch(endpoint, {
        method: 'POST',
        body: url,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) return;
    const blob = await response.blob();
    return blob;
}

// //Fetch API per ottenere posizione e rotazione dei frame
// export const fetchRoomInfo = async (room_id) => {
//     const endpoint = `${SERVER_URL}/data/index.php?id=${room_id}`;
//     const response = await fetch(endpoint);
//     if (!response.ok) return;
//     const text = await response.text();
//     const data = JSON.parse(text);
//     return data;
// }

//POST per aggiornare la posizione dei frame sul database
// export const updateFrames = async (room_id, data) => {
//     const {object, content, scale, desc, title, tags} = data;
//     let {x, y, z} = object.position;
//     const position = {x, y, z};

//     ({x, y, z} = object.rotation);
//     const rotation = {x, y, z};

//     const body = {id: room_id, url: content, position, rotation, scale, tags, desc, title}

//     const endpoint = `${SERVER_URL}/update_scenes`;

//     const response = await fetch(endpoint, {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     if (!response.ok) console.error("Failed to update room data. Check your internet connection.");
// }

export const pushFrame = async (room_id, data) => {
    const {object, content, scale, desc, title, tags} = data;
    const {x, y, z} = object.position;
    const {rotation_x, rotation_y, rotation_z} = object.rotation;

    const body = {id: room_id, path: content, rotation_x, rotation_y, rotation_z, x, y, z, scale, tags: tags.join(" "), desc, title}

    const endpoint = `${SERVER_URL}/rooms/scenes`;

    const response = await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) console.error("Failed to update room data. Check your internet connection.");
}