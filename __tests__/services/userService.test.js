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
    it("test-id: 67,getAllUsers - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ users: ["user1", "user2"] }),
      });
      const result = await getAllUsers();
      expect(result).toEqual({ users: ["user1", "user2"] });
    });
  
    it("test-id: 68, getUserById - success", async () => {
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
      
  
    it("test-id: 69,getNewUserById - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ name: "Another User" }),
      });
      const result = await getNewUserById("123");
      expect(result).toEqual({ name: "Another User" });
    });
  
    it("test-id: 70,bookmarkSession - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookmarked: true }),
      });
      const result = await bookmarkSession("123", "456");
      expect(result).toEqual({ bookmarked: true });
    });
  
    it("test-id: 71,removeBookmarkedSession - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ removed: true }),
      });
      const result = await removeBookmarkedSession("123", "456");
      expect(result).toEqual({ removed: true });
    });
  
    it("test-id: 72,getBookmarkedSessions - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sessions: ["session1"] }),
      });
      const result = await getBookmarkedSessions("123");
      expect(result).toEqual(["session1"]);
    });
  
    it("test-id: 73,bookmarkEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ bookmarked: true }),
      });
      const result = await bookmarkEvent("123", "789");
      expect(result).toEqual({ bookmarked: true });
    });
  
    it("test-id: 74,removeBookmarkedEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ removed: true }),
      });
      const result = await removeBookmarkedEvent("123", "789");
      expect(result).toEqual({ removed: true });
    });
  
    it("test-id: 75,getBookmarkedEvents - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: ["event1", "event2"] }),
      });
      const result = await getBookmarkedEvents("123");
      expect(result).toEqual(["event1", "event2"]);
    });
  
    it("test-id: 76,getUserId - should return mock UID", async () => {
      const uid = await getUserId();
      expect(uid).toBe("abc123");
    });
  
    it("test-id: 77,getUsersByIds - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ users: ["u1", "u2"] }),
      });
      const result = await getUsersByIds(["u1", "u2"]);
      expect(result).toEqual(["u1", "u2"]);
    });
  
    it("test-id: 78,joinEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ joined: true }),
      });
      const result = await joinEvent("123", "event123");
      expect(result).toEqual({ joined: true });
    });
  
    it("test-id: 79,leaveEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ left: true }),
      });
      const result = await leaveEvent("123", "event123");
      expect(result).toEqual({ left: true });
    });
  
    it("test-id: 80,getRegisteredEvents - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: ["e1", "e2"] }),
      });
      const result = await getRegisteredEvents("123");
      expect(result).toEqual(["e1", "e2"]);
    });
  });
  