// import { navigator } from './stores.js';

let gamepad_connected = false;
let poll_interval;

export const gamepadConnected = () => gamepad_connected;

const gamepadOn = () => {
    clearInterval(poll_interval);
    gamepad_connected = true;
}

export const gamepadOff = () => {
    // poll_interval = setInterval(gamepadPoll, 500);
    gamepad_connected = false;
}

const gamepadPoll = () => $navigator.getGamepads()[0] && gamepadOn();

export const gamepadCamera = () => {
    const axes = getAxes();

    const camera = { 
        y : Math.abs(axes[3]) > 0.07 ? axes[3] : 0,
        x : Math.abs(axes[2]) > 0.07 ? axes[2] : 0
    }

    return camera;
}

export const gamepadMovement = () => {
    const axes = getAxes();

    const movement = {
        y : Math.abs(axes[1]) > 0.07 ? axes[1] * -1 : 0,
        x : Math.abs(axes[0]) > 0.07 ? axes[0] : 0
    }
    return movement;
}

const getAxes = () => navigator.getGamepads()[0].axes;

gamepadOff();