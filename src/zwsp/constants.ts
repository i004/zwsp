export type IDTypes = bigint | boolean | number | object | string;

export const whitespaces = ['\u200B', '\u200C', '\u200D', '\u2060', '\uFEFF'];
export const validator = /[\u200B\u200C\u200D\u2060\uFEFF][\u180E\u200B\u200C\u200D\u2060\uFEFF]{4,}/;
export const typeMap = {
    bigint: '\u200B',
    boolean: '\u200C',
    number: '\u200D',
    object: '\u2060',
    string: '\uFEFF'
};