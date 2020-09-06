import { keysToValues, parse, Glyphs, constants, fromArray } from "./index";
import { test, expect } from './tester';

test('keysToValues should work correctly', () => {
	const o = { a: 1, b: 'b', c: [], d: { e: 'f' } };

	return expect(keysToValues(o)).manuallyTo(console.log as (...args: any[]) => any);
});

test('base10 basic parse test', () => {
	return expect(parse(constants.DECIMAL, 10, '12345')).toBeEqual(12345)
});

test('non-base10 (16) test', () => {
	return expect(parse(constants.HEXADECIMAL, 16, 'fF')).toBeEqual(0xff)
});

test('negative test', () => {
	return expect(parse(constants.DECIMAL, 10, '-10')).toBeEqual(-10)
});

test('not designed test', () => {
	return expect('128').toThrow(t => console.log(parse(constants.OCTAL, 8, t)))
});

test('fromArray', () => {
	expect(fromArray('0123456789')).manuallyTo(obj => console.log(obj));
});