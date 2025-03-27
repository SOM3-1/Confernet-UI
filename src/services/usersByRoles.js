import {API_URL} from "./../constants/api"

/**
 * This function fetches users based on their role ID from an API endpoint and returns the user data.
 * @param roleId - The `roleId` parameter is used to specify the role ID for which you want to retrieve
 * users. It should be a number that corresponds to the specific role you are interested in.
 * @returns The function `getUsersByRoleId` returns the list of users with the specified role ID
 * fetched from the API endpoint `/users-by-roleid/role/`.
 */
export const getUsersByRoleId = async (roleId) => {
    if (typeof roleId !== "number") {
      throw new Error("roleId must be a number");
    }
  
    const response = await fetch(`${API_URL}/users-by-roleid/role/${roleId}`);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch users by role");
    }
  
    return data.users;
  };
  

/**
 * The function `loadKeynoteSpeakers` asynchronously loads and logs the keynote speakers by their role
 * ID.
 */
export const loadKeynoteSpeakers = async () => {
  try {
    const keynoteRoleId = 2;
    const speakers = await getUsersByRoleId(keynoteRoleId);
    console.log("Keynote Speakers:", speakers);
  } catch (err) {
    console.error("Error loading keynote speakers:", err.message);
  }
};
