import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('does not show blogs', () => {
      app.update()

      const blogComponents = app.find(Blog)
      console.log(blogComponents)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('show blogs', () => {
      app.update()

      const blogComponents = app.find(Blog)
      console.log(blogComponents)
      expect(blogComponents.length).not.toEqual(0)
    })
  })
})