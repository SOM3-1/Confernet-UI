import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CreateEventButton } from '../../../../src/Components/Event/CreateEventButton';
import * as userService from '@/services/userService';
import { onAuthStateChanged } from 'firebase/auth';

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    onAuthStateChanged: vi.fn(),
    auth: {},
  };
});

vi.mock('@/Components/Schedule/CreateEventModal', () => ({
  CreateEventModal: ({ open }) => (open ? <div data-testid="modal">Modal</div> : null),
}));

describe('CreateEventButton (Vite + Vitest)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('test-id: 1,renders the button if user is an organizer', async () => {
    const mockUser = { uid: '123' };
    vi.spyOn(userService, 'getUserById').mockResolvedValue({ role: 1 });
    onAuthStateChanged.mockImplementation((_, callback) => {
      callback(mockUser);
      return () => {};
    });

    render(<CreateEventButton handleClose={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText(/create event/i)).toBeInTheDocument();
    });
  });

  it('test-id: 2,does NOT render the button if user is not an organizer', async () => {
    const mockUser = { uid: '456' };
    vi.spyOn(userService, 'getUserById').mockResolvedValue({ role: 2 });
    onAuthStateChanged.mockImplementation((_, callback) => {
      callback(mockUser);
      return () => {};
    });

    render(<CreateEventButton handleClose={() => {}} />);
    await waitFor(() => {
      expect(screen.queryByText(/create event/i)).not.toBeInTheDocument();
    });
  });

  it('test-id: 3,opens the modal on button click', async () => {
    const mockUser = { uid: '789' };
    vi.spyOn(userService, 'getUserById').mockResolvedValue({ role: 1 });
    onAuthStateChanged.mockImplementation((_, callback) => {
      callback(mockUser);
      return () => {};
    });

    render(<CreateEventButton handleClose={() => {}} />);
    const btn = await screen.findByText(/create event/i);
    fireEvent.click(btn);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
});
