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
    .then((data) => {
        const elem = document.getElementById("rooms");
        console.log(data)
        for (const {image, label, id, description} of data) {
            elem.innerHTML += `
                <div onclick="window.location.href = '/rooms/${id}';" class="room" style="background-image: url(${image});">
                    <h2>${label}</h2>
                    <p>${description}</p>
                </div>
            `;
        }   
    })


$(window).scroll(function(e) {

    var distanceScrolled = $(this).scrollTop();

    $('.page').first().css('-webkit-filter', 'blur('+distanceScrolled/150+'px)');
    
});