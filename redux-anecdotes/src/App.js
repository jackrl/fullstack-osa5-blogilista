import React from 'react';

const actionFor = {
  vote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  create(content) {
    return {
      type: 'CREATE',
      data: { content }
    }
  }
}

class App extends React.Component {
  vote = (id) => () => {
    this.props.store.dispatch(
      actionFor.vote(id)
    )
  }

  createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch(
      actionFor.create(content)
    )
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App