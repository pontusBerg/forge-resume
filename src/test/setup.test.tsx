import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('test setup', () => {
  it('renders with React Testing Library', () => {
    render(<div>Hello tests</div>)
    expect(screen.getByText('Hello tests')).toBeInTheDocument()
  })
})
