import { create } from "zustand";

interface UIStore {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileNavOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileNavOpen: false,

  toggleCart: () =>
    set((s) => ({ isCartOpen: !s.isCartOpen, isMobileNavOpen: false })),
  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),

  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),

  toggleMobileNav: () =>
    set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen, isCartOpen: false })),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
}));
