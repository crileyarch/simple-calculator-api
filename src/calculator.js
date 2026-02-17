/**
 * Adds two numbers and returns the sum.
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 * @throws {TypeError} If a or b is not a finite number
 * @throws {RangeError} If a or b is Infinity or NaN
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }

  if (!isFinite(a) || !isFinite(b)) {
    throw new RangeError('Both arguments must be finite numbers');
  }

  return a + b;
}

module.exports = { add };
