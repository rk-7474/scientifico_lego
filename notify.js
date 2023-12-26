import $ from "jquery";

export function showNotify(show) {
    if (show) {
        $(".notify").fadeIn(200);
    } else {
        $(".notify").fadeOut(200);  
    }
}