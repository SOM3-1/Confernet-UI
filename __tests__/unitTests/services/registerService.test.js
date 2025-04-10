import { registerUser } from "../../../src/services/registerService";
import { vi, describe, it, expect, beforeEach } from "vitest";

global.fetch = vi.fn();

beforeEach(() => {
  fetch.mockReset();
});

describe("registerUser", () => {
  const mockUser = {
    userId: "user123",
    name: "John Doe",
    email: "john@example.com",
    dob: "1990-01-01",
    role: 2,
    phoneNumber: "1234567890",
    organization: "TechCorp",
    jobTitle: "Developer",
    country: "USA",
    city: "New York",
    bio: "Software engineer with 5 years of experience.",
    profilePicture: "http://example.com/john.jpg",
  };

  it("test-id: 55,successfully registers user", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, id: "user123" }),
    });

    const data = await registerUser(
      mockUser.userId,
      mockUser.name,
      mockUser.email,
      mockUser.dob,
      mockUser.role,
      mockUser.phoneNumber,
      mockUser.organization,
      mockUser.jobTitle,
      mockUser.country,
      mockUser.city,
      mockUser.bio,
      mockUser.profilePicture
    );

    expect(data).toEqual({ success: true, id: "user123" });
  });

  it("test-id: 56,throws error if registration fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Email already exists" }),
    });

    await expect(
      registerUser(
        mockUser.userId,
        mockUser.name,
        mockUser.email,
        mockUser.dob,
        mockUser.role,
        mockUser.phoneNumber,
        mockUser.organization,
        mockUser.jobTitle,
        mockUser.country,
        mockUser.city,
        mockUser.bio,
        mockUser.profilePicture
      )
    ).rejects.toThrow("Email already exists");
  });
});
