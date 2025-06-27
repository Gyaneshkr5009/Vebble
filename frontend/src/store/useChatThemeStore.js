import { create } from "zustand";

export const useChatThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-bg") || null,
  setBackground: (newTheme) => {
    localStorage.setItem("chat-bg", newTheme);
    set({ theme: newTheme });  // FIX: should set "theme", not "bg"
  },
}));
