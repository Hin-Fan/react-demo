/**
 * Returns all prime number smaller than the given numer using Sieve of Eratosthenes
 * algorithm.  This implementation utilizes indices of an array instead of its elements
 * as JS key iterator only returns keys that are initialized.
 * @param {Number} max must be an natural number > 0.
 * @returns {Array[Number]} A list of prime numbers that are >= max.
 */
export const getPrimeList = max => {
  if (typeof max !== 'number' || max < 0) throw new Error('INVALID_INPUT')

  const numberList = new Array(max + 1).fill(true)

  delete numberList[0]
  delete numberList[1]

  let index = 0
  let currentPrime
  while ((currentPrime = +Object.keys(numberList)[index++]) > 0) {
    for (let j = currentPrime + currentPrime; j <= max; j += currentPrime) {
      delete numberList[j]
    }
  }
  return Object.keys(numberList).map(e => +e)
}

/**
 * Returns the median of an array with odd length, or medians with even length.
 * @param {Array<Number>} array Array
 * @returns {Array<Number>} The median(s)
 */
export const getMedian = array => {
  const med = array.length / 2
  const rounded = med | 0
  const [start, end] = med === rounded
    ? [med - 1, med + 1]
    : [rounded, rounded + 1]

  return array.slice(start, end)
}

/**
 * Compute all prime numbers less than max, and returns the median of an array
 * with odd length, or medians with even length.
 * @param {Number} max must be an natural number > 0.
 * @returns {Array<Number>} The median(s) of the array of prime numbers that are
 * less then max.
 */
export const getPrimeMedians = max => getMedian(getPrimeList(max))
