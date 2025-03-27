import {API_URL} from "./../constants/api"

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to create event");
  return data;
};

export const getAllEvents = async () => {
  const response = await fetch(`${API_URL}/events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch events");
  return data.events;
};

export const getUpcomingEvents = async () => {
  const response = await fetch(`${API_URL}/events/upcoming`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch upcoming events");
  return data.events;
};

export const getEventById = async (eventId) => {
  const response = await fetch(`${API_URL}/events/singleEvent/${eventId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Event not found");
  return data;
};

export const updateEvent = async (eventId, updates) => {
  const response = await fetch(`${API_URL}/events/singleEvent/${eventId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to update event");
  return data;
};

export const deleteEvent = async (eventId) => {
  const response = await fetch(`${API_URL}/events/singleEvent/${eventId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to delete event");
  return data;
};

export const getEventAttendees = async (eventId) => {
  const response = await fetch(`${API_URL}/events/events/${eventId}/attendees`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch attendees");
  return data.userIds;
};

export const postComment = async (eventId, userId, comment) => {
  const response = await fetch(`${API_URL}/events/${eventId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, comment }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to post comment");
  return data;
};

export const getComments = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}/comments`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch comments");
  return data.comments;
};

export const postRating = async (eventId, userId, rating) => {
  const response = await fetch(`${API_URL}/events/${eventId}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, rating }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to submit rating");
  return data;
};

export const getRatingSummary = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}/ratings`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch ratings");
  return data; 
};
