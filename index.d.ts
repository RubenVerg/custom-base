export interface Glyphs {
    [key: string]: number;
}
export declare function keysToValues(obj: object): {};
export declare function fromArray(_arr: Iterable<string>, neg?: string, pos?: string): Glyphs;
export declare function fromInsensitiveArray(_arr: Iterable<string>, neg?: string, pos?: string): Glyphs;
export declare function parse(glyphs: Glyphs, base: number, num: string): number;
export declare const constants: {
    /**
     * ```0213456789```
     * @remarks
     * Base: 10
     */
    DECIMAL: Glyphs;
    /**
     * ```0123456789abcdef```
     * @caseinsensitive
     * @remarks
     * Base: 16
     */
    HEXADECIMAL: Glyphs;
    /**
     * ```01234567```
     * @remarks
     * Base: 8
     */
    OCTAL: Glyphs;
    /**
     * ```01```
     * @remarks
     * Base: 2
     */
    BINARY: Glyphs;
    /**
     * ```ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/```
     * @remarks
     * Note: Uses ! for positive, as + is occupied
     * Base: 64
     */
    B64: Glyphs;
    /**
     * ``` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_```
     * @remarks
     * Note: Uses ⊖ (0x2296) and ⊕ (0x2295) for neg/pos as both - and + are occupied
     * Base: 64
     */
    UUENCODING: Glyphs;
    /**
     * ```./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz```
     * @remarks
     * Base: 64
     */
    ETCPASSWD: Glyphs;
    /**
     * ```./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789```
     * @remarks
     * Base: 64
     */
    BCRYPT: Glyphs;
    /**
     * ```0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_```
     * @remarks
     * Base: 64
     */
    BASH64: Glyphs;
    /**
     * ```0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~```
     * @remarks
     * Note: Uses ⊖ (0x2296) and ⊕ (0x2295) for neg/pos as both - and + are occupied
     * Base: 85
     */
    ASCII85: Glyphs;
    /**
     * ```abcdefghijklmnopqrstuvwxyz234567```
     * @caseinsensitive
     * @remarks
     * Base: 32
     */
    B32: Glyphs;
    /**
     * ```ybndrfg8ejkmcpqxot1uwisza345h769```
     * @caseinsensitive
     * @remarks
     * Base: 32
     */
    ZBASE32: Glyphs;
    /**
     * ```0123456789abcdefghijklmnopqrstuv```
     * @caseinsensitive
     * @remarks
     * Base: 32
     */
    B32ASHEX: Glyphs;
};
//# sourceMappingURL=index.d.ts.map