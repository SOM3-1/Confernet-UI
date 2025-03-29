import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUsersByRoleId, loadKeynoteSpeakers } from "../../src/services/usersByRoles"

global.fetch = vi.fn();

beforeEach(() => {
  fetch.mockReset();
});

describe("User Service", () => {
  it("getUsersByRoleId - returns users for valid roleId", async () => {
    const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: mockUsers }),
    });

    const result = await getUsersByRoleId(2);
    expect(result).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/users-by-roleid/role/2"));
  });

  it("getUsersByRoleId - throws error for non-number roleId", async () => {
    await expect(getUsersByRoleId("invalid")).rejects.toThrow("roleId must be a number");
  });

  it("getUsersByRoleId - handles fetch failure", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Unauthorized access" }),
    });

    await expect(getUsersByRoleId(2)).rejects.toThrow("Unauthorized access");
  });

  it("loadKeynoteSpeakers - logs speakers on success", async () => {
    const mockSpeakers = [{ id: 101, name: "Dr. Keynote" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ users: mockSpeakers }),
    });

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await loadKeynoteSpeakers();
    expect(consoleSpy).toHaveBeenCalledWith("Keynote Speakers:", mockSpeakers);
    consoleSpy.mockRestore();
  });

  it("loadKeynoteSpeakers - handles errors and logs message", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to load speakers" }),
    });

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await loadKeynoteSpeakers();
    expect(errorSpy).toHaveBeenCalledWith("Error loading keynote speakers:", "Failed to load speakers");
    errorSpy.mockRestore();
  });
});
