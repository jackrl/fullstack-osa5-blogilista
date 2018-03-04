import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import feedbackReducer from './feedbackReducer'

const Statistiikka = () => {
  const {good, ok, bad} = store.getState()
  const palautteita = good + ok + bad

  const calculateAverage = () => {
    let average = (good - bad) / palautteita
    if(!average) return 0
    return average.toFixed(1)
  }

  const calculatePositivesPercentage = () => {
    let positives = good / palautteita * 100
    if(!positives) return '0 %'
    return positives.toFixed(1) + ' %'
  }

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{calculateAverage()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{calculatePositivesPercentage()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(feedbackReducer)

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: 'GOOD'})}>hyvä</button>
        <button onClick={e => store.dispatch({ type: 'OK'})}>neutraali</button>
        <button onClick={e => store.dispatch({ type: 'BAD'})}>huono</button>
        <Statistiikka/>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)

export default App
