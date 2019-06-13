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

  async submitHandler () {
    let result
    if (!this.state.max) {
      result = '[]'
    } else {
      try {
        const { data } = await axios.get(`http://localhost:3001/primeMedians/${this.state.max}`)
        result = JSON.stringify(data.primeMedian)
      } catch (err) {
        result = err.response && err.response.data && err.response.data.reason
          ? err.response.data.reason
          : err.message
      }
    }
    this.setState({ result })
  }
  render () {
    return (
      <form onSubmit={() => this.submitHandler()} action='javascript:void(0);'>
        <h1>Please give me a positive number and I will tell you the median all prime numbers less than that.</h1>
        <input
          name='max'
          type='number'
          min='0'
          id='max'
          value={this.state.max}
          onChange={this.changeHandler.bind(this)}
        />
        <input type='submit' />
        <p>Result: {this.state.result}</p>
      </form>
    )
  }
}

export default Index
