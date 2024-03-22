import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('<Todo />', () => {
  test('component is rendered with appropriate text', () => {
    const todo = { text: 'Hello from @testing-library', done: false }
    render(<Todo todo={todo} />)
    screen.getByText('Hello from @testing-library')
  })
})
