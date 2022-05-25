import {
    IDTypes,
    whitespaces,
    validator,
    typeMap
} from "./constants";

function convertType(input: string, type: string): IDTypes {
    if (type == typeMap.bigint)
        return BigInt(input);
    else if (type == typeMap.boolean || type == typeMap.object)
        return JSON.parse(input);
    else if (type == typeMap.number)
        return parseFloat(input);

    return input.toString();
}

/**
 * 
 * Decode data
 * @param {string} input Data to decode
 * @returns {IDTypes}
 */
export function decode(input: string): IDTypes | null {
    const match = validator.exec(input);

    if (!match) return null;

    const [type, encoded] = [
        match[0][0],
        Array.from(match[0].slice(1))
             .map(chr => whitespaces.indexOf(chr))
             .join('')
    ];

    const chars = encoded.match(/.{1,4}/g);
    const decoded = chars.map(char => String.fromCharCode(parseInt(char, whitespaces.length))).join('');

    return convertType(decoded, type);
}