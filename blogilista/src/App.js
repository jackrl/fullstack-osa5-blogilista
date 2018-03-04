import React from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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
    blogService.getAll().then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        this.setState({ blogs })
      }
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

  handleLike = (blog) => {
    blogService
      .like(blog)
      .then(newBlog => {
        const index = this.state.blogs.findIndex(b => b.id === newBlog.id)
        const updatedBlogs = [...this.state.blogs]
        const blog = updatedBlogs[index]
        const updatedBlog = {...blog, likes: newBlog.likes}
        updatedBlogs[index] = updatedBlog;
        updatedBlogs.sort((a, b) => b.likes - a.likes)
        this.setState({
          blogs: updatedBlogs
        })
      })
  }

  handleDelete = (blog) => {
    console.log('Delete being handled')
    if(window.confirm(`delete '${blog.title}' by ${blog.author}`)) {
      blogService
        .remove(blog)
        .then(() => {
          const index = this.state.blogs.findIndex(b => b.id === blog.id)
          const updatedBlogs = [...this.state.blogs]
          updatedBlogs.splice(index, 1)
          this.setState({
            blogs: updatedBlogs
          })
        })
    }
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

    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          onSubmit={this.addBlog}
          newBlogTitle={this.state.newBlogTitle}
          newBlogAuthor={this.state.newBlogAuthor}
          newBlogUrl={this.state.newBlogUrl}
          handleChange={this.handleFieldChange}
        />
      </Togglable>
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

        <br/>
        {blogForm()}
        <br/>

        <div>
          {this.state.blogs.map(blog => 
            <Blog
              key={blog.id}
              blog={blog}
              user={this.state.user}
              handleLike={this.handleLike}
              handleDelete={this.handleDelete}
            />
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
