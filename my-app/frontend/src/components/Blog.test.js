import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: '8blog title',
    author: '8blog author',
    url: '8http://tst2-123.ru',
    likes: 10,
    user: {
      username: 'jojo',
      name: 'Deniska',
      id: '6558b254ae9f1ea3b8400030',
    },
    id: '655ba26500eebe8e4222b767',
  }
  const currentUser = {
    username: 'xakyth',
    name: 'Roman',
  }

  test('blog\'s title and author rendered by default, but no URL likes user', () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={currentUser}
        handleLike={() => null}
        handleRemove={() => null}
      />
    )
    const short = container.querySelector('.blogShort')
    const full = container.querySelector('.blogFull')
    expect(short).not.toHaveStyle('display: none')
    expect(full).toHaveStyle('display: none')
  })

  test('blog expands when view button is clicked', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        user={currentUser}
        handleLike={() => null}
        handleRemove={() => null}
      />
    )
    const user = userEvent.setup()
    const short = container.querySelector('.blogShort')
    const full = container.querySelector('.blogFull')
    const viewButton = screen.getByText('view')

    await user.click(viewButton)
    expect(short).toHaveStyle('display: none')
    expect(full).not.toHaveStyle('display: none')
  })

  test('if like button clicked twice, event handler recieve 2 events of like', async () => {
    const handleLike = jest.fn()
    const { container } = render(
      <Blog
        blog={blog}
        user={currentUser}
        handleLike={handleLike}
        handleRemove={() => null}
      />
    )
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
