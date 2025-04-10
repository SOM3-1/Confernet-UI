// tests/components/People.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import People from '@/Components/People/People'

import { vi } from 'vitest'

vi.mock('@/services/userService', () => ({
    getAllUsers: () => Promise.resolve([
      {
        id: 'user1',
        name: 'Alice Johnson',
        role: 2,
        jobTitle: 'Developer',
        organization: 'OpenAI',
        city: 'New York',
        country: 'USA',
      },
    ]),
  }))
  
  vi.mock('@/services/messageService', () => ({
    sendMessage: vi.fn(() => Promise.resolve()),
  }))
  

describe('People Component', () => {
  it('test-id: 32,renders user and filters by search', async () => {
    render(<People />)

    await waitFor(() => {
      expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument()
    })

    const search = screen.getByPlaceholderText(/search people/i)
    fireEvent.change(search, { target: { value: 'bob' } })

    await waitFor(() => {
      expect(screen.queryByText(/Alice Johnson/i)).not.toBeInTheDocument()
    })
  })

  it('test-id: 33,sends a message on click', async () => {
    const { getByPlaceholderText, getByRole } = render(<People />)

    await waitFor(() => {
      expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument()
    })

    const messageInput = getByPlaceholderText(/message Alice Johnson/i)
    fireEvent.change(messageInput, { target: { value: 'Hello!' } })

    const sendButton = getByRole('button', { name: /send/i })
    fireEvent.click(sendButton)

    await waitFor(() =>
      expect(screen.getByText(/Message sent successfully/i)).toBeInTheDocument()
    )
  })
})
