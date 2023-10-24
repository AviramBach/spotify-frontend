import ColorThief from 'colorthief'

const thief = new ColorThief();
export const imageService = {
    getColorFromImage
}

async function getColorFromImage(src) {
    const image = await loadImage(src)
    const col = await thief.getColor(image);
    return col;
}

async function loadImage(src) {
    const image = document.createElement('img');
    image.src = src;
    await new Promise((resolve) => { image.onload = resolve; });
    return image;
}