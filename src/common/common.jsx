/**
 * @author Sterling Hamilton <sterling.hamilton@gmail.com>
 */
function isNumber(value) {
  // We will not coerce boolean to numbers, although we could.
  // We will not coerce strings to numbers, even though we could try.
  // Referencing https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
  if (typeof value !== "number") {
    return false;
  }
  // Consider this as the NaN check.
  // NaN is a number.
  // NaN has the unique property of never equaling itself.
  // Pulled this hack right off of MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  if (value !== Number(value)) {
    return false;
  }
  // At this point, we for sure have some sort of number.
  // But not all numbers are finite, and realistically we want finite numbers.
  if (Number.isFinite(value) === false) {
    return false;
  }
  // It is indeed a number
  if (Number.isInteger(value)) {
    return true;
  }
}

export default isNumber;
