import {
    createEvent,
    getAllEvents,
    getUpcomingEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getEventAttendees,
    postComment,
    getComments,
    postRating,
    getRatingSummary,
  } from "../../src/services/eventService";
  
  import { vi, describe, it, expect, beforeEach } from "vitest";
  
  global.fetch = vi.fn();
  
  beforeEach(() => {
    fetch.mockReset();
  });
  
  describe("Event API functions", () => {
    it("test-id: 37,createEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "1", name: "Test Event" }),
      });
  
      const data = await createEvent({ name: "Test Event" });
      expect(data).toEqual({ id: "1", name: "Test Event" });
    });
  
    it("test-id: 38,createEvent - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Invalid data" }),
      });
  
      await expect(createEvent({})).rejects.toThrow("Invalid data");
    });
  
    it("test-id: 39,getAllEvents - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: ["event1", "event2"] }),
      });
  
      const data = await getAllEvents();
      expect(data).toEqual(["event1", "event2"]);
    });
  
    it("test-id: 40,getUpcomingEvents - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ events: ["upcoming1"] }),
      });
  
      const data = await getUpcomingEvents();
      expect(data).toEqual(["upcoming1"]);
    });
  
    it("test-id: 41,getEventById - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "123", name: "Event 123" }),
      });
  
      const data = await getEventById("123");
      expect(data).toEqual({ id: "123", name: "Event 123" });
    });
  
    it("test-id: 42,updateEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ updated: true }),
      });
  
      const data = await updateEvent("123", { name: "Updated Event" });
      expect(data).toEqual({ updated: true });
    });
  
    it("test-id: 43,deleteEvent - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ deleted: true }),
      });
  
      const data = await deleteEvent("123");
      expect(data).toEqual({ deleted: true });
    });
  
    it("test-id: 44,getEventAttendees - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ userIds: ["user1", "user2"] }),
      });
  
      const data = await getEventAttendees("123");
      expect(data).toEqual(["user1", "user2"]);
    });
  
    it("test-id: 45,postComment - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });
  
      const data = await postComment("123", "user1", "Nice event");
      expect(data).toEqual({ success: true });
    });
  
    it("test-id: 46,getComments - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ comments: ["Great!", "Loved it!"] }),
      });
  
      const data = await getComments("123");
      expect(data).toEqual(["Great!", "Loved it!"]);
    });
  
    it("test-id: 47,postRating - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "Rating submitted" }),
      });
  
      const data = await postRating("123", "user1", 5);
      expect(data).toEqual({ message: "Rating submitted" });
    });
  
    it("test-id: 48,getRatingSummary - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ avg: 4.5 }),
      });
  
      const data = await getRatingSummary("123");
      expect(data).toEqual({ avg: 4.5 });
    });
  });
  