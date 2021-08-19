import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



let component
let mockHandler

beforeEach(() => {
  mockHandler = jest.fn()
  const user = {
    username: 'moi'
  }
  const blog = {
    title: 'Testiblogi',
    author: 'Testiauthori',
    url: 'url69',
    likes: '5',
    user: user
  }
  component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )
})


test('renders title and author', () => {
  expect(component.container).toHaveTextContent(
    'Testiblogi', 'Testiauthori'
  )
})


test('does not render url and likes', () => {
  expect(component.container.querySelector('#blogDetails'))
    .toHaveStyle('display: none')

})


test('renders blog details after button press', () => {

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'url69', '5'
  )
})


test('event handler is called twice', () => {

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

