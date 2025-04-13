import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Message from "../../../../src/Components/Messages/Message";
import { vi, describe, it, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/services/userService", () => ({
  getAllUsers: vi.fn(),
}));

vi.mock("@/services/messageService", () => ({
  getConversations: vi.fn(),
}));

vi.mock("../../../../src/Components/Message/MessageModal", () => ({
  default: ({ open, onClose, senderId, receiverId, receiverName }) => (
    open ? <div data-testid="chat-popup">Chat with {receiverName}</div> : null
  ),
}));

const mockUsers = [
  { id: "u1", name: "John Doe" },
  { id: "u2", name: "Jane Smith" },
];

const mockConversations = [
  {
    id: "c1",
    otherUserId: "u2",
    lastMessage: "Hello!",
    lastSender: "u2",
  },
];

import { getAllUsers } from "@/services//userService";
import { getConversations } from "@/services//messageService";

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.setItem("userId", "u1");
});

describe("Message Component", () => {
  it("test-id: 22,renders inbox and fetches users + conversations", async () => {
    getAllUsers.mockResolvedValue(mockUsers);
    getConversations.mockResolvedValue(mockConversations);

    render(
      <MemoryRouter>
        <Message />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Inbox")).toBeInTheDocument();
      expect(screen.getByText("From Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Hello!")).toBeInTheDocument();
    });
  });

  it("test-id: 23, filters conversations by search input", async () => {
    getAllUsers.mockResolvedValue(mockUsers);
    getConversations.mockResolvedValue(mockConversations);

    render(
      <MemoryRouter>
        <Message />
      </MemoryRouter>
    );

    await screen.findByText("From Jane Smith");
    fireEvent.change(screen.getByPlaceholderText("Search by name..."), {
      target: { value: "john" },
    });

    await waitFor(() => {
      expect(screen.queryByText("From Jane Smith")).not.toBeInTheDocument();
    });
  });

  it("test-id: 24, renders disabled New Message button only", async () => {
    getAllUsers.mockResolvedValue(mockUsers);
    getConversations.mockResolvedValue([]);
  
    render(
      <MemoryRouter>
        <Message />
      </MemoryRouter>
    );
  
    const newMsgButton = screen.getByRole("button", { name: /New Message/i });
    expect(newMsgButton).toBeInTheDocument();
    expect(newMsgButton).toBeDisabled();
  });
  

  it("test-id: 25, opens existing chat popup from conversation list", async () => {
    getAllUsers.mockResolvedValue(mockUsers);
    getConversations.mockResolvedValue(mockConversations);

    render(
      <MemoryRouter>
        <Message />
      </MemoryRouter>
    );

    await screen.findByText("From Jane Smith");
    fireEvent.click(screen.getByRole("button", { name: /Continue Chat/i }));

    await waitFor(() => {
      expect(screen.getByTestId("chat-popup")).toBeInTheDocument();
      expect(screen.getByText(/Chat with Jane Smith/i)).toBeInTheDocument();
    });
  });
});
