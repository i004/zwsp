export type IDTypes = bigint | boolean | number | object | string;

export const whitespaces = [ '\u180E', '\u200B', '\u200C', '\u200D', '\u2060', '\uFEFF' ];
export const validator = /[\u180E\u200B\u200C\u200D\u2060][\u180E\u200B\u200C\u200D\u2060\uFEFF]{4,}/;
export const typeMap = { bigint: '\u180E', boolean: '\u200B', number: '\u200C', object: '\u200D', string: '\u2060' };