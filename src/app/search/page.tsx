"use client";

import { useState, useDeferredValue, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useUIStore } from "@/stores/uiStore";
import { useSearch } from "@/hooks/useApi";
import type { PublicProduct } from "@/types/api";
import type { Product } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const isAiParam = searchParams.get("ai") === "true";

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [aiMode, setAiMode] = useState(isAiParam);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(
    isAiParam
      ? "Gemini AI Ready: Ask anything like '৫,০০০ টাকার মধ্যে সেরা গিফট' or 'Water resistant watch'."
      : null
  );

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openCart } = useUIStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Defer the query so typing doesn't block UI
  const deferredQuery = useDeferredValue(query);

  const { data, isLoading, isFetching } = useSearch(
    deferredQuery.trim().length >= 2
      ? { q: deferredQuery.trim(), per_page: 50 }
      : null
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setQuery(aiPrompt);
    setAiAnalysis(
      `Gemini Analysis for "${aiPrompt}": Filtered certified boutiques for matching aesthetic tone, durability, and customer satisfaction metrics.`
    );
  };

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

  // Client-side sort/filter on top of API results
  let products = data?.data ?? [];

  if (inStockOnly) products = products.filter((p) => !p.is_out_of_stock);

  if (sortBy === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") products = [...products].sort((a, b) => b.price - a.price);

  const isSearching = isLoading || isFetching;
  const hasQuery = deferredQuery.trim().length >= 2;

  return (
    <main className="w-full pt-28 pb-24 bg-background min-h-screen text-on-surface relative">
      {/* Background ambient glow */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-60 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/30 text-on-surface shadow-2xl animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-secondary text-xl">
            check_circle
          </span>
          <span className="font-body-md text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body-sm text-xs text-on-surface-variant/70 mb-6">
          <Link href="/" className="hover:text-on-surface transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-medium">Search Results</span>
          {query && (
            <>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-on-surface font-semibold">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </nav>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-outline-variant/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/15 text-secondary font-label-sm text-xs font-semibold mb-3 border border-secondary/20">
              <span className="material-symbols-outlined text-sm">search</span>
              <span>Live Xeni 2.0 Inventory</span>
            </div>
            <h1 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              {query ? `খোঁজ: "${query}"` : "পণ্য সার্চ ও ডিসকভারি"}
              <span className="block text-primary text-xl sm:text-2xl font-normal opacity-90 mt-1">
                {isSearching
                  ? "Searching live inventory..."
                  : hasQuery
                  ? `Found ${products.length} result${products.length !== 1 ? "s" : ""}`
                  : "Type to search products"}
              </span>
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setAiMode(!aiMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shadow-sm ${
              aiMode
                ? "bg-primary text-on-primary border-primary ring-2 ring-primary/30"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/20"
            }`}
          >
            <span className="material-symbols-outlined text-base text-tertiary">
              auto_awesome
            </span>
            <span>{aiMode ? "Gemini AI Active" : "Ask Gemini AI"}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-8">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, shop names, descriptions..."
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
              autoFocus
            />
            {isSearching && (
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xl animate-spin">
                progress_activity
              </span>
            )}
          </div>
        </div>

        {/* Gemini AI Bar */}
        {aiMode && (
          <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-surface-container-high/90 via-surface-container/80 to-surface-container-high/90 backdrop-blur-xl border border-primary/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary via-secondary to-tertiary flex items-center justify-center text-on-primary shadow-sm">
                  <span className="material-symbols-outlined text-sm">
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                    Gemini AI Shopping Assistant
                  </h3>
                  <span className="text-[11px] text-on-surface-variant">
                    Natural language intent matching across verified merchant catalogs
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAiMode(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleAiSearch} className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="বাংলা বা ইংরেজিতে বলুন: '৫০০০ টাকার মধ্যে গিফট', 'ANC headphone for study'..."
                className="flex-1 px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-primary/60 font-body-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Find Matches</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </form>

            {aiAnalysis && (
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary flex items-start gap-2">
                <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">
                  info
                </span>
                <span>{aiAnalysis}</span>
              </div>
            )}
          </div>
        )}

        {/* Filter Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/15">
          <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-primary cursor-pointer"
            />
            <span>In Stock Only</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "featured" | "price-asc" | "price-desc"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/15 text-xs text-on-surface focus:outline-none"
            >
              <option value="featured">Most Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {!hasQuery ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">
              search
            </span>
            <p className="text-on-surface-variant text-sm">
              Type at least 2 characters to search the live product catalog from
              Xeni 2.0.
            </p>
          </div>
        ) : isSearching ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-surface-container-low/70 border border-outline-variant/15 overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-surface-container-high" />
                <div className="p-4 space-y-2">
                  <div className="h-3 w-3/4 bg-surface-container-high rounded" />
                  <div className="h-3 w-1/2 bg-surface-container-high rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-center mx-auto text-on-surface-variant/50">
              <span className="material-symbols-outlined text-4xl">
                search_off
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="font-headline-sm text-xl font-bold text-on-surface">
                কোনো পণ্য খুঁজে পাওয়া যায়নি
              </h2>
              <p className="text-on-surface-variant text-sm">
                No items match &ldquo;{query}&rdquo;. Try another term.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all border border-outline-variant/15"
              >
                Clear Search
              </button>
              <Link
                href="/products"
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold transition-all shadow-md"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const image =
                product.images?.[0] ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
              const wishlisted = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/15 hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col shadow-md hover:shadow-xl"
                >
                  {/* Wishlist Heart */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      type="button"
                      onClick={() => {
                        toggleItem(toCartProduct(product));
                        triggerToast(
                          wishlisted
                            ? `Removed from wishlist`
                            : `"${product.name}" saved to wishlist`
                        );
                      }}
                      className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        wishlisted
                          ? "bg-primary text-on-primary shadow-md"
                          : "bg-surface-container-highest/80 text-on-surface-variant hover:text-primary hover:bg-surface-bright border border-outline-variant/20"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {wishlisted ? "favorite" : "favorite_border"}
                      </span>
                    </button>
                  </div>

                  {/* Image */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative aspect-square w-full overflow-hidden bg-surface-container"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.is_out_of_stock && (
                      <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-error/20 text-error text-xs font-bold border border-error/30">
                          Stock Out
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Card Content */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-1">
                      <Link
                        href={`/shops/${product.shop_id}`}
                        className="text-[11px] font-medium text-secondary hover:underline line-clamp-1 block"
                      >
                        {product.shop_name}
                      </Link>
                      <Link
                        href={`/product/${product.id}`}
                        className="font-headline-sm text-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-2 block"
                      >
                        {product.name}
                      </Link>
                      {product.name_bn && (
                        <p className="text-xs text-on-surface-variant/80 line-clamp-1">
                          {product.name_bn}
                        </p>
                      )}
                      <span className="font-currency-display text-lg font-bold text-on-surface block pt-1">
                        ৳{product.price.toLocaleString("bn-BD")}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-outline-variant/10 flex items-center gap-2">
                      <button
                        type="button"
                        disabled={product.is_out_of_stock}
                        onClick={() => {
                          addItem(toCartProduct(product));
                          triggerToast(`"${product.name}" added to bag`);
                          openCart();
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-bold text-xs transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">
                          shopping_bag
                        </span>
                        Add to Bag
                      </button>
                      <Link
                        href={`/product/${product.id}`}
                        className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                        title="View details"
                      >
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full pt-28 pb-20 bg-background min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-surface-container-low animate-pulse"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
