import { auth } from "./../firebase/firebaseConfig";
import {API_URL} from "./../constants/api"

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch users");
  return data;
};

export const getUserById = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "User not found");
  return data;
};

export const bookmarkSession = async (userId, sessionId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark/${sessionId}`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to bookmark session");
  return data;
};

export const removeBookmarkedSession = async (userId, sessionId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark/${sessionId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to remove bookmark");
  return data;
};

export const getBookmarkedSessions = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmarks`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to get bookmarks");
  return data.sessions;
};

export const bookmarkEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark-event/${eventId}`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to bookmark event");
  return data;
};

export const removeBookmarkedEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmark-event/${eventId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to remove event bookmark");
  return data;
};

export const getBookmarkedEvents = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/bookmarked-events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to get bookmarked events");
  return data.events;
};

export const getUserId = async () => {
    const currentUser = auth.currentUser;
    return currentUser ? currentUser.uid : null;
};

export const getUsersByIds = async (userIds) => {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new Error("userIds must be a non-empty array");
    }
  
    const response = await fetch(`${API_URL}/users/by-ids`, {
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
  
export const joinEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/join-event/${eventId}`, {
    method: "POST",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to join event");
  return data;
};

export const leaveEvent = async (userId, eventId) => {
  const response = await fetch(`${API_URL}/users/${userId}/leave-event/${eventId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to leave event");
  return data;
};

export const getRegisteredEvents = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/registered-events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch registered events");
  return data.events;
};
