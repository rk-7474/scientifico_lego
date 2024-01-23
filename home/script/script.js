const move = (elem_query, x, y, speed) => {
    let elem = document.querySelector(elem_query);
    let style = getComputedStyle(elem);
    elem.style.left = (parseFloat(style.left) + x*speed) + "px";
    elem.style.top = (parseFloat(style.top) + y*speed) + "px";
}   

onmousemove = (e) => {
    const x = e.movementX;
    const y = e.movementY;

    move(".pianeta1", x, y, 0.04);
    move(".pianeta2", x, y, 0.10);
    move(".astronauta", x, y, 0.16);
    move(".sfondo", x, y, 0.02);
    move(".title", x, y, -0.01);

}

fetch("/api/feed")
    .then((response) => response.json())
    .then((data) => {
        for (room of data) {
            const elem = document.getElementById("rooms");
            const {image, label} = data;
            elem.append(```
                <div class="room" style="background-image: url(${image});">
                    <h2>${label}</h2>
                </div>
            ```);
        }   
    })

