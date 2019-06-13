/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import App from '../pages/index.js'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { primeMedian: [2] } }))
}))

const axios = require('axios')

describe('With Enzyme', () => {
  const index = shallow(<App />)
  it('Index contains "result"', () => {
    expect(index.find('#result').text()).toEqual('Result: ')
  })

  it('should match with snapshot', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('check state', async () => {
    expect(index.state()).toHaveProperty('max', 0)
    expect(index.state()).toHaveProperty('result', '')
  })

  describe('getPrimeMedian', () => {
    let instance
    beforeAll(async () => {
      instance = await index.instance()
    })
    beforeEach(() => {
      axios.get.mockClear()
    })

    it('should have called axios stub', async () => {
      const result = await instance.getPrimeMedian(2)
      expect(result).toEqual('[2]')
      expect(axios.get).toHaveBeenCalled()
    })

    it('should not have called axios stub', async () => {
      const instance = await index.instance()
      const result = await instance.getPrimeMedian(0)
      expect(result).toEqual('[]')
      expect(axios.get).toHaveBeenCalledTimes(0)
    })

    it('should have return error', async () => {
      const instance = await index.instance()
      const result = await instance.getPrimeMedian('a')
      expect(result).toEqual('INVALID_INPUT')
      expect(axios.get).toHaveBeenCalledTimes(0)
    })

    it('should have return error', async () => {
      const instance = await index.instance()
      instance.state.max = 1
      expect(instance.state.result).toEqual('')
      await instance.submitHandler()
      expect(instance.state.result).toEqual('[]')
    })
  })
})
