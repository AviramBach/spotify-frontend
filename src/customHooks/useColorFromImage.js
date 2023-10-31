import { useState } from "react";
import { imageService } from "../services/image.service.js";

export function useColorFromImage(initialColor = '35,35,35') {
    const [color, setColor] = useState(initialColor)

    async function setImageUrl(imgUrl) {
        setColor((await imageService.getColorFromImage(imgUrl)).join(','))
    }

    return { color, setImageUrl };
}