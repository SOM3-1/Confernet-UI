import {
    uploadSpeakerFile,
    deleteSpeakerFile,
    getUploadedFiles,
  } from "../../src/services/uploadsService"
  
  import { vi, describe, it, expect, beforeEach } from "vitest";
  
  global.fetch = vi.fn();
  
  beforeEach(() => {
    fetch.mockReset();
  });
  
  describe("Speaker File APIs", () => {
    const mockEventId = "event123";
    const mockUserId = "speaker1";
  
    it("uploadSpeakerFile - success", async () => {
      const file = new File(["dummy"], "test.pdf", { type: "application/pdf" });
  
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, fileName: "test.pdf" }),
      });
  
      const result = await uploadSpeakerFile(mockEventId, mockUserId, file);
      expect(result).toEqual({ success: true, fileName: "test.pdf" });
    });
  
    it("uploadSpeakerFile - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Invalid file" }),
      });
  
      const file = new File(["broken"], "fail.pdf", { type: "application/pdf" });
  
      await expect(uploadSpeakerFile(mockEventId, mockUserId, file)).rejects.toThrow("Invalid file");
    });
  
    it("deleteSpeakerFile - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ deleted: true }),
      });
  
      const result = await deleteSpeakerFile(mockEventId, mockUserId, "https://blob.com/test.pdf");
      expect(result).toEqual({ deleted: true });
    });
  
    it("deleteSpeakerFile - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "File not found" }),
      });
  
      await expect(deleteSpeakerFile(mockEventId, mockUserId, "invalid.pdf")).rejects.toThrow("File not found");
    });
  
    it("getUploadedFiles - success", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          files: [
            { name: "file1.ppt", uploadedBy: "Alice" },
            { name: "file2.doc", uploadedBy: "Alice" },
            { name: "file3.pdf", uploadedBy: "Bob" },
          ],
        }),
      });
  
      const result = await getUploadedFiles(mockEventId);
      expect(result).toEqual({
        Alice: [
          { name: "file1.ppt", uploadedBy: "Alice" },
          { name: "file2.doc", uploadedBy: "Alice" },
        ],
        Bob: [{ name: "file3.pdf", uploadedBy: "Bob" }],
      });
    });
  
    it("getUploadedFiles - failure", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "No files found" }),
      });
  
      await expect(getUploadedFiles(mockEventId)).rejects.toThrow("No files found");
    });
  });
  