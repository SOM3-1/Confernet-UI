import {API_URL} from "./../constants/api"

const oldSampleEvent = {
    name: "TechConf 2025",
    description: "An event for tech enthusiasts",
    startDate: "2025-06-01",
    endDate: "2025-06-03",
    timezone: "America/New_York",
    venue: "Tech Expo Hall",
    address: "123 Main St",
    city: "San Francisco",
    country: "USA",
    venueMapUrl: "https://example.com/venue-map.png",
    organizerId: "user123",
    organizerName: "Jane Doe",
    contactEmail: "organizer@example.com",
    contactPhone: "+1-555-123-4567",
    keynoteSpeakers: ["user456", "user789"],
    sessions: [], 
    registrationRequired: true,
    registrationFee: 99,
    currency: "USD",
    paymentMethods: "Credit Card, PayPal, Stripe",
    maxAttendees: 300
  };

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
