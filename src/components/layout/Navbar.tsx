"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Package,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/cart/CartDrawer";

const categories = [
  { name: "Fashion", href: "/categories/fashion", emoji: "👗" },
  { name: "Electronics", href: "/categories/electronics", emoji: "📱" },
  { name: "Beauty", href: "/categories/beauty", emoji: "💄" },
  { name: "Home & Living", href: "/categories/home-living", emoji: "🏠" },
  { name: "Lifestyle", href: "/categories/lifestyle", emoji: "✨" },
  { name: "Food", href: "/categories/food", emoji: "🍕" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const itemCount = useCartStore((s) => s.itemCount);
  const { isCartOpen, toggleCart, isMobileNavOpen, toggleMobileNav, closeMobileNav } =
    useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        )}
      >
        {/* Top Bar */}
        <div className="hidden md:block border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-xs text-text-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-accent" />
                Free marketplace — no seller fees
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/account" className="hover:text-text-secondary transition-colors">
                My Account
              </Link>
              <span className="text-white/10">|</span>
              <Link href="/account/orders" className="hover:text-text-secondary transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              onClick={closeMobileNav}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-text-primary leading-none">
                  E-Pic
                </h1>
                <span className="text-[10px] text-text-muted font-medium tracking-widest uppercase">
                  Marketplace
                </span>
              </div>
            </Link>

            {/* Search — Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div
                className={cn(
                  "relative w-full transition-all duration-300",
                  searchFocused && "scale-[1.02]"
                )}
              >
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search products, shops, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={cn(
                    "w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-300",
                    searchFocused
                      ? "border-primary/50 bg-white/8 shadow-[0_0_20px_rgba(108,71,255,0.1)]"
                      : "border-white/8 hover:border-white/15"
                  )}
                  id="search-input"
                />
              </div>
            </div>

            {/* Nav Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Categories — Desktop */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  onBlur={() => setTimeout(() => setShowCategories(false), 200)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
                  id="categories-btn"
                >
                  Categories
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform",
                      showCategories && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {showCategories && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                        >
                          <span className="text-base">{cat.emoji}</span>
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                id="wishlist-btn"
              >
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                id="cart-btn"
              >
                <ShoppingCart size={20} />
                {itemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-2 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount()}
                  </motion.span>
                )}
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                id="account-btn"
              >
                <User size={20} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileNav}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                id="mobile-menu-btn"
              >
                {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-bg-primary/95 backdrop-blur-xl border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Search */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-sm text-text-primary placeholder:text-text-muted outline-none"
                    id="mobile-search-input"
                  />
                </div>

                {/* Mobile Categories */}
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={closeMobileNav}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-[11px] text-text-secondary">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Links */}
                <div className="border-t border-white/5 pt-3 space-y-1">
                  {[
                    { href: "/account", icon: User, label: "My Account" },
                    { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
                    { href: "/account/orders", icon: Package, label: "My Orders" },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMobileNav}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
