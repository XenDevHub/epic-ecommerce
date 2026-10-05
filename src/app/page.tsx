"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Star,
  Zap,
  Gift,
  Shield,
  Truck,
  HeadphonesIcon,
  ChevronRight,
  Heart,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";

// ── Mock Data (replace with API calls later) ──
const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Earbuds Pro",
    price: 3499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 234,
    badge: "Best Seller",
    badgeColor: "from-amber-500 to-orange-500",
  },
  {
    id: "2",
    name: "Designer Leather Crossbody Bag",
    price: 2199,
    originalPrice: 3500,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviews: 89,
    badge: "Trending",
    badgeColor: "from-primary to-primary-light",
  },
  {
    id: "3",
    name: "Organic Skincare Gift Set",
    price: 1599,
    originalPrice: 2400,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 156,
    badge: "-33%",
    badgeColor: "from-accent to-emerald-400",
  },
  {
    id: "4",
    name: "Smart Fitness Watch Ultra",
    price: 4299,
    originalPrice: 6500,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 312,
    badge: "Hot Deal",
    badgeColor: "from-accent-2 to-pink-400",
  },
  {
    id: "5",
    name: "Handcrafted Traditional Fashion Saree",
    price: 5800,
    originalPrice: 8000,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 67,
    badge: "Exclusive",
    badgeColor: "from-violet-500 to-purple-500",
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker X",
    price: 1899,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    reviews: 198,
    badge: "-37%",
    badgeColor: "from-accent to-emerald-400",
  },
  {
    id: "7",
    name: "Classic Aviator Sunglasses",
    price: 999,
    originalPrice: 1800,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    rating: 4.4,
    reviews: 445,
    badge: "Popular",
    badgeColor: "from-amber-500 to-orange-500",
  },
  {
    id: "8",
    name: "Premium Cotton Polo Shirt",
    price: 1299,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviews: 321,
    badge: "New",
    badgeColor: "from-primary to-primary-light",
  },
];

const categories = [
  { name: "Fashion", emoji: "👗", href: "/categories/fashion", count: "2.4k+", gradient: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/20" },
  { name: "Electronics", emoji: "📱", href: "/categories/electronics", count: "1.8k+", gradient: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
  { name: "Beauty", emoji: "💄", href: "/categories/beauty", count: "960+", gradient: "from-purple-500/20 to-fuchsia-500/20", border: "border-purple-500/20" },
  { name: "Home", emoji: "🏠", href: "/categories/home-living", count: "1.2k+", gradient: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/20" },
  { name: "Lifestyle", emoji: "✨", href: "/categories/lifestyle", count: "780+", gradient: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/20" },
  { name: "Food", emoji: "🍕", href: "/categories/food", count: "540+", gradient: "from-orange-500/20 to-red-500/20", border: "border-orange-500/20" },
];

const reviews = [
  { name: "Fatima R.", rating: 5, comment: "Best shopping experience in Bangladesh! The quality of products is amazing and delivery was super fast.", avatar: "F", product: "Wireless Earbuds" },
  { name: "Tanvir A.", rating: 5, comment: "Love the personalized recommendations. Found exactly what I was looking for within minutes.", avatar: "T", product: "Fitness Watch" },
  { name: "Nusrat J.", rating: 4, comment: "Great selection of local and international brands. The seller storefronts are beautifully designed.", avatar: "N", product: "Jamdani Saree" },
];

// ── Animation Variants ──
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-2/10 rounded-full blur-[140px]" />
          
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-16 md:pt-36 md:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (Content) */}
            <div className="lg:col-span-7">
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm mb-6"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-text-secondary">
                  Bangladesh&apos;s First AI-Powered Marketplace
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6"
              >
                Shop{" "}
                <span className="gradient-text">Smarter</span>
                <br />
                <span className="text-text-primary">Not Harder</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed"
              >
                Discover curated products from thousands of local sellers. Get
                personalized recommendations, explore unique shops, and enjoy a
                premium shopping experience — all for{" "}
                <span className="text-accent font-semibold">free</span>.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3.5"
              >
                <Link href="/products">
                  <Button variant="primary" size="lg" className="group">
                    <ShoppingBag size={18} />
                    Start Shopping
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
                <Link href="https://xeni.co" target="_blank">
                  <Button variant="secondary" size="lg" className="group">
                    <Sparkles size={18} className="text-primary-light" />
                    Open Your Shop
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    />
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/5"
              >
                {[
                  { value: "10K+", label: "Products" },
                  { value: "500+", label: "Verified Sellers" },
                  { value: "50K+", label: "Happy Shoppers" },
                  { value: "4.8★", label: "Store Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl md:text-2xl font-display font-bold gradient-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column (Glassmorphic Showcase Widget) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative w-full max-w-md"
              >
                {/* Glow Backdrop behind Showcase */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-60" />

                {/* Main Hero Card */}
                <div className="relative p-6 rounded-3xl bg-bg-card/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-accent">
                      <Zap size={13} /> Trending Deal
                    </span>
                    <span className="text-xs text-text-muted">Live Stock</span>
                  </div>

                  {/* Main Product Image Container */}
                  <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-primary/20 via-white/5 to-accent/20 flex items-center justify-center text-6xl relative overflow-hidden group">
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🎧
                    </motion.div>
                    
                    {/* Floating rating badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-bg-primary/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                      <StarRating rating={4.9} size={12} />
                      <span className="text-xs font-bold text-text-primary">4.9</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-bold text-text-primary">
                        Wireless Earbuds Pro Max
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-accent-2/20 text-accent-2 text-xs font-bold shrink-0">
                        -40%
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mb-4">
                      Active Noise Cancellation • 32h Battery • Spatial Audio
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div>
                        <span className="text-xs text-text-muted block line-through">
                          ৳5,999
                        </span>
                        <span className="text-xl font-bold text-primary-light">
                          ৳3,499
                        </span>
                      </div>

                      <Link href="/products/1">
                        <Button variant="primary" size="sm">
                          View Product
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Extra Micro Card 1 (Bottom Left) */}
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-bg-primary/90 backdrop-blur-xl border border-white/10 shadow-xl absolute -bottom-6 -left-8 w-52 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-2/20 flex items-center justify-center text-xl shrink-0">
                    🛍️
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary">
                      Fast Delivery
                    </p>
                    <p className="text-[11px] text-text-muted">Inside Dhaka 24h</p>
                  </div>
                </motion.div>

                {/* Floating Extra Micro Card 2 (Top Right) */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent/15 border border-accent/30 backdrop-blur-xl absolute -top-5 -right-5 z-20"
                >
                  <Sparkles size={14} className="text-accent animate-spin" style={{ animationDuration: "6s" }} />
                  <span className="text-xs font-bold text-accent">AI Recommended</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TRUST BADGES */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative -mt-4 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "All over Bangladesh",
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                desc: "100% protected",
                color: "text-primary-light",
                bg: "bg-primary/10",
              },
              {
                icon: Gift,
                title: "Daily Deals",
                desc: "Up to 70% off",
                color: "text-accent-2",
                bg: "bg-accent-2/10",
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                desc: "Always here to help",
                color: "text-accent-3",
                bg: "bg-accent-3/10",
              },
            ].map(({ icon: Icon, title, desc, color, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all group"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {title}
                  </p>
                  <p className="text-[11px] text-text-muted">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CATEGORIES */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-xs font-semibold text-primary-light uppercase tracking-widest">
                Browse
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-1">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/categories"
              className="hidden md:flex items-center gap-1 text-sm text-text-secondary hover:text-primary-light transition-colors group"
            >
              View All
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Category Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
          >
            {categories.map((cat, i) => (
              <motion.div key={cat.name} variants={fadeInUp} custom={i}>
                <Link
                  href={cat.href}
                  className={`flex flex-col items-center gap-3 p-5 md:p-6 rounded-2xl bg-gradient-to-br ${cat.gradient} border ${cat.border} hover:scale-105 hover:shadow-lg transition-all duration-300 group`}
                >
                  <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </span>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-text-primary">
                      {cat.name}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {cat.count} items
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TRENDING PRODUCTS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-3 uppercase tracking-widest">
                <TrendingUp size={14} />
                Trending Now
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-1">
                Popular Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1 text-sm text-text-secondary hover:text-primary-light transition-colors group"
            >
              See All Products
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
          >
            {featuredProducts.map((product, i) => (
              <motion.div key={product.id} variants={fadeInUp} custom={i}>
                <Link
                  href={`/products/${product.id}`}
                  className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all duration-500 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-bg-card">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Badge */}
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gradient-to-r ${product.badgeColor} text-white text-[10px] font-bold uppercase tracking-wide shadow-lg`}
                    >
                      {product.badge}
                    </div>
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <button
                        className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart size={14} />
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-text-primary truncate group-hover:text-primary-light transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <StarRating rating={product.rating} size={11} />
                      <span className="text-[11px] text-text-muted">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="text-base font-bold text-primary-light">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-text-muted line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile "See All" */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="secondary" size="md">
                See All Products
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PROMOTIONAL BANNER */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-accent-2/20" />
            <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-sm" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-accent mb-4">
                  <Zap size={12} />
                  Limited Time Offer
                </span>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-text-primary mb-2">
                  Eid Collection <span className="gradient-text">2026</span>
                </h3>
                <p className="text-sm md:text-base text-text-secondary max-w-md">
                  Explore our handpicked festive collection. Premium quality products with up to 50% off.
                </p>
              </div>
              <Link href="/collections/eid-2026">
                <Button variant="accent" size="lg" className="group whitespace-nowrap">
                  Shop Collection
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* WHY E-PIC */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-1">
              The E-Pic Difference
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Discovery",
                desc: "Get personalized recommendations based on your style and preferences. Our AI assistant helps you find exactly what you need.",
                gradient: "from-primary/15 to-primary-light/15",
                border: "border-primary/20",
                iconColor: "text-primary-light",
              },
              {
                icon: Shield,
                title: "Zero Seller Fees",
                desc: "No hidden commissions or listing fees. Sellers keep 100% of their earnings. We believe in fair commerce for everyone.",
                gradient: "from-accent/15 to-emerald-500/15",
                border: "border-accent/20",
                iconColor: "text-accent",
              },
              {
                icon: Star,
                title: "Verified Reviews Only",
                desc: "Every review comes from a verified purchase. No fake reviews, no paid ratings — just genuine customer experiences.",
                gradient: "from-amber-500/15 to-orange-500/15",
                border: "border-amber-500/20",
                iconColor: "text-amber-400",
              },
            ].map(
              (
                { icon: Icon, title, desc, gradient, border, iconColor },
                i
              ) => (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  custom={i}
                  className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${gradient} border ${border} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 group overflow-hidden`}
                >
                  {/* Glow effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.04] transition-all" />

                  <div
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={24} className={iconColor} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-text-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* REVIEWS */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-accent-2 uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-1">
              What Our Customers Say
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-5"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                variants={fadeInUp}
                custom={i}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 group"
              >
                <StarRating rating={review.rating} size={14} className="mb-4" />
                <p className="text-sm text-text-secondary leading-relaxed mb-5">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {review.name}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      Purchased: {review.product}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CTA — OPEN YOUR SHOP */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-bg-card to-accent/15" />
            <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-sm" />

            {/* Decorative orb */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/30 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[60px]" />

            <div className="relative px-8 md:px-16 py-14 md:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-text-secondary mb-6">
                <Sparkles size={12} className="text-primary-light" />
                Powered by Xeni Commerce
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Ready to <span className="gradient-text">sell online?</span>
              </h2>
              <p className="text-base text-text-secondary max-w-lg mx-auto mb-8">
                Open your shop on E-Pic for free. Let Xeni handle your products,
                orders, inventory, and marketing with AI automation.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://xeni.co"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg" className="group">
                    Open Free Shop
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </a>
                <Link href="/about">
                  <Button variant="secondary" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
