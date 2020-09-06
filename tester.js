"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.TestFailure = exports.test = void 0;
const chalk_1 = require("chalk");
const util_1 = require("util");
function pass(what, ret) {
    console.log(chalk_1.green('Test PASS') + ': ' + what + '\nReturn value: ' + util_1.format(ret) + '\n');
}
function fail(what, err) {
    console.log(chalk_1.red('Test FAIL') + ': ' + what + '\nError: ' + util_1.format(err) + '\n');
}
function test(name, func) {
    try {
        const r = func();
        pass(name, r);
    }
    catch (e) {
        fail(name, e);
    }
}
exports.test = test;
class TestFailure extends Error {
    constructor(...args) {
        super(...args);
    }
}
exports.TestFailure = TestFailure;
class Expectation {
    constructor(thing) {
        this.thing = thing;
    }
    toBeEqual(other) {
        if (this.thing === other)
            return;
        throw new TestFailure(util_1.format(this.thing) + ' should have been equal to ' + util_1.format(other));
    }
    toBeLooselyEqual(other) {
        if (this.thing == other)
            return;
        throw new TestFailure(util_1.format(this.thing) + ' should have been loosely equal to ' + util_1.format(other));
    }
    toBeTrue() {
        if (this.thing)
            return;
        throw new TestFailure(util_1.format(this.thing) + 'should have been true');
    }
    to(func, descripton) {
        try {
            const r = func(this.thing);
            return;
        }
        catch (e) {
            throw new TestFailure(util_1.format(this.thing) + descripton + ', but ' + e.message);
        }
    }
    manuallyTo(func) {
        func(this.thing);
        return 'MANUAL!';
    }
    toThrow(func) {
        let failure = undefined;
        try {
            func(this.thing);
        }
        catch (e) {
            failure = e;
        }
        if (failure === undefined)
            throw new TestFailure(util_1.format(func) + ' was supposed to fail on ' + util_1.format(this.thing));
        return failure;
    }
}
function expect(thing) {
    return new Expectation(thing);
}
exports.expect = expect;
//# sourceMappingURL=tester.js.map