/**
 * `Glyphs` is a simple interface representing glyph-to-number associations.
 * @remarks
 * Glyphs (keys) are to be associated to positive (and 0) integers only, except for the special cases `-1` (used to represent the sign to be prepended for negativity) and `-2` (representing explicit positivity).
 * @example
 * ```typescript
 * const decimal = {
 *   "0": 0,
 *   "1": 1,
 *   "2": 2,
 *   "3": 3,
 *   "4": 4,
 *   "5": 5,
 *   "6": 6,
 *   "7": 7,
 *   "8": 8,
 *   "9": 9,
 *   "-": -1,
 *   "+": -2
 * } as Glyphs
 * ```
 */
export interface Glyphs {
	[key: string]: number
}

/**
 * "Flips" an object representation: keys become values and viceversa.
 * @remarks
 * As all JavaScript/TS object keys must be string, every value will get stringified before being turned into a key.
 * @example
 * ```typescript
 * keysToValues({
 *   a: 'b',
 *   c: 'd'
 * });
 * // → {
 *   b: 'a',
 *   d: 'c'
 * }
 * ```
 * @param obj The object to be flipped
 */
export function keysToValues(obj: object): object {
	let out = {};
	const k = Object.keys(obj);
	const v = Object.keys(obj).map(k => obj[k]);
	for (let i = 0; i < k.length; i++) {
		out[v[i]] = k[i];
	}
	return out;
}

export function fromArray(_arr: Iterable<string>, neg: string = '-', pos: string = '+'): Glyphs {
	const arr = [..._arr];
	if (arr.filter(i => i.length !== 1).length !== 0) throw new TypeError('All glyphs must be one character long.');

	let r = {} as Glyphs;

	arr.forEach((char, i) => {
		r[char] = i;
	});

	r[neg] = -1;
	r[pos] = -2;

	return r;
}

export function fromInsensitiveArray(_arr: Iterable<string>, neg: string = '-', pos: string = '+') {
	const arr = [..._arr];
	if (arr.filter(i => i.length !== 1).length !== 0) throw new TypeError('All glyphs must be one character long.');

	let r = {} as Glyphs;

	arr.forEach((char, i) => {
		r[char.toLowerCase()] = i;
		r[char.toUpperCase()] = i;
	});

	r[neg] = -1;
	r[pos] = -2;

	return r;
}

export function parse(glyphs: Glyphs, base: number, num: string) {
	if (Object.keys(glyphs).filter(i => i.length !== 1).length !== 0) throw new TypeError('All glyphs must be one character long.');
	if (Object.keys(glyphs).filter((k, ind) => [...new Set(Object.keys(glyphs)).keys()].indexOf(k) !== ind).length !== 0) throw new TypeError('All glyphs must appear exaclty once.')

	let result = 0;
	const negated = num[0] === keysToValues(glyphs)[-1];
	const positived = num[0] === keysToValues(glyphs)[-2];

	const length = num.length;

	for (let i = length - ((negated || positived) ? 2 : 1); i >= 0; i--) {
		result += glyphs[[...num].reverse()[i]] * (base ** i);
	}

	if (isNaN(+result)) throw new TypeError('Character out of range');

	return negated ? -result : result;
}

export const constants = {
	/**
	 * ```0213456789```
	 * @remarks
	 * Base: 10
	 */
	DECIMAL: fromArray('0123456789'),
	/**
	 * ```0123456789abcdef```
	 * @caseinsensitive
	 * @remarks
	 * Base: 16
	 */
	HEXADECIMAL: fromInsensitiveArray('0123456789abcdef'),
	/**
	 * ```01234567```
	 * @remarks
	 * Base: 8
	 */
	OCTAL: fromArray('01234567'),
	/**
	 * ```01```
	 * @remarks
	 * Base: 2
	 */
	BINARY: fromArray('01'),
	/**
	 * ```ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/```
	 * @remarks
	 * Note: Uses ! for positive, as + is occupied
	 * Base: 64
	 */
	B64: fromArray('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', '-', '!'),
	/**
	 * ``` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_```
	 * @remarks
	 * Note: Uses ⊖ (0x2296) and ⊕ (0x2295) for neg/pos as both - and + are occupied
	 * Base: 64
	 */
	UUENCODING: fromArray(' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_', '\u{2296}', '\u{2295}'),
	/**
	 * ```./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz```
	 * @remarks
	 * Base: 64
	 */
	ETCPASSWD: fromArray('./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),
	/**
	 * ```./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789```
	 * @remarks
	 * Base: 64
	 */
	BCRYPT: fromArray('./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'),
	/**
	 * ```0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_```
	 * @remarks
	 * Base: 64
	 */
	BASH64: fromArray('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_'),
	/**
	 * ```0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~```
	 * @remarks
	 * Note: Uses ⊖ (0x2296) and ⊕ (0x2295) for neg/pos as both - and + are occupied
	 * Base: 85
	 */
	ASCII85: fromArray('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~', '\u{2296}', '\u{2295}'),
	/**
	 * ```abcdefghijklmnopqrstuvwxyz234567```
	 * @caseinsensitive
	 * @remarks
	 * Base: 32
	 */
	B32: fromInsensitiveArray('abcdefghijklmnopqrstuvwxyz23456789'),
	/**
	 * ```ybndrfg8ejkmcpqxot1uwisza345h769```
	 * @caseinsensitive
	 * @remarks
	 * Base: 32
	 */
	ZBASE32: fromInsensitiveArray('ybndrfg8ejkmcpqxot1uwisza345h769'),
	/**
	 * ```0123456789abcdefghijklmnopqrstuv```
	 * @caseinsensitive
	 * @remarks
	 * Base: 32
	 */
	B32ASHEX: fromInsensitiveArray('0123456789abcdefghijklmnopqrstuv'),
}