import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Some title',
      author: 'Some author',
      likes: 9000
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const infoDiv = simpleBlogComponent.find('.info')
    const likesDiv = simpleBlogComponent.find('.likes')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking the button twice calls the event handler twice', () => {
    const blog = {
      title: 'Some title',
      author: 'Some author',
      likes: 9000
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})