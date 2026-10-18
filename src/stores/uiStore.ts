import { create } from "zustand";

interface UIStore {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  isAuthOpen: boolean;
  authMode: "login" | "register" | "otp" | "forgot";
  authEmail: string;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  openAuth: (mode?: "login" | "register", email?: string) => void;
  closeAuth: () => void;
  setAuthMode: (mode: "login" | "register" | "otp" | "forgot") => void;
  setAuthEmail: (email: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileNavOpen: false,
  isAuthOpen: false,
  authMode: "login",
  authEmail: "",

  toggleCart: () =>
    set((s) => ({ isCartOpen: !s.isCartOpen, isMobileNavOpen: false })),
  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),

  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),

  toggleMobileNav: () =>
    set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen, isCartOpen: false })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  openAuth: (mode = "login", email = "") =>
    set({ isAuthOpen: true, authMode: mode, authEmail: email, isMobileNavOpen: false }),
  closeAuth: () => set({ isAuthOpen: false }),
  setAuthMode: (mode) => set({ authMode: mode }),
  setAuthEmail: (email) => set({ authEmail: email }),
}));
