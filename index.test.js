"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const tester_1 = require("./tester");
tester_1.test('keysToValues should work correctly', () => {
    const o = { a: 1, b: 'b', c: [], d: { e: 'f' } };
    return tester_1.expect(index_1.keysToValues(o)).manuallyTo(console.log);
});
tester_1.test('base10 basic parse test', () => {
    return tester_1.expect(index_1.parse(index_1.constants.DECIMAL, 10, '12345')).toBeEqual(12345);
});
tester_1.test('non-base10 (16) test', () => {
    return tester_1.expect(index_1.parse(index_1.constants.HEXADECIMAL, 16, 'fF')).toBeEqual(0xff);
});
tester_1.test('negative test', () => {
    return tester_1.expect(index_1.parse(index_1.constants.DECIMAL, 10, '-10')).toBeEqual(-10);
});
tester_1.test('not designed test', () => {
    return tester_1.expect('128').toThrow(t => console.log(index_1.parse(index_1.constants.OCTAL, 8, t)));
});
tester_1.test('fromArray', () => {
    tester_1.expect(index_1.fromArray('0123456789')).manuallyTo(obj => console.log(obj));
});
//# sourceMappingURL=index.test.js.map