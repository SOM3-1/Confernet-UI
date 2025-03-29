import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatPopup from "../../../src/Components/Messages/MessageModal";
import { getChatHistory, sendMessage } from "../../../src/services/messageService";

vi.mock("../../../src/services/messageService", () => ({
  getChatHistory: vi.fn(),
  sendMessage: vi.fn(),
}));

const props = {
  open: true,
  onClose: vi.fn(),
  senderId: "user1",
  receiverId: "user2",
  receiverName: "Jane Smith",
};

const mockMessages = [
  {
    id: "1",
    senderId: "user1",
    message: "Hello!",
    timestamp: { _seconds: 1711586000 },
  },
  {
    id: "2",
    senderId: "user2",
    message: "Hey!",
    timestamp: { _seconds: 1711586060 },
  },
];

describe("ChatPopup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getChatHistory.mockResolvedValue(mockMessages);
  });

  it("test-id: 18, renders chat messages", async () => {
    render(<ChatPopup {...props} />);

    expect(screen.getByTestId("chat-popup")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Hello!")).toBeInTheDocument();
      expect(screen.getByText("Hey!")).toBeInTheDocument();
    });
  });

  it("test-id: 19, calls onClose when close icon is clicked", async () => {
    render(<ChatPopup {...props} />);
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(props.onClose).toHaveBeenCalled();
  });

  it("test-id: 20,sends a message on send icon click", async () => {
    sendMessage.mockResolvedValueOnce({});
    render(<ChatPopup {...props} />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "New message" } });

    const sendBtn = screen.getByRole("button", { name: /send/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith("user1", "user2", "New message");
    });
  });

  it("test-id: 21,sends a message on Enter key press", async () => {
    sendMessage.mockResolvedValueOnce({});
    render(<ChatPopup {...props} />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Enter message" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith("user1", "user2", "Enter message");
    });
  });
});
