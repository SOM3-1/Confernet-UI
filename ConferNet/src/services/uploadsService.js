import { API_URL } from "./../constants/api";

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
