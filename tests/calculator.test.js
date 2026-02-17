const { add } = require('../src/calculator');

describe('Calculator', () => {
  describe('add function', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('adds positive and negative numbers', () => {
      expect(add(10, -3)).toBe(7);
    });

    test('adds zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });

    test('adds floating point numbers', () => {
      expect(add(1.5, 2.3)).toBeCloseTo(3.8);
    });

    test('adds large numbers', () => {
      expect(add(1e10, 2e10)).toBe(3e10);
    });

    test('throws TypeError for non-number first argument', () => {
      expect(() => add('5', 3)).toThrow(TypeError);
      expect(() => add(null, 3)).toThrow(TypeError);
      expect(() => add(undefined, 3)).toThrow(TypeError);
    });

    test('throws TypeError for non-number second argument', () => {
      expect(() => add(5, '3')).toThrow(TypeError);
      expect(() => add(5, null)).toThrow(TypeError);
      expect(() => add(5, undefined)).toThrow(TypeError);
    });

    test('throws RangeError for Infinity', () => {
      expect(() => add(Infinity, 3)).toThrow(RangeError);
      expect(() => add(5, Infinity)).toThrow(RangeError);
    });

    test('throws RangeError for NaN', () => {
      expect(() => add(NaN, 3)).toThrow(RangeError);
      expect(() => add(5, NaN)).toThrow(RangeError);
    });
  });
});
