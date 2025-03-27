import { API_URL } from "./../constants/api";

export const sendMessage = async (senderId, receiverId, message) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId, receiverId, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    return data;
  } catch (error) {
    console.error("Send Message Error:", error.message);
    throw error;
  }
};

export const getConversations = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/messages/${userId}/conversations`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch conversations");
    }

    return data;
  } catch (error) {
    console.error("Fetch Conversations Error:", error.message);
    throw error;
  }
};

export const getChatHistory = async (user1, user2) => {
  try {
    const response = await fetch(`${API_URL}/messages/${user1}/${user2}/history`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch chat history");
    }

    return data;
  } catch (error) {
    console.error("Fetch Chat History Error:", error.message);
    throw error;
  }
};
