import { create } from "zustand";

export const useBackgroundStore = create((set) => ({
  theme: localStorage.getItem("chat-Message") || null,
  setBackground: (newTheme) => {
    localStorage.setItem("chat-Message", newTheme);
    set({ theme: newTheme });  // FIX: should set "theme", not "bg"
  },
}));
