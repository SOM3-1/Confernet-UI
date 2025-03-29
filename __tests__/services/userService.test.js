import {
    getAllUsers,
    getUserById,
    getNewUserById,
    bookmarkSession,
    removeBookmarkedSession,
    getBookmarkedSessions,
    bookmarkEvent,
    removeBookmarkedEvent,
    getBookmarkedEvents,
    getUserId,
    getUsersByIds,
    joinEvent,
    leaveEvent,
    getRegisteredEvents,
  } from "./../../src/services/userService";
  
  vi.mock("../../../src/firebase/firebaseConfig", () => ({
    auth: {
      currentUser: { uid: "mock-user-id" },
    },
  }));
  
  global.fetch = vi.fn();
  
  beforeEach(() => {
    fetch.mockReset();
  });
  
  describe("User Services", () => {
    it("getAllUsers - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ users: ["user1", "user2"] }),
      });
      const result = await getAllUsers();
      expect(result).toEqual({ users: ["user1", "user2"] });
    });
  
    it("getUserById - success", async () => {
        const mockUser = { uid: "abc123" };
        const { auth } = await import("./../../src/firebase/firebaseConfig");
        auth.currentUser = mockUser;
      
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ name: "Test User" }),
        });
      
        const result = await getUserById();
        expect(result).toEqual({ name: "Test User" });
      });
      
  
    it("getNewUserById - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ name: "Another User" }),
      });
      const result = await getNewUserById("123");
      expect(result).toEqual({ name: "Another User" });
    });
  
    it("bookmarkSession - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookmarked: true }),
      });
      const result = await bookmarkSession("123", "456");
      expect(result).toEqual({ bookmarked: true });
    });
  
    it("removeBookmarkedSession - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ removed: true }),
      });
      const result = await removeBookmarkedSession("123", "456");
      expect(result).toEqual({ removed: true });
    });
  
    it("getBookmarkedSessions - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sessions: ["session1"] }),
      });
      const result = await getBookmarkedSessions("123");
      expect(result).toEqual(["session1"]);
    });
  
    it("bookmarkEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookmarked: true }),
      });
      const result = await bookmarkEvent("123", "789");
      expect(result).toEqual({ bookmarked: true });
    });
  
    it("removeBookmarkedEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ removed: true }),
      });
      const result = await removeBookmarkedEvent("123", "789");
      expect(result).toEqual({ removed: true });
    });
  
    it("getBookmarkedEvents - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: ["event1", "event2"] }),
      });
      const result = await getBookmarkedEvents("123");
      expect(result).toEqual(["event1", "event2"]);
    });
  
    it("getUserId - should return mock UID", async () => {
      const uid = await getUserId();
      expect(uid).toBe("abc123");
    });
  
    it("getUsersByIds - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ users: ["u1", "u2"] }),
      });
      const result = await getUsersByIds(["u1", "u2"]);
      expect(result).toEqual(["u1", "u2"]);
    });
  
    it("joinEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ joined: true }),
      });
      const result = await joinEvent("123", "event123");
      expect(result).toEqual({ joined: true });
    });
  
    it("leaveEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ left: true }),
      });
      const result = await leaveEvent("123", "event123");
      expect(result).toEqual({ left: true });
    });
  
    it("getRegisteredEvents - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: ["e1", "e2"] }),
      });
      const result = await getRegisteredEvents("123");
      expect(result).toEqual(["e1", "e2"]);
    });
  });
  