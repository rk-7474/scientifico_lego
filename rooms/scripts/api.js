const SERVER_URL = "../../api"

//Fetch API per bypassare CORS
export const fetchImage = async (url) => {
    const endpoint = `${SERVER_URL}/image/index.php`;
    console.log(url)
    const table = JSON.stringify({url});
    console.log(table);
    const response = await fetch(endpoint, {
        method: 'POST',
        body: table,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(response.status);

    if (!response.ok) return;
    const blob = await response.blob();
    return blob;
}

//Fetch API per ottenere posizione e rotazione dei frame
export const fetchRoomInfo = async (room_id) => {
    const endpoint = `${SERVER_URL}/data?id=${room_id}`;
    const response = await fetch(endpoint);
    if (!response.ok) return;
    const data = await response.json();
    return data;
}

//POST per aggiornare la posizione dei frame sul database
export const updateFrames = async (room_id, frames) => {
    let data = []

    for (const {object, content, scale, desc, title, tags} of frames) {
        let {x, y, z} = object.position;
        const position = {x, y, z};

        ({x, y, z} = object.rotation);
        const rotation = {x, y, z};

        data.push({url: content, position, rotation, scale, tags, desc, title})
    }
        

    const endpoint = `${SERVER_URL}/data?id=${room_id}`;
    
    const body = {
        id: room_id,
        data
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) console.error("Failed to update room data. Check your internet connection.");
}