"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useUIStore } from "@/stores/uiStore";

export default function Navbar() {
  const router = useRouter();
  const { itemCount } = useCartStore();
  const { itemCount: getWishlistCount } = useWishlistStore();
  const { openCart } = useUIStore();
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = itemCount();
  const wishlistCount = getWishlistCount();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Left: Brand + Delivery Location */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Vector E-Pic Emblem */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary via-secondary to-tertiary p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-surface-container-lowest rounded-[10px] flex items-center justify-center">
                <span className="font-headline-sm text-sm font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EP
                </span>
              </div>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
              E-Pic<span className="text-secondary">.</span>
            </span>
          </Link>

          <div className="h-4 w-px bg-surface-container-highest hidden md:block" />

          <button
            type="button"
            className="hidden md:flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-secondary">
              near_me
            </span>
            <span className="text-xs font-medium tracking-wide">
              Dhaka, Dhanmondi
            </span>
            <span className="material-symbols-outlined text-xs">
              keyboard_arrow_down
            </span>
          </button>
        </div>

        {/* Center: Search with Quick Tags */}
        <div className="flex-1 max-w-xl hidden lg:block">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full h-10 rounded-full bg-surface-container-low px-4 focus-within:ring-1 focus-within:ring-primary/50 transition-all shadow-inner"
          >
            <button
              type="submit"
              className="text-on-surface-variant hover:text-primary transition-colors mr-2 flex items-center justify-center"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-base">
                search
              </span>
            </button>
            <input
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none font-body-sm"
              placeholder="Search verified Dhaka stock or ask Gemini AI..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href="/search?q=Jamdani"
                className="text-[11px] text-on-surface-variant/70 hover:text-on-surface bg-surface-container hover:bg-surface-container-high px-2.5 py-0.5 rounded-full transition-colors"
              >
                Jamdani
              </Link>
              <Link
                href="/search?q=Audio"
                className="text-[11px] text-on-surface-variant/70 hover:text-on-surface bg-surface-container hover:bg-surface-container-high px-2.5 py-0.5 rounded-full transition-colors"
              >
                ANC Audio
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Gemini AI + Navigation + Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/search?ai=true"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-primary text-xs font-semibold transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-tertiary">
              auto_awesome
            </span>
            <span>Gemini AI</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-5 text-xs text-on-surface-variant font-medium">
            <Link
              className="hover:text-on-surface transition-colors"
              href="/products"
            >
              All Products
            </Link>
            <Link
              className="hover:text-on-surface transition-colors"
              href="/#boutiques"
            >
              Boutiques
            </Link>
            <Link
              className="hover:text-on-surface transition-colors"
              href="/checkout"
            >
              Escrow Vault
            </Link>
            <Link
              className="hover:text-on-surface transition-colors"
              href="/tracking"
            >
              Fleet Tracking
            </Link>
          </nav>

          <div className="flex items-center gap-2 pl-2">
            <Link
              href="/wishlist"
              className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-low flex items-center justify-center"
              title="Wishlist"
            >
              <span className="material-symbols-outlined text-lg">
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-4.5 w-4.5 px-1 rounded-full bg-primary text-on-primary font-label-sm text-[10px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-low"
              title="Cart"
              id="navbar-cart-btn"
            >
              <span className="material-symbols-outlined text-lg">
                shopping_bag
              </span>
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-4.5 w-4.5 px-1 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
              )}
            </button>
            <div className="pl-1">
              <Link
                href="/account"
                className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-primary text-xs font-bold ring-1 ring-primary/30 hover:ring-primary transition-all"
                title="My Account & Orders"
              >
                RH
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
