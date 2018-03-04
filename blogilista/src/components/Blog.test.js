import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Some title',
    author: 'Some author',
    url: 'http://cs.helsinki.fi',
    likes: 9000,
    user: {
      name: 'Anonymous',
      username: 'anonim'
    }
  }

  const user = {
    username: 'anonim'
  }

  let BlogComponent

  beforeEach(() => {
    BlogComponent = shallow(
      <Blog blog={blog} user={user}/>
    )
  })

  it('renders basic info', () => {
    const wrapperDiv = BlogComponent.find('.wrapper')
    expect(wrapperDiv.text()).toContain(blog.title)
    expect(wrapperDiv.text()).toContain(blog.author)
  })

  it('at start the extraInfo dev is not displayed', () => {
    const extraInfoDiv = BlogComponent.find('.extraInfo')
    expect(extraInfoDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the wrapper div, the extraInfo div is displayed', () => {
    const wrapperDiv = BlogComponent.find('.wrapper')

    wrapperDiv.at(0).simulate('click')
    const extraInfoDiv = BlogComponent.find('.extraInfo')
    expect(extraInfoDiv.getElement().props.style).toEqual({ display: '' })
  })
})