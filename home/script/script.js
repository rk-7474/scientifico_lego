const move = (elem_query, x, y, speed) => {
    let elem = document.querySelector(elem_query);
    let style = getComputedStyle(elem);
    elem.style.left = (parseFloat(style.left) + x*speed) + "px";
    elem.style.top = (parseFloat(style.top) + y*speed) + "px";
}   

onmousemove = (e) => {
    const x = e.movementX;
    const y = e.movementY;

    move(".pianeta1", x, y, 0.03);
    move(".pianeta2", x, y, 0.08);
    move(".astronauta", x, y, 0.12);
    move(".sfondo", x, y, 0.02);
}

fetch("/api/feed")
    .then((response) => response.json())
    .then((rooms) => {
        const elem = document.getElementById("rooms");
        for (const {image, label, id, description, data} of rooms) {
            let operas = JSON.parse(data);
            let tags_array = new Set()
            operas.map(opera => {
                console.log(opera)
                if (opera.tags == null) return;
                opera?.tags.map(tag =>tags_array.add(tag))
            })
            console.log(tags_array);
            let tag_string = tags_array.size > 0 ? "#" : "";
            elem.innerHTML += `
                <div onclick="window.location.href = '/rooms/${id}';" class="room" style="background-image: url(${image});">
                    <h2>${label}</h2>
                    <p>${description}</p>
                    <p style="color: lightblue">${tag_string}${new Array(...tags_array).join(" #")}</p>
                </div>
            `;
        }   
    })


$(window).scroll(function(e) {

    var distanceScrolled = $(this).scrollTop();

    $('.page').first().css('-webkit-filter', 'blur('+distanceScrolled/150+'px)');
    
});
