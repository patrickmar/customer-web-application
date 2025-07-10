"use client";

// Helper functions for proper Base64 encoding/decoding
const utf8ToBase64 = (str: string): string => {
  return typeof window !== "undefined"
    ? window.btoa(unescape(encodeURIComponent(str)))
    : Buffer.from(str, "utf8").toString("base64");
};

const base64ToUtf8 = (str: string): string => {
  return typeof window !== "undefined"
    ? decodeURIComponent(escape(window.atob(str)))
    : Buffer.from(str, "base64").toString("utf8");
};

export const store = (storageKey: string, value: any): void => {
  if (typeof window === "undefined") return;

  try {
    const json = JSON.stringify(value);
    const encoded = utf8ToBase64(json);
    window.localStorage.setItem(storageKey, encoded);
  } catch (error) {
    console.error("Failed to encode and store localStorage item:", error);
  }
};
export const removeItem = (storageKey: string): void => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(storageKey);
  }
};

export const get = (storageKey: string): any | null => {
  if (typeof window === "undefined") return null;

  const encoded = window.localStorage.getItem(storageKey);
  if (!encoded) return null;

  try {
    const decoded = base64ToUtf8(encoded);
    if (!decoded.trim().match(/^(\{[^]*\}|\[[^]*\])$/)) {
      throw new Error("Decoded string is not valid JSON");
    }
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode localStorage item:", error);
    window.localStorage.removeItem(storageKey);
    return null;
  }
};
