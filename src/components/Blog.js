import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  like = (event) => {
    event.stopPropagation()
    this.props.handleLike(this.props.blog)
  }

  delete = (event) => {
    event.stopPropagation()
    this.props.handleDelete(this.props.blog)
  }

  render() {
    const blog = this.props.blog
    const isOwner = blog.user.username === this.props.user.username

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    let deleteButton = null
    if (isOwner) {
      deleteButton = <button onClick={this.delete}>delete</button>
    }
    
    return (
      <div style= { blogStyle } onClick={ this.toggleVisibility }>
        { blog.title } { blog.author }
        <div style={ showWhenVisible }>
          <p>{ blog.url }</p>
          <p>{ blog.likes } likes <button onClick={this.like}>like</button></p>
          <p>added by { blog.user.name }</p>
          {deleteButton}          
        </div>
      </div>
    )
  }
}

export default Blog