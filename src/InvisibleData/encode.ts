import {
    IDTypes,
    typeMap,
    whitespaces
} from "./constants";

function parseType(input: IDTypes): [typeof input, string] {
    if (typeof input == 'object')
        return [
            'object',
            JSON.stringify(input)
        ];

    return [
        typeof input,
        input.toString()
    ];
}

/**
 * 
 * Encodes data using zero width spaces
 * @param {IDTypes} input Data to encode
 * @returns {string}
 */
export function encode(input: IDTypes): string {
    const [type, string] = parseType(input);
    const encodedType = typeMap[type.toString()] || '\u2060';

    const encoded = Array.from(string)
        .map(char => char
            .charCodeAt(0)
            .toString(whitespaces.length)
            .padStart(4, '0')
        )
        .join('');

    return encodedType + Array.from(encoded).map(x => whitespaces[x]).join('');
}