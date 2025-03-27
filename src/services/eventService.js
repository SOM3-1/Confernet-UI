import {API_URL} from "./../constants/api"

/**
 * The `createEvent` function sends a POST request to a specified API endpoint to create a new event
 * with the provided data.
 * @param eventData - The `eventData` parameter in the `createEvent` function represents the data that
 * will be sent to the server when creating a new event. This data should be in JSON format and include
 * information such as the event title, description, date, location, and any other relevant details
 * needed to create the
 * @returns The `createEvent` function returns the data received from the API after creating an event.
 * If the response is successful (status code 200), it returns the data object. If there is an error
 * during the creation process, it throws an error with the message "Failed to create event" or the
 * specific error message received from the API.
 */
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

/**
 * The function `getAllEvents` fetches all events from a specified API URL and returns the event data.
 * @returns The function `getAllEvents` is returning the list of events fetched from the API.
 */
export const getAllEvents = async () => {
  const response = await fetch(`${API_URL}/events`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch events");
  return data.events;
};

/**
 * The function `getUpcomingEvents` fetches upcoming events data from a specified API URL and returns
 * the events if successful, throwing an error if the request fails.
 * @returns The function `getUpcomingEvents` returns the list of upcoming events fetched from the API
 * endpoint `/events/upcoming`. If the fetch operation is successful, it returns the list of
 * events. If there is an error during the fetch operation, it throws an error with the message "Failed
 * to fetch upcoming events" or the specific error message received from the API response.
 */
export const getUpcomingEvents = async () => {
  const response = await fetch(`${API_URL}/events/upcoming`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch upcoming events");
  return data.events;
};

/**
 * This function fetches a single event by its ID from an API endpoint and returns the event data.
 * @param eventId - The `eventId` parameter is the unique identifier of the event that you want to
 * retrieve from the API. It is used to fetch the specific event details from the API endpoint
 * `/events/singleEvent/` by making a GET request with the eventId as part of the URL path.
 * @returns The function `getEventById` is returning the data fetched from the API endpoint for the
 * event with the specified `eventId`. If the response is successful (status code 200), it returns the
 * data for the event. If the response is not successful, it throws an error with the message "Event
 * not found" or the error message received from the API response.
 */
export const getEventById = async (eventId) => {
  const response = await fetch(`${API_URL}/events/singleEvent/${eventId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Event not found");
  return data;
};

/**
 * The function `updateEvent` sends a PUT request to update an event with the specified eventId using
 * the provided updates.
 * @param eventId - The `eventId` parameter in the `updateEvent` function is the unique identifier of
 * the event that you want to update. It is used to specify which event should be updated in the
 * database.
 * @param updates - The `updates` parameter in the `updateEvent` function is an object that contains
 * the new data that you want to update for the event with the specified `eventId`. This object should
 * include the fields that you want to change in the event. When calling the `updateEvent` function,
 * you should
 * @returns The `updateEvent` function returns the data received from the API after updating the event.
 */
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

/**
 * The function `deleteEvent` sends a DELETE request to the specified API endpoint to delete a specific
 * event by its ID.
 * @param eventId - The `eventId` parameter in the `deleteEvent` function is the unique identifier of
 * the event that you want to delete. This identifier is used to specify which event should be deleted
 * from the server when the DELETE request is made to the API endpoint
 * `/events/singleEvent/`.
 * @returns The `deleteEvent` function is returning the data received from the API after deleting the
 * event. If the deletion is successful, it will return the data related to the deleted event. If there
 * is an error during the deletion process, it will throw an error with a message indicating the
 * failure reason.
 */
export const deleteEvent = async (eventId) => {
  const response = await fetch(`${API_URL}/events/singleEvent/${eventId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to delete event");
  return data;
};

/**
 * The function `getEventAttendees` fetches the list of user IDs attending a specific event from an API
 * endpoint.
 * @param eventId - The `eventId` parameter is the unique identifier of the event for which you want to
 * retrieve the list of attendees.
 * @returns The function `getEventAttendees` is returning the user IDs of attendees for a specific
 * event fetched from the API endpoint `/events/events//attendees`.
 */
export const getEventAttendees = async (eventId) => {
  const response = await fetch(`${API_URL}/events/events/${eventId}/attendees`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch attendees");
  return data.userIds;
};

/**
 * The function `postComment` sends a POST request to a specific API endpoint to post a comment for a
 * particular event.
 * @param eventId - The `eventId` parameter represents the unique identifier of the event to which the
 * comment is being posted.
 * @param userId - The `userId` parameter in the `postComment` function represents the ID of the user
 * who is posting the comment.
 * @param comment - The `postComment` function you provided is used to post a comment for a specific
 * event. The parameters for the function are as follows:
 * @returns The `postComment` function returns the data received from the API after posting a comment.
 * If the response is successful, it returns the data object containing information about the posted
 * comment. If there is an error, it throws an error with the message "Failed to post comment" or the
 * specific error message received from the API.
 */
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

/**
 * The function `getComments` fetches comments for a specific event using an API URL and returns the
 * comments data.
 * @param eventId - The `eventId` parameter is used to specify the unique identifier of the event for
 * which you want to retrieve the comments. It is passed to the `getComments` function to fetch the
 * comments associated with that particular event.
 * @returns The function `getComments` is returning the comments data fetched from the API endpoint for
 * a specific event ID.
 */
export const getComments = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}/comments`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch comments");
  return data.comments;
};

/**
 * The function `postRating` sends a POST request to submit a rating for a specific event with the
 * provided user ID and rating.
 * @param eventId - The `eventId` parameter represents the unique identifier of the event for which the
 * rating is being submitted.
 * @param userId - The `userId` parameter in the `postRating` function represents the unique identifier
 * of the user who is submitting the rating for a specific event.
 * @param rating - The `rating` parameter in the `postRating` function represents the numerical value
 * assigned by a user to rate an event. It typically ranges from 1 to 5, with 1 being the lowest rating
 * and 5 being the highest. This parameter is used to provide feedback on the event's
 * @returns The function `postRating` returns the data received from the API after submitting the
 * rating. If the response is not successful (status code is not ok), it throws an error with the error
 * message from the API response or a default message "Failed to submit rating".
 */
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

/**
 * This function fetches and returns the rating summary data for a specific event based on the event ID
 * provided.
 * @param eventId - The `eventId` parameter is the unique identifier of the event for which you want to
 * retrieve the rating summary. It is used to make a request to the API endpoint to fetch the ratings
 * associated with that specific event.
 * @returns The function `getRatingSummary` is returning the data fetched from the API endpoint for the
 * ratings of a specific event.
 */
export const getRatingSummary = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}/ratings`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch ratings");
  return data; 
};
