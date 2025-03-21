import {API_URL} from "./../constants/api"

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
  

export const loadKeynoteSpeakers = async () => {
  try {
    const keynoteRoleId = 2;
    const speakers = await getUsersByRoleId(keynoteRoleId);
    console.log("Keynote Speakers:", speakers);
  } catch (err) {
    console.error("Error loading keynote speakers:", err.message);
  }
};
