import {API_URL} from "./../constants/api"

export const registerUser = async (
  userId,
  name,
  email,
  dob,
  role = 3,
  phoneNumber,
  organization,
  jobTitle,
  country,
  city,
  bio,
  profilePicture
) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        name,
        email,
        dob,
        role,
        phoneNumber,
        organization,
        jobTitle,
        country,
        city,
        bio,
        profilePicture,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("API Error:", errorMessage);
    throw error;
  }
};
