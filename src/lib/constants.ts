export type Types = bigint | boolean | number | object | string;

export const Types = {
    bigint: '\u200B',
    boolean: '\u200C',
    number: '\u200D',
    object: '\u2060',
    string: '\uFEFF'
};

export const whitespaces = ['\u200B', '\u200C', '\u200D', '\u2060', '\uFEFF'];
export const regex = /[\u200B\u200C\u200D\u2060\uFEFF][\u180E\u200B\u200C\u200D\u2060\uFEFF]{4,}/;