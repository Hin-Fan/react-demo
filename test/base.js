/* eslint-env mocha */

import { expect } from 'chai'
import { getPrimeList, getMedian, getPrimeMedians } from '../src/lib/prime'

describe('prime', function () {
  describe('getPrimeList', function () {
    it('n is undefined', function () {
      try {
        getPrimeList(undefined)
      } catch (e) {
        expect(e.message).to.equal('INVALID_INPUT')
      }
    })
    it('n=-1', function () {
      try {
        getPrimeList(-1)
      } catch (e) {
        expect(e.message).to.equal('INVALID_INPUT')
      }
    })
    it('n=0', function () {
      expect(getPrimeList(0)).to.deep.equal([])
    })
    it('n=1', function () {
      expect(getPrimeList(1)).to.deep.equal([])
    })
    it('n=6', function () {
      expect(getPrimeList(6)).to.deep.equal([2, 3, 5])
    })
    it('n=7', function () {
      expect(getPrimeList(7)).to.deep.equal([2, 3, 5, 7])
    })
    it('n=10', function () {
      expect(getPrimeList(10)).to.deep.equal([2, 3, 5, 7])
    })
  })

  describe('getMadian', function () {
    it('odd number array', function () {
      expect(getMedian([1, 2, 3, 4, 5, 6, 7, 8, 9])).to.deep.equal([5])
    })
    it('even number array', function () {
      expect(getMedian([1, 2, 3, 4, 5, 6, 7, 8])).to.deep.equal([4, 5])
    })
  })

  describe('getPrimeMedians', function () {
    it('If n = 10, the set of prime numbers less than 10 is [2,3,5,7], and so the medians are [3,5]', function () {
      expect(getPrimeMedians(10)).to.deep.equal([3, 5])
    })
    it('If n = 18, the set of prime numbers less than 18 is [2,3,5,7,11,13,17], and so the median is [7]', function () {
      expect(getPrimeMedians(18)).to.deep.equal([7])
    })
  })
})
