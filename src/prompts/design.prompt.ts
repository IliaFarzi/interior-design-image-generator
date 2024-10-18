import {CreateImageDto} from "../dto/create-image.dto";
import {LocationsEnumEn} from "../enums/locationsEnumEn";
import {ItemsEnumEN} from "../enums/items.enum";
import {MaterialsEnumEn} from "../enums/materials.enum";
import {ColorEnumEn} from "../enums/colors.enum";
import {StyleEnumEn} from "../enums/styles.enum";

export const DesignPrompt = (data: CreateImageDto) => {
    let prompt = `
Design a ${LocationsEnumEn[data.location]} inspired by the ${StyleEnumEn[data.style]} style. Focus on creating a harmonious and functional space that evokes ${StyleEnumEn[data.style]}-ish vibe.
also following items are should be focus of this depiction:
`
    data.items.forEach(item => {
        prompt += `     -One ${ItemsEnumEN[item.name]} made of ${MaterialsEnumEn[item.material]}, designed in harmony with ${StyleEnumEn[data.style]}-ish vibe in ${ColorEnumEn[item.color]},\n`;
    });
    prompt += `Ensure the space reflects the principles of ${StyleEnumEn[data.style]} by maintaining key characteristics. also the functionality of ${LocationsEnumEn[data.location]} should be at display, with out ignoring properties of items above like color.`
    prompt += `also if more than one item is listed above all of them should be present in the generated image.`
    return prompt;
}
