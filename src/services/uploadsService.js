import { API_URL } from "./../constants/api";

/**
 * The function `uploadSpeakerFile` uploads a file for a specific event and user using FormData and
 * fetch in JavaScript.
 * @param eventId - The `eventId` parameter represents the unique identifier of the event where the
 * speaker file is being uploaded.
 * @param userId - The `userId` parameter in the `uploadSpeakerFile` function represents the unique
 * identifier of the user who is uploading the file. This identifier is used to associate the uploaded
 * file with the specific user within the system.
 * @param file - The `file` parameter in the `uploadSpeakerFile` function represents the file that you
 * want to upload. It should be a file object that you want to send to the server for processing or
 * storage. This file object could be obtained from an input element in a form or from any other source
 * where
 * @returns The function `uploadSpeakerFile` returns the data received from the API after uploading the
 * file.
 */
export const uploadSpeakerFile = async (eventId, userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/uploads/upload/${eventId}/${userId}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "File upload failed");
  return data;
};

/**
 * The function `deleteSpeakerFile` sends a DELETE request to delete a file associated with a specific
 * event and user.
 * @param eventId - The `eventId` parameter represents the unique identifier of the event where the
 * file is uploaded.
 * @param userId - The `userId` parameter in the `deleteSpeakerFile` function represents the unique
 * identifier of the user whose file is being deleted.
 * @param fileUrl - The `fileUrl` parameter in the `deleteSpeakerFile` function represents the URL of
 * the file that you want to delete. This URL is used to identify the specific file that needs to be
 * removed from the server.
 * @returns The function `deleteSpeakerFile` is returning the data received from the API after
 * attempting to delete a file.
 */
export const deleteSpeakerFile = async (eventId, userId, fileUrl) => {
  const response = await fetch(`${API_URL}/uploads/delete/${eventId}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileUrl }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "File delete failed");
  return data;
};

/**
 * The function `getUploadedFiles` fetches uploaded files for a specific event ID and groups them by
 * the user who uploaded them.
 * @param eventId - The `eventId` parameter in the `getUploadedFiles` function is used to specify the
 * event ID for which you want to retrieve the uploaded files. This function fetches the uploaded files
 * associated with the provided event ID from a specific API endpoint.
 * @returns An object where the keys are the names of users who uploaded files and the values are
 * arrays of files uploaded by each user.
 */
export const getUploadedFiles = async (eventId) => {
  const response = await fetch(`${API_URL}/uploads/files/${eventId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch files");

  const grouped = {};
  for (const file of data.files) {
    if (!grouped[file.uploadedBy]) grouped[file.uploadedBy] = [];
    grouped[file.uploadedBy].push(file);
  }

  return grouped;
};
