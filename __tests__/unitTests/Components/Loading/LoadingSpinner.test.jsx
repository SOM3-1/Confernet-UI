import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../../../../src/Components/Loading/LoadingSpinner'
import '@testing-library/jest-dom'

describe('LoadingSpinner', () => {
  it('test-id: 4,renders the spinner', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('progressbar')
    expect(spinner).toBeInTheDocument()
  })

  it('test-id: 5,is wrapped in the loading-overlay div', () => {
    const { container } = render(<LoadingSpinner />)
    const wrapper = container.querySelector('.loading-overlay')
    expect(wrapper).toBeInTheDocument()
  })
})
