import {
    sendMessage,
    getConversations,
    getChatHistory,
  } from "../../src/services/messageService";
  
  import { vi, describe, it, expect, beforeEach } from "vitest";
  
  global.fetch = vi.fn();
  
  beforeEach(() => {
    fetch.mockReset();
  });
  
  describe("Messaging API functions", () => {
    it("test-id: 49,sendMessage - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, id: "msg123" }),
      });
  
      const data = await sendMessage("user1", "user2", "Hello!");
      expect(data).toEqual({ success: true, id: "msg123" });
    });
  
    it("test-id: 50,sendMessage - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "User not found" }),
      });
  
      await expect(sendMessage("user1", "userX", "Hi")).rejects.toThrow("User not found");
    });
  
    it("test-id: 51,getConversations - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ conversations: ["conv1", "conv2"] }),
      });
  
      const data = await getConversations("user1");
      expect(data).toEqual({ conversations: ["conv1", "conv2"] });
    });
  
    it("test-id: 52,getConversations - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "No conversations found" }),
      });
  
      await expect(getConversations("userX")).rejects.toThrow("No conversations found");
    });
  
    it("test-id: 53,getChatHistory - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ history: ["msg1", "msg2"] }),
      });
  
      const data = await getChatHistory("user1", "user2");
      expect(data).toEqual({ history: ["msg1", "msg2"] });
    });
  
    it("test-id: 54,getChatHistory - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Chat not found" }),
      });
  
      await expect(getChatHistory("user1", "userX")).rejects.toThrow("Chat not found");
    });
  });
  