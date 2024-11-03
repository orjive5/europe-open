import { IParticipantData } from "@/types/participantData.interface";

const ARRAY_SIZE = 8;

export function getUniqueCountryElements(array: IParticipantData[]) {
    const countryCodes = new Set<string>();

    return array.filter(element => {
        if (!countryCodes.has(element.country_code) && countryCodes.size < ARRAY_SIZE) {
            countryCodes.add(element.country_code);
            return true;
        }
        return false;
    });
}