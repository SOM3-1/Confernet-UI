import { auth } from "./../firebase/firebaseConfig";
import { API_URL } from "./../constants/api"

/**
 * The function `getAllUsers` fetches all users from a specified API URL and returns the data, throwing
 * an error if the request is not successful.
 * @returns The function `getAllUsers` is returning the data fetched from the API endpoint
 * `/users`.
 */
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch users");
  return data;
};

/**
 * The function `getUserById` asynchronously fetches user data from an API based on a user ID.
 * @returns The `getUserById` function returns the data of a user fetched from the API based on the
 * user ID obtained asynchronously. If the user ID is not found or if there is an error during the API
 * request, it will return `null`.
 */
export const getUserById = async () => {
  const userId = await getUserId()
  if (userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "User not found");
    return data;
  }
  return null;
};

/**
 * The function `getNewUserById` fetches user data from an API based on the provided userId
 * asynchronously.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom you want to
 * retrieve information.
 * @returns The function `getNewUserById` returns the user data fetched from the API for the specified
 * `userId`. If the user is found, it returns the user data. If the user is not found or if there is an
 * error in fetching the data, it throws an error with the message "User not found". If the `userId` is
 * not provided (or falsy), it returns `null
 */
export const getNewUserById = async (userId) => {
  if (userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "User not found");
    return data;
  }
  return null;
};

/**
 * The `bookmarkSession` function sends a POST request to bookmark a session for a specific user and
 * handles any errors that may occur.
 * @param userId - The `userId` parameter represents the unique identifier of the user who is
 * bookmarking the session. It is used to specify which user is performing the bookmark action.
 * @param sessionId - The `sessionId` parameter in the `bookmarkSession` function represents the unique
 * identifier of the session that the user wants to bookmark. This identifier is used to specify which
 * session the user is bookmarking within the application.
 * @returns The function `bookmarkSession` is returning the data received from the API after
 * bookmarking a session.
 */
export const bookmarkSession = async (userId, sessionId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark/${sessionId}`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to bookmark session");
  return data;
};

/**
 * This function removes a bookmarked session for a specific user by sending a DELETE request to the
 * API endpoint.
 * @param userId - The `userId` parameter represents the unique identifier of the user whose bookmarked
 * session needs to be removed.
 * @param sessionId - The `sessionId` parameter in the `removeBookmarkedSession` function represents
 * the unique identifier of the session that the user wants to remove from their bookmarks.
 * @returns The function `removeBookmarkedSession` is returning the data received from the API after
 * attempting to remove a bookmarked session for a specific user.
 */
export const removeBookmarkedSession = async (userId, sessionId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark/${sessionId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to remove bookmark");
  return data;
};

/**
 * The function `getBookmarkedSessions` fetches and returns bookmarked sessions for a specific user.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
 * retrieve bookmarked sessions.
 * @returns The function `getBookmarkedSessions` returns the sessions that are bookmarked by the user
 * with the specified `userId`.
 */
export const getBookmarkedSessions = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmarks`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to get bookmarks");
  return data.sessions;
};

/**
 * The `bookmarkEvent` function sends a POST request to bookmark an event for a specific user and
 * returns the response data.
 * @param userId - The `userId` parameter represents the unique identifier of the user who is
 * bookmarking the event.
 * @param eventId - The `eventId` parameter in the `bookmarkEvent` function represents the unique
 * identifier of the event that the user wants to bookmark. This identifier is used to specify which
 * event the user is bookmarking within the system.
 * @returns The `bookmarkEvent` function returns the data received from the API after bookmarking the
 * event.
 */
export const bookmarkEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark-event/${eventId}`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to bookmark event");
  return data;
};

/**
 * The function `removeBookmarkedEvent` asynchronously removes a bookmarked event for a specific user
 * by sending a DELETE request to the API endpoint.
 * @param userId - The `userId` parameter is the unique identifier of the user who wants to remove a
 * bookmarked event.
 * @param eventId - The `eventId` parameter in the `removeBookmarkedEvent` function represents the
 * unique identifier of the event that the user wants to remove from their bookmarks. This identifier
 * is used to specify the particular event that should be removed from the user's bookmarked events
 * list.
 * @returns The function `removeBookmarkedEvent` is returning the data received from the API after
 * attempting to remove the bookmarked event.
 */
export const removeBookmarkedEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark-event/${eventId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to remove event bookmark");
  return data;
};

/**
 * This function fetches and returns bookmarked events for a specific user.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
 * retrieve bookmarked events.
 * @returns The function `getBookmarkedEvents` returns the list of bookmarked events for the specified
 * `userId`.
 */
export const getBookmarkedEvents = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmarked-events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to get bookmarked events");
  return data.events;
};

/**
 * The function `getUserId` returns the user ID of the current user if available, otherwise it returns
 * null.
 * @returns The `getUserId` function returns the user ID of the current user if they are logged in,
 * otherwise it returns `null`.
 */
export const getUserId = async () => {
  const currentUser = auth.currentUser;
  return currentUser ? currentUser.uid : null;
};

/**
 * This function fetches multiple users by their IDs from an API endpoint.
 * @param userIds - The `userIds` parameter is an array containing the IDs of the users for whom you
 * want to fetch data.
 * @returns The function `getUsersByIds` returns the data.users array fetched from the API endpoint
 * after sending a POST request with the userIds provided as input.
 */
export const getUsersByIds = async (userIds) => {
  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error("userIds must be a non-empty array");
  }

  const response = await fetch(`${API_URL}/users/multiple-users/by-ids`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIds }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch users by IDs");
  return data.users;
};


/**
 * The function `joinEvent` sends a POST request to a specific API endpoint to allow a user to join an
 * event and returns the response data.
 * @param userId - The `userId` parameter represents the unique identifier of the user who is joining
 * the event.
 * @param eventId - Thank you for providing the code snippet. It seems like you were about to ask for
 * clarification on the `eventId` parameter. If you have a specific question or need assistance with
 * something related to the `eventId` parameter, please feel free to ask!
 * @returns The `joinEvent` function returns the data received from the API after attempting to join
 * the event. If the response is successful (status code 200), it returns the data object. If there is
 * an error (response status is not ok), it throws an error with the message "Failed to join event" or
 * the specific error message received from the API.
 */
export const joinEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/join-event/${eventId}`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to join event");
  return data;
};

/**
 * The `leaveEvent` function sends a DELETE request to the API to remove a user from a specific event
 * and handles the response accordingly.
 * @param userId - The `userId` parameter in the `leaveEvent` function represents the unique identifier
 * of the user who wants to leave the event. This parameter is used to specify which user is leaving
 * the event.
 * @param eventId - The `eventId` parameter in the `leaveEvent` function represents the unique
 * identifier of the event that the user wants to leave. It is used to specify which event the user
 * intends to leave when making the API request to the server.
 * @returns The function `leaveEvent` is returning the data received from the API after leaving the
 * event.
 */
export const leaveEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/leave-event/${eventId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to leave event");
  return data;
};

/**
 * The function `getRegisteredEvents` fetches a user's registered events from a specified API endpoint
 * using the user's ID.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
 * retrieve the registered events.
 * @returns The function `getRegisteredEvents` returns the list of events that the user with the
 * specified `userId` has registered for.
 */
export const getRegisteredEvents = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/registered-events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch registered events");
  return data.events;
};
