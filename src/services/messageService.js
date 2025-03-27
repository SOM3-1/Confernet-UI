import { API_URL } from "./../constants/api";

/**
 * The function `sendMessage` sends a message from a sender to a receiver using a POST request to an
 * API endpoint.
 * @param senderId - The `senderId` parameter represents the unique identifier of the user who is
 * sending the message.
 * @param receiverId - The `receiverId` parameter in the `sendMessage` function represents the unique
 * identifier of the user who will receive the message. It is used to specify the recipient of the
 * message being sent.
 * @param message - The `message` parameter in the `sendMessage` function represents the content of the
 * message that you want to send from the `senderId` to the `receiverId`. It could be a text message,
 * an image URL, or any other type of data that you want to transmit between the sender and
 * @returns The `sendMessage` function returns the data received from the API after successfully
 * sending a message. If there is an error during the process, it will throw an error with the message
 * "Failed to send message" or the specific error message received from the API response.
 */
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

/**
 * The function `getConversations` fetches conversations for a specific user ID from an API endpoint
 * and handles any errors that occur during the process.
 * @param userId - The `userId` parameter in the `getConversations` function represents the unique
 * identifier of the user for whom you want to retrieve conversations. This parameter is used to fetch
 * conversations specific to the user identified by the `userId`.
 * @returns The function `getConversations` returns the data fetched from the API endpoint
 * `/messages//conversations`. If the fetch is successful, it returns the conversation data.
 * If there is an error during the fetch, it throws an error with the message "Failed to fetch
 * conversations" or the specific error message received from the API response.
 */
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

/**
 * The function `getChatHistory` fetches chat history between two users from an API endpoint and
 * handles any errors that occur during the process.
 * @param user1 - User ID of the first user participating in the chat history.
 * @param user2 - User2 is the second user involved in the chat history retrieval. This function is
 * designed to fetch the chat history between two users, where user1 is one of the users and user2 is
 * the other user.
 * @returns The function `getChatHistory` returns the chat history data between two users (user1 and
 * user2) fetched from the API endpoint `/messages///history`. If the fetch
 * is successful, it returns the chat history data. If there is an error during the fetch, it throws an
 * error with the message "Failed to fetch chat history" or the specific
 */
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
