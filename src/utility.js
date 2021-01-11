export function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
export function formatTime(time) {
    return time < 10 ? "0" + time : "" + time;
}
export function getTime(time) {
    const hours = Math.floor(time / 3600);
    const min = Math.floor(time / 60 % 60);
    const sec = Math.floor(time % 60);
    if (hours === 0)
    return `${min}:${formatTime(sec)}`;
    else
    return `${hours}:${formatTime(min)}:${formatTime(sec)}`;
}

export const getColorAsString = (colorRGBA) => (
    `rgba(${colorRGBA.r}, ${colorRGBA.g}, ${colorRGBA.b}, ${colorRGBA.a})`
);