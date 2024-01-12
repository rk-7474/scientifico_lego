let gamepad_connected = false;
let poll_interval;

export const gamepadSupported = () => "ongamepadconnected" in window;
export const gamepadConnected = () => gamepad_connected;

window.addEventListener("gamepaddisconnected", () => gamepadOff);

const gamepadOn = () => {
    clearInterval(poll_interval);
    gamepad_connected = true;
}

const gamepadOff = () => {
    poll_interval = setInterval(gamepadPoll, 500);
    gamepad_connected = false;
}

const gamepadPoll = () => navigator.getGamepads()[0] && gamepadOn();

export const gamepadCamera = () => {
    const axes = getAxes();

    const camera = { 
        y : axes[1],
        x : axes[0]
    }

    return camera;
}

export const gamepadMovement = () => {
    const axes = getAxes();

    const movement = {
        y : axes[4] * -1,
        x : axes[3]
    }

    return movement;
}

const getAxes = () => navigator.getGamepads()[0].axes;

gamepadOff();