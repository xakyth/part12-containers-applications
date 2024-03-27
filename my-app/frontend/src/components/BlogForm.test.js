import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('submitting blog sends correct data', async () => {
    const createBlog = jest.fn()
    render(<BlogForm createBlog={createBlog} />)
    const user = userEvent.setup()

    const titleTextbox = screen.getByPlaceholderText('Title')
    const authorTextbox = screen.getByPlaceholderText('Author')
    const urlTextbox = screen.getByPlaceholderText('URL')
    await user.type(titleTextbox, 'some title')
    await user.type(authorTextbox, 'some author')
    await user.type(urlTextbox, 'some url')

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    const expectedBlog = {
      title: 'some title',
      author: 'some author',
      url: 'some url',
    }
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(expectedBlog)
  })
})
