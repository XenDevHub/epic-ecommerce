"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { useProducts } from "@/hooks/useApi";
import type { PublicProduct } from "@/types/api";
import type { Product } from "@/types";

interface DropItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: string;
  image: string;
}

const FEATURED_DROPS: DropItem[] = [
  {
    id: "phantom-rgb-keyboard",
    name: "Phantom RGB 75% Keyboard",
    category: "Tech Hub",
    price: 3290,
    stock: "4 units in stock • Banani Hub",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAElGnxnOAPdSE-u8zAk3VBj3ubvdrG9tlgnovYQ3wTKw0BUvXfkWT7qXhSSvNJ2Av8t5jk1VEJUnJ1L6Vc0cPW_J7aWN4v3rQ8hYIihtDsuh2SAe1h_AWRk1PCr0fAazgP03gMp-WThMAsaZrnrOmQ1x0AiH3C0ljCrWXUD6mVLds-AhHyx1nhS5PS8atlSO6roQn-4nFhFegkbsDHfJACxguUohhutJqzt6urmxpJdrLsXi8gqg8qcQ",
  },
  {
    id: "heritage-tangail-saree",
    name: "Heritage Tangail Cotton Saree",
    category: "Heritage Textiles",
    price: 2450,
    stock: "7 units in stock • Tangail Studio",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIT868IO6r4sSPeZmxt3egbO-zl5Lk1ZzPNIuxOBnGDX3F3RCpAeUAeVJMqiBOE1tyj8aU80KfcG9JGY-YFYI_u-sbX77couLzG9LW4Myb6vwZMSzAttaJybsXU8sXEuwVJXLCrFpE78l3eHROZ8KlTRqEQi-umUUrGscqpL1TzX3-3BnyI5ggMjtfDR4JH2CKHDJDnD50e6mBgOlMN4r3YEdEn3MHob2DlJMvB7aaVT2sj56FsiGPg",
  },
  {
    id: "voltprime-65w-charger",
    name: "VoltPrime 65W GaN Charger",
    category: "Under ৳২,০০০",
    price: 1850,
    stock: "18 units in stock • Dhanmondi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TzBYEprnASzpC632ZDWA8E8eyOoTxDUk0zgWqt_I6QUM_9eMw0dhZlRoWg5013T675TTGznB6BUIJylGctG9xASxxNbQGrl_gEF3bU3UgxABTMYGQSlek_lHnAgUtR7CsndPIiJ885CYUJ4Ta1iPoGTwChPbHXzx7b8Xjx9UUbGlTY2gsFefEFsUxapjZQb86xoI8hLiplFl44b1YRKqbbF9ehogbEBBMTXtqVszDkwqwhf4BTFc4w",
  },
  {
    id: "pure-centella-ampoule",
    name: "Pure Centella 100ml Ampoule",
    category: "Under ৳২,০০০",
    price: 1650,
    stock: "9 units in stock • Uttara Hub",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDasgckhLJOGXZ88qG2h4cToX9bq68Y2YQHJFW1l5HxoQIbMGX0a-eg7u12jZNJlQZh-b71l9aikHFuV3fdr78isaq9boQ8VltqUh1r3dNWhT3W6DT6sFPccQLm1b0i7iWJ4PKdPAvOWWcMNCsn6BRNLL9RG2_c-GRIIcDOTHSDJLpQY0Kh0SjuhEwQvKxE04oz-f9vD0RWTazgUzl7TjESp580ru_pbcI9xFH_jBwfkNNYe7SQ6MxzcQ",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Curations");
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  // Fetch real products from Xeni 2.0
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    per_page: 8,
    sort: "popular",
  });

  const apiProducts = productsData?.data ?? [];

  const toCartProduct = (p: PublicProduct): Product => ({
    id: p.id,
    shop_id: p.shop_id,
    name: p.name,
    name_bn: p.name_bn,
    description: p.description,
    price: p.price,
    initial_stock: p.initial_stock,
    current_stock: p.current_stock,
    low_stock_threshold: p.low_stock_threshold,
    is_out_of_stock: p.is_out_of_stock,
    is_active: p.is_active,
    has_variants: p.has_variants,
    images: p.images,
    created_at: p.created_at,
    updated_at: p.updated_at,
  });

  const handleAddToCart = (product: PublicProduct) => {
    addItem(toCartProduct(product));
    openCart();
  };

  const handleCheckoutCuratedPair = () => {
    addItem({
      id: "emerald-silk-kurti",
      shop_id: "shop-anokhi",
      name: "Emerald Silk Kurti",
      price: 3200,
      initial_stock: 30,
      current_stock: 12,
      low_stock_threshold: 3,
      is_out_of_stock: false,
      is_active: true,
      has_variants: false,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDESzocvPgJ0KX3GKZ9tW4itbCMeNHwS5dwVdkgzcj6Uif9PReuZM3cZuJuNhvL5-IVbsO09Hv7ZKj-fYFTnQ0v0Dv6BA1XOnofv7Nz8z4fLIQfghsUB6wYbg6aM7PCxoza8ICfAE9I8_3eyA206SEfYLjJxwOp1s4d_05vRlHAAK6_r_G74SLQUxxsJ0pB3DyjD41Ny1tZkcOh3jPZBcTBXMgVAbPjkhpYvN-kqcbj66TvcmAhKzouTA",
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    addItem({
      id: "kundan-choker-earring",
      shop_id: "shop-zaveri",
      name: "Kundan Choker & Earring",
      price: 1500,
      initial_stock: 25,
      current_stock: 8,
      low_stock_threshold: 2,
      is_out_of_stock: false,
      is_active: true,
      has_variants: false,
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDunsquC_L9U1RPrYDOqMr1RbPqljKwP2RY7QfMmcD-C-s3z8d9zy0ZdebXzPSKVhmW1S3VkuSiwl9lwJ0O445vsOuXeQ88hC9buq9ZHqNCVw2W27ku_jbiZefpFpWN2HLmhrN7n92IpCoiKr96t-5BBayFaACptLzJFbXNW7j-VSxlB01WPZWFV2iW_Nro_dyJbVsxQmhtVvT09aCVk8AraJjjhD-cQFQD0guPcS7hA2GjwQ0JKunZcw",
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    openCart();
  };

  return (
    <main className="w-full bg-background relative min-h-screen pt-24 text-on-surface">
      <div className="flex flex-col w-full">
        {/* Editorial Hero Section */}
        <section className="relative w-full overflow-hidden pt-6 pb-16">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-1/3 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -top-12 right-12 w-[380px] h-[380px] bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headlines & Callouts */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low text-xs text-on-surface-variant shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span>Dhaka Live Mesh • Verified Escrow Commerce</span>
                </div>

                <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface font-extrabold tracking-tight leading-tight">
                  বাংলাদেশের শীর্ষস্থানীয়{" "}
                  <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                    স্মার্ট মার্কেটপ্লেস
                  </span>
                </h1>

                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
                  Experience authentic Bangladeshi luxury and high-performance
                  technology. Guaranteed 2-Hour Dhaka Express handoff, instant
                  decentralized escrow, and intelligent AI-matched bundles.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#drops"
                    className="px-8 py-3.5 rounded-full bg-primary text-on-primary font-headline-sm text-sm font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      explore
                    </span>
                    <span>Curated Drops</span>
                  </a>
                  <a
                    href="#gemini-copilot"
                    className="px-6 py-3.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-headline-sm text-sm font-semibold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-tertiary text-lg">
                      auto_awesome
                    </span>
                    <span>Gemini Shopper</span>
                  </a>
                </div>

                {/* Key Metrics Strip */}
                <div className="pt-6 flex items-center gap-8 text-xs text-on-surface-variant max-w-lg">
                  <div>
                    <span className="block font-headline-sm text-xl text-on-surface font-bold">
                      18k+
                    </span>
                    <span>Orders in Dhaka this week</span>
                  </div>
                  <div className="h-6 w-px bg-surface-container-highest" />
                  <div>
                    <span className="block font-headline-sm text-xl text-secondary font-bold">
                      0.4s
                    </span>
                    <span>Live Inventory Sync</span>
                  </div>
                  <div className="h-6 w-px bg-surface-container-highest" />
                  <div>
                    <span className="block font-headline-sm text-xl text-primary font-bold">
                      100%
                    </span>
                    <span>Escrow Protected</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Minimal AI Copilot Micro Card */}
              <div className="lg:col-span-5 relative" id="gemini-copilot">
                <div className="rounded-3xl bg-surface-container-low/95 backdrop-blur-xl p-7 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-xl">
                          auto_awesome
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-base text-on-surface font-bold">
                          Gemini Copilot
                        </h3>
                        <span className="text-[11px] text-secondary font-medium">
                          Dhaka Style &amp; Budget Matcher
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary font-semibold uppercase tracking-wider">
                      Active
                    </span>
                  </div>

                  {/* Bengali Prompt Box */}
                  <div className="p-4 rounded-2xl bg-surface-container-lowest/80 space-y-1.5 shadow-inner">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold block">
                      Bengali Voice Query
                    </span>
                    <p className="font-body-md text-xs sm:text-sm text-on-surface italic font-normal leading-relaxed">
                      &ldquo;আমার বোনের জন্মদিনের জন্য ৫,০০০ টাকার মধ্যে গর্জিয়াস
                      ড্রেস ও ম্যাচিং জুয়েলারি সাজেস্ট করো&rdquo;
                    </p>
                  </div>

                  {/* AI Curated Pair */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="font-medium">AI Curated Pair</span>
                      <span className="text-secondary font-semibold">
                        Saved ৳৩০০ Surplus
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container shadow-sm">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-11 h-11 rounded-lg object-cover"
                          alt="Emerald Silk Kurti"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDESzocvPgJ0KX3GKZ9tW4itbCMeNHwS5dwVdkgzcj6Uif9PReuZM3cZuJuNhvL5-IVbsO09Hv7ZKj-fYFTnQ0v0Dv6BA1XOnofv7Nz8z4fLIQfghsUB6wYbg6aM7PCxoza8ICfAE9I8_3eyA206SEfYLjJxwOp1s4d_05vRlHAAK6_r_G74SLQUxxsJ0pB3DyjD41Ny1tZkcOh3jPZBcTBXMgVAbPjkhpYvN-kqcbj66TvcmAhKzouTA"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-on-surface truncate max-w-[150px]">
                            Emerald Silk Kurti
                          </h4>
                          <span className="text-[10px] text-on-surface-variant">
                            Anokhi Studio
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-xs font-bold text-on-surface">
                        ৳৩,২০০
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container shadow-sm">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-11 h-11 rounded-lg object-cover"
                          alt="Royal Kundan Choker"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDunsquC_L9U1RPrYDOqMr1RbPqljKwP2RY7QfMmcD-C-s3z8d9zy0ZdebXzPSKVhmW1S3VkuSiwl9lwJ0O445vsOuXeQ88hC9buq9ZHqNCVw2W27ku_jbiZefpFpWN2HLmhrN7n92IpCoiKr96t-5BBayFaACptLzJFbXNW7j-VSxlB01WPZWFV2iW_Nro_dyJbVsxQmhtVvT09aCVk8AraJjjhD-cQFQD0guPcS7hA2GjwQ0JKunZcw"
                        />
                        <div>
                          <h4 className="text-xs font-semibold text-on-surface truncate max-w-[150px]">
                            Kundan Choker &amp; Earring
                          </h4>
                          <span className="text-[10px] text-on-surface-variant">
                            Zaveri Express BD
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-xs font-bold text-on-surface">
                        ৳১,৫০০
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckoutCuratedPair}
                    className="w-full py-3.5 rounded-xl bg-secondary text-on-secondary font-headline-sm text-xs font-bold flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-lg"
                  >
                    <span className="material-symbols-outlined text-base">
                      shopping_cart_checkout
                    </span>
                    <span>Checkout Curated Pair (৳৪,৭০০)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Understated Value Bar */}
        <section className="w-full bg-surface-container-lowest/60 py-6 shadow-inner">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl">
                local_shipping
              </span>
              <div>
                <h4 className="text-xs font-bold text-on-surface tracking-wide uppercase">
                  Hyperlocal 2-Hour Delivery
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Dispatched directly from Dhaka &amp; regional fulfillment hubs.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">
                verified_user
              </span>
              <div>
                <h4 className="text-xs font-bold text-on-surface tracking-wide uppercase">
                  Xeni Escrow Verification
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Funds protected until delivery verification with instant refund.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary text-2xl">
                account_balance_wallet
              </span>
              <div>
                <h4 className="text-xs font-bold text-on-surface tracking-wide uppercase">
                  bKash &amp; Nagad Direct Settlement
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Instant zero-fee transaction settlement with direct buyer cashback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Flagship Boutiques */}
        <section className="max-w-7xl mx-auto px-6 py-16 w-full" id="boutiques">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">
                Verified Boutiques
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-extrabold mt-1">
                Curated Flagship Studios
              </h2>
            </div>
            <a
              className="text-xs font-semibold text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors"
              href="#drops"
            >
              <span>View all brand studios</span>
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Studio 1: Apex Artisanal */}
            <div className="group rounded-3xl bg-surface-container-low p-6 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-surface-container-highest flex items-center justify-center font-headline-sm text-sm font-bold text-on-surface shadow-sm">
                    AX
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                        Apex Artisanal
                      </h3>
                      <span className="material-symbols-outlined text-primary text-xs">
                        verified
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Official Flagship • 2-Hr Dispatch
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-secondary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">star</span>
                  4.9
                </span>
              </div>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container-lowest mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Apex Footwear"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZwR2qdke35-YhmXDncKNWF4Hsp5lXyaDhGGxoXZX4J1TMRVoCx1gVlxA52-G6hoTuNJlMf6tLJA_qnrGjGpt6FtOizUoPvo7tenvfN4XXZwwO9nPwVrYdkbapNIGTmn-_0AWVH4Wm-XvPJdJMdqHgscOEf3ptSuSyWCWLjWx5lh4zKpoT9AwrADMjaz8pulJutH8jAu5fJAT6GFI1Yb4Y4el26FlMbtOZR2WRV7UxxFkzE3KEuVztdw"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-on-surface-variant">
                  142 Authentic styles
                </span>
                <Link
                  href="/shops/shop-apex-artisanal"
                  className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-semibold transition-colors"
                >
                  Explore Boutique
                </Link>
              </div>
            </div>

            {/* Studio 2: Anokhi Handloom */}
            <div className="group rounded-3xl bg-surface-container-low p-6 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-headline-sm text-sm font-bold shadow-sm">
                    AK
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                        Anokhi Handloom
                      </h3>
                      <span className="material-symbols-outlined text-primary text-xs">
                        verified
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Authentic Weavers • Dhaka
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-secondary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">star</span>
                  4.8
                </span>
              </div>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container-lowest mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Anokhi Jamdani"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2EsvU-4XBMnP0BBVU4vCS0dc8QwDrc_PjoyzL4v32idZQACNFoBZgIvGLNcjaieFwvNKBXcr7FOPcnCWmFk2pFQCgyRAFInyBmWTik-mZJ_6mWUJGlZqmznqQPBe5ZCn0Nhpfrd8yAu2Xpv_cylWt-rKW9M_M5Isouq-85EbNsZFmEWv5v1QWdaDrqvF_cTVyUgxFxWjqsCC7Bh9BXvOuGNI1kGQW-VV42ddzKB4qOs3EFhN77v20HQ"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-on-surface-variant">
                  86 Handcrafted drops
                </span>
                <Link
                  href="/shops/shop-anokhi-handloom"
                  className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-semibold transition-colors"
                >
                  Explore Boutique
                </Link>
              </div>
            </div>

            {/* Studio 3: Pulse Acoustics */}
            <div className="group rounded-3xl bg-surface-container-low p-6 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-tertiary/20 text-tertiary flex items-center justify-center font-headline-sm text-sm font-bold shadow-sm">
                    PA
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                        Pulse Acoustics
                      </h3>
                      <span className="material-symbols-outlined text-primary text-xs">
                        verified
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Official Hi-Res Audio Importer
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-secondary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-xs">star</span>
                  4.9
                </span>
              </div>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container-lowest mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Pulse Audio Pro"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArLaHe7PGVtYzIy4w8MlTUERrmcXK4boooAfqv0KN_krTDzTK-p2zK3AgrlY1q5vKzhL2zsQSARBXGjWf1yW8jgxg0dfws6-lxSMhiB99JEdrtDN2Fo1BfyS-08lpcxyXd0w6RrlzR2kQQUdNbKaI5Uq_gLEPukGvXLI15qS6dsgrr1O3a2VmH39KEKnRVJJ1phrgchS9fsgMXIacXgqbK-mhns5M-Y23fX9QQYElZJ2ybJQHbpSxF2A"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-on-surface-variant">
                  1-Year Official Warranty
                </span>
                <Link
                  href="/shops/shop-pulse-acoustics"
                  className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-semibold transition-colors"
                >
                  Explore Boutique
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Drops & Tech Catalog */}
        <section className="max-w-7xl mx-auto px-6 py-10 w-full" id="drops">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">
                Curated Catalog
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-extrabold mt-1">
                Featured Drops in Bangladesh
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                "All Curations",
                "Tech Hub",
                "Heritage Textiles",
                "Under ৳২,০০০",
              ].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-on-primary shadow-md"
                      : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant shadow-sm"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingProducts ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-surface-container-low p-4 space-y-4 animate-pulse"
                >
                  <div className="w-full aspect-square rounded-2xl bg-surface-container-high" />
                  <div className="h-3 w-3/4 bg-surface-container-high rounded" />
                  <div className="h-3 w-1/2 bg-surface-container-high rounded" />
                </div>
              ))
            ) : apiProducts.length === 0 ? (
              /* Fallback: use FEATURED_DROPS if API returns no data */
              FEATURED_DROPS.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-3xl bg-surface-container-low p-4 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <Link
                      href={`/product/${item.id}`}
                      className="block relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-lowest"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={item.name}
                        src={item.image}
                      />
                    </Link>
                    <div>
                      <span className="text-[11px] text-on-surface-variant">
                        {item.stock}
                      </span>
                      <Link
                        href={`/product/${item.id}`}
                        className="block font-headline-sm text-sm font-bold text-on-surface mt-0.5 line-clamp-1 group-hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-headline-md text-base font-bold text-on-surface">
                      ৳{item.price.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              apiProducts.map((product) => {
                const image =
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
                const stockText = product.is_out_of_stock
                  ? "Out of Stock"
                  : product.current_stock <= product.low_stock_threshold
                  ? `Only ${product.current_stock} left`
                  : `${product.current_stock} in stock • ${product.shop_name}`;

                return (
                  <div
                    key={product.id}
                    className="group rounded-3xl bg-surface-container-low p-4 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <div className="space-y-3">
                      <Link
                        href={`/product/${product.id}`}
                        className="block relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-lowest"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={product.name}
                          src={image}
                        />
                        {product.is_out_of_stock && (
                          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
                            <span className="px-3 py-1 rounded-full bg-error/20 text-error text-xs font-bold border border-error/30">
                              Stock Out
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={(e) => e.preventDefault()}
                          className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface-variant hover:text-error transition-colors"
                          title="Save to wishlist"
                        >
                          <span className="material-symbols-outlined text-sm">
                            favorite
                          </span>
                        </button>
                      </Link>
                      <div>
                        <span className="text-[11px] text-on-surface-variant">
                          {stockText}
                        </span>
                        <Link
                          href={`/product/${product.id}`}
                          className="block font-headline-sm text-sm font-bold text-on-surface mt-0.5 line-clamp-1 group-hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="font-headline-md text-base font-bold text-on-surface">
                        ৳{product.price.toLocaleString("en-BD")}
                      </span>
                      <button
                        type="button"
                        disabled={product.is_out_of_stock}
                        onClick={() => handleAddToCart(product)}
                        className="px-3.5 py-2 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-semibold text-on-surface transition-all flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add_shopping_cart
                        </span>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
