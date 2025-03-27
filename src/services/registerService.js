import {API_URL} from "./../constants/api"

/**
 * The `registerUser` function sends a POST request to a specified API endpoint to register a user with
 * provided information and handles any errors that may occur.
 * @param userId - The `userId` parameter in the `registerUser` function represents the unique
 * identifier for the user being registered. It is typically a string or a number that uniquely
 * identifies the user within the system.
 * @param name - The `name` parameter in the `registerUser` function refers to the name of the user
 * being registered. It is a required field for registering a user.
 * @param email - The `registerUser` function you provided is used to register a user with the
 * specified details. The parameters required for registering a user are:
 * @param dob - Date of birth of the user in the format "YYYY-MM-DD".
 * @param [role=3] - The `role` parameter in the `registerUser` function represents the role of the
 * user being registered. It has a default value of 3 if not provided explicitly. The role can be used
 * to define different levels of access or permissions within the system.
 * @param phoneNumber - phoneNumber: The phone number of the user being registered.
 * @param organization - Organization refers to the company, institution, or group that the user is
 * affiliated with. It could be the name of the organization where the user works or is associated
 * with.
 * @param jobTitle - The `jobTitle` parameter in the `registerUser` function refers to the job title or
 * position of the user being registered. It is a string value that represents the specific role or job
 * designation of the user within their organization or professional context.
 * @param country - The `country` parameter in the `registerUser` function refers to the country where
 * the user is located or resides. It is a required field when registering a user and should be
 * provided as a string value representing the user's country of residence.
 * @param city - The `city` parameter in the `registerUser` function refers to the city where the user
 * is located or resides. It is a part of the user's address information that can be provided during
 * user registration.
 * @param bio - The `bio` parameter in the `registerUser` function represents the biography or
 * description of the user being registered. It typically includes information about the user's
 * background, interests, skills, or any other relevant details that provide a brief overview of who
 * the user is. This information is often displayed on user
 * @param profilePicture - The `profilePicture` parameter in the `registerUser` function is used to
 * specify the profile picture of the user being registered. This parameter should contain the URL or
 * path to the image file that represents the user's profile picture. It is sent as part of the data
 * payload in the POST request to
 * @returns The `registerUser` function returns the data received from the API after registering a
 * user. If the registration is successful, it returns the data object. If there is an error during
 * registration, it throws an error with a message indicating the failure reason.
 */
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
