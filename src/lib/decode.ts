import {
    Types,
    whitespaces,
    regex
} from "./constants";

function convertType(input: string, type: string): Types {
    if (type == Types.bigint)
        return BigInt(input);
    else if (type == Types.boolean || type == Types.object)
        return JSON.parse(input);
    else if (type == Types.number)
        return parseFloat(input);

    return input.toString();
}

/**
 * 
 * Decodes zwsp-encoded data
 * @param {string} input ZWSP-encoded data to decode
 * @returns {Types}
 */
export function decode(input: string): Types | null {
    const match = regex.exec(input);

    if (!match) return null;

    const [type, encoded] = [
        match[0][0],
        Array.from(match[0].slice(1))
             .map(chr => whitespaces.indexOf(chr))
             .join('')
    ];

    const chars = encoded.match(/.{1,6}/g);
    const decoded = chars.map(char => String.fromCharCode(parseInt(char, whitespaces.length))).join('');

    return convertType(decoded, type);
}