import React from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      username: '',
      password: '',
      user: null,
      notificationType: '',
      notificationMessage: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        notificationType: 'error',
        notificationMessage: 'wrong username or password'
      })
      setTimeout(() => {
        this.setState({
          notificationType: '',
          notificationMessage: ''
        })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlogTitle: '',
          newBlogAuthor: '',
          newBlogUrl: '',
          notificationType: 'success',
          notificationMessage: `a new blog '${newBlog.title}' by ${newBlog.author} added`
        })

        setTimeout(() => {
          this.setState({
            notificationType: '',
            notificationMessage: ''
          })
        }, 5000)
      })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <Notification 
          type={this.state.notificationType}
          message={this.state.notificationMessage}
        />

        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>blogs</h2>

        <Notification 
          type={this.state.notificationType}
          message={this.state.notificationMessage}
        />

        <form onSubmit={this.logout}>
          <div>
            {this.state.user.name} logged in 
            <button>logout</button>
          </div>
        </form>

        <div>
          <h2>create new</h2>
          
          <form onSubmit={this.addBlog}>
            <div>
              title
              <input
                type="text"
                name="newBlogTitle"
                value={this.state.newBlogTitle}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              author
              <input
                type="text"
                name="newBlogAuthor"
                value={this.state.newBlogAuthor}
                onChange={this.handleFieldChange}
              />
            </div>
            <div>
              url
              <input
                type="text"
                name="newBlogUrl"
                value={this.state.newBlogUrl}
                onChange={this.handleFieldChange}
              />
            </div>
            <button>create</button>
          </form>
        </div>

        <br/>

        <div>
          {this.state.blogs.map(blog => 
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      </div>
    )
    
    return (
      <div>
        {this.state.user === null ?
          loginForm() :
          blogList()
        }
      </div>
    )
  }
}

export default App;
