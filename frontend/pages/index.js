import { Component } from 'react'
import axios from 'axios'
class Index extends Component {
  constructor (a, b) {
    super(a, b)
    this.state = { max: 0, result: '' }
  }
  changeHandler (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  };

  async getPrimeMedian (max) {
    let result
    if (isNaN(max) || max < 0) {
      return 'INVALID_INPUT'
    } else if (max > 1) {
      try {
        const { data } = await axios.get(`http://localhost:3001/primeMedians/${max}`)
        result = JSON.stringify(data.primeMedian)
      } catch (err) {
        result = err.response && err.response.data && err.response.data.reason
          ? err.response.data.reason
          : err.message
      }
    } else {
      result = '[]'
    }
    return result
  }

  async submitHandler () {
    const result = await this.getPrimeMedian(this.state.max)
    this.setState({ result })
  }

  render () {
    return (
      <form id='primeMedian' onSubmit={() => this.submitHandler()} action='javascript:void(0);'>
        <h1 id='description'>Please give me a positive number and I will tell you the median of all prime numbers less than that.</h1>
        <input
          name='max'
          type='number'
          min='0'
          id='max'
          value={this.state.max}
          onChange={this.changeHandler.bind(this)}
        />
        <input type='submit' />
        <p id='result'>Result: {this.state.result}</p>
      </form>
    )
  }
}

export default Index
