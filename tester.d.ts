export declare function test(name: string, func: () => unknown): void;
export declare class TestFailure extends Error {
    constructor(...args: any[]);
}
declare class Expectation<T> {
    readonly thing: T;
    constructor(thing: T);
    toBeEqual(other: any): void;
    toBeLooselyEqual(other: any): void;
    toBeTrue(): void;
    to(func: (thing: T) => any, descripton?: string): void;
    manuallyTo(func: (thing: T) => any): string;
    toThrow(func: (thing: T) => any): any;
}
export declare function expect<T>(thing: T): Expectation<T>;
export {};
//# sourceMappingURL=tester.d.ts.map