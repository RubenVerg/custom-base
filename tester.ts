import { green, red } from 'chalk'
import { format } from 'util'

function pass(what: string, ret?: any) {
    console.log(green('Test PASS') + ': ' + what + '\nReturn value: ' + format(ret) + '\n');
}

function fail(what: string, err: Error) {
    console.log(red('Test FAIL') + ': ' + what + '\nError: ' + format(err) + '\n');
}

export function test(name: string, func: () => unknown): void {
    try {
        const r = func();
        pass(name, r);
    } catch (e) {
        fail(name, e);
    }
}

export class TestFailure extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

class Expectation<T> {
    constructor(readonly thing: T) { }

    toBeEqual(other: any) {
        if (this.thing === other) return;
        throw new TestFailure(format(this.thing) + ' should have been equal to ' + format(other));
    }

    toBeLooselyEqual(other: any) {
        if (this.thing == other) return;
        throw new TestFailure(format(this.thing) + ' should have been loosely equal to ' + format(other));
    }

    toBeTrue() {
        if (this.thing) return;
        throw new TestFailure(format(this.thing) + 'should have been true');
    }

    to(func: (thing: T) => any, descripton?: string) {
        try {
            const r = func(this.thing);
            return;
        } catch (e) {
            throw new TestFailure(format(this.thing) + descripton + ', but ' + (e as Error).message);
        }
    }

    manuallyTo(func: (thing: T) => any) {
        func(this.thing);
        return 'MANUAL!';
    }

    toThrow(func: (thing: T) => any) {
        let failure = undefined;
        try {
            func(this.thing);
        } catch (e) {
            failure = e;
        }
        if (failure === undefined) throw new TestFailure(format(func) + ' was supposed to fail on ' + format(this.thing));
        return failure;
    }
}

export function expect<T>(thing: T) {
    return new Expectation(thing);
}