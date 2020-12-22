export function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
export function formatTime(time) {
    return time < 10 ? "0" + time : "" + time;
}
export function getTime(time) {
    return `${Math.floor(time / 60)}:${formatTime(Math.floor(time) % 60)}`;
}