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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
            : "bg-white/70 backdrop-blur-md border-b border-slate-200/50"
        )}
      >
        {/* Top Bar */}
        <div className="hidden md:block border-b border-slate-200/60 bg-slate-50/80">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Sparkles size={13} className="text-primary" />
                Free marketplace — no seller listing fees
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/account" className="hover:text-primary transition-colors font-medium">
                My Account
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/account/orders" className="hover:text-primary transition-colors font-medium">
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
              className="flex items-center gap-2.5 shrink-0"
              onClick={closeMobileNav}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-md shadow-primary/20">
                <span className="text-white font-black text-base">E</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-black text-slate-900 leading-none tracking-tight">
                  E-Pic
                </h1>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase block mt-0.5">
                  Marketplace
                </span>
              </div>
            </Link>

            {/* Search — Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div
                className={cn(
                  "relative w-full transition-all duration-300",
                  searchFocused && "scale-[1.01]"
                )}
              >
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search products, shops, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={cn(
                    "w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-100/80 border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300",
                    searchFocused
                      ? "border-primary bg-white shadow-md shadow-primary/10"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-100"
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
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-colors rounded-xl hover:bg-slate-100"
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
                      className="absolute top-full right-0 mt-2 w-52 bg-white backdrop-blur-xl border border-slate-200 rounded-2xl overflow-hidden shadow-xl"
                    >
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-50 transition-all"
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
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 transition-all"
                id="wishlist-btn"
              >
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 transition-all"
                id="cart-btn"
              >
                <ShoppingCart size={20} />
                {itemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent-2 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md shadow-accent-2/30"
                  >
                    {itemCount()}
                  </motion.span>
                )}
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 transition-all"
                id="account-btn"
              >
                <User size={20} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileNav}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-700 hover:bg-slate-100 transition-all"
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
              className="md:hidden overflow-hidden bg-white border-t border-slate-200"
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Search */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
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
                      className="flex flex-col items-center gap-1 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-colors"
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-[11px] font-semibold text-slate-700">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Links */}
                <div className="border-t border-slate-200 pt-3 space-y-1">
                  {[
                    { href: "/account", icon: User, label: "My Account" },
                    { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
                    { href: "/account/orders", icon: Package, label: "My Orders" },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMobileNav}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-primary hover:bg-slate-100 transition-all"
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
