import { MiniMaple } from "../src/miniMaple";

test('d(5x^4)/dx', () => {
    expect(MiniMaple.d('5x^4', 'x')).toEqual('20*x^3');
});

test('d(6x^5 - 2x^3)/dx with spaces', () => {
    expect(MiniMaple.d('6 * x^5 - 2 * x^3', 'x')).toEqual('30*x^4 - 6*x^2');
});

test('d(3x^2)/dy', () => {
    expect(MiniMaple.d('3x^2', 'y')).toEqual('0');
});

test('d(4*x^3 - x^2)/dx', () => {
    expect(MiniMaple.d('4*x^3 - x^2', 'x')).toEqual('12*x^2 - 2*x');
});

test('d(2x^3 + 3x^2 - 5x + 7)/dx', () => {
    expect(MiniMaple.d('2x^3 + 3x^2 - 5x + 7', 'x')).toEqual('6*x^2 + 6*x - 5');
});

test('Throw error on consecutive operators', () => {
    expect(() => MiniMaple.d('5++x^2', 'x')).toThrow(Error);
    expect(() => MiniMaple.d('4*+x^2', 'x')).toThrow(Error);
    expect(() => MiniMaple.d('3x^^2', 'x')).toThrow(Error);
});

test('Unsupported operations like division should throw an error', () => {
    expect(() => MiniMaple.d('x / y', 'x')).toThrow(Error);
});

test('should throw an error for operations like trigonometric functions', () => {
    expect(() => MiniMaple.d('sin(x)', 'x')).toThrow(Error);
});

test('throws error for malformed term with missing exponent', () => {
    expect(() => MiniMaple.d('x^', 'x')).toThrow(Error);;
});

test('throws error for term starting with an operator', () => {
    expect(() => MiniMaple.d('*x^2', 'x')).toThrow(Error);;
});