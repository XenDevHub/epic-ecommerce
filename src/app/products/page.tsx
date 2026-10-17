"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { useProducts } from "@/hooks/useApi";
import type { PublicProduct } from "@/types/api";
import type { Product } from "@/types";

type SortOption = "featured" | "price-low" | "price-high" | "popular" | "newest";

const SORT_API_MAP = {
  featured: undefined,
  "price-low": "price_asc" as const,
  "price-high": "price_desc" as const,
  popular: "popular" as const,
  newest: "created_at" as const,
};

export default function ProductsPage() {
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(10000);

  const { data, isLoading, isError } = useProducts({
    per_page: 60,
    sort: SORT_API_MAP[sortBy],
  });


  const meta = data?.meta;

  const displayProducts = useMemo(() => {
    const allProducts = data?.data ?? [];
    let result = allProducts.filter((p) => p.price <= priceMax);
    if (inStockOnly) result = result.filter((p) => !p.is_out_of_stock);
    return result;
  }, [data, priceMax, inStockOnly]);

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

  const formatBDT = (amount: number) => "৳" + amount.toLocaleString("en-BD");

  const stockLabel = (p: PublicProduct) => {
    if (p.is_out_of_stock) return "Out of Stock";
    if (p.current_stock <= p.low_stock_threshold)
      return `Only ${p.current_stock} left`;
    return `${p.current_stock} in stock`;
  };

  // ── Skeleton ──
  if (isLoading) {
    return (
      <main className="w-full pt-24 bg-background min-h-screen text-on-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-24 space-y-10">
          <div className="h-10 w-56 bg-surface-container-high rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-surface-container-low p-4 space-y-4 animate-pulse"
              >
                <div className="w-full aspect-square rounded-2xl bg-surface-container-high" />
                <div className="h-3 w-3/4 bg-surface-container-high rounded" />
                <div className="h-3 w-1/2 bg-surface-container-high rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <main className="w-full pt-24 bg-background min-h-screen flex items-center justify-center text-on-surface">
        <div className="text-center space-y-4 max-w-sm">
          <span className="material-symbols-outlined text-6xl text-error/60">
            cloud_off
          </span>
          <h1 className="text-xl font-bold text-on-surface">
            সার্ভারের সাথে সংযোগ নেই
          </h1>
          <p className="text-sm text-on-surface-variant">
            Xeni 2.0 backend-এ পৌঁছানো যাচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full pt-24 bg-background min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-4 pb-8">
          <nav className="flex items-center gap-2.5 font-label-sm text-xs tracking-wide text-on-surface-variant/70 mb-6">
            <Link href="/" className="hover:text-on-surface transition-colors">
              Marketplace
            </Link>
            <span className="text-outline-variant/60">/</span>
            <span className="text-on-surface font-medium">All Products</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">
                Browse Collection
              </span>
              <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold mt-1">
                All Products
              </h1>
              <p className="text-sm text-on-surface-variant mt-2">
                {displayProducts.length} product
                {displayProducts.length !== 1 ? "s" : ""} found
                {meta && ` · ${meta.total} total`}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* In-stock toggle */}
              <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>

              {/* Price max */}
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span>Max: {formatBDT(priceMax)}</span>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-24 accent-primary"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none">
                  unfold_more
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-24">
          {displayProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
                inventory_2
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                No products found
              </h3>
              <p className="text-sm text-on-surface-variant max-w-md">
                Try adjusting your filters or check if the backend is seeded
                with data.
              </p>
              <button
                type="button"
                onClick={() => {
                  setPriceMax(10000);
                  setInStockOnly(false);
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold hover:brightness-105 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product) => {
                const image =
                  product.images?.[0] ||
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";

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
                        {product.current_stock > 0 &&
                          product.current_stock <= product.low_stock_threshold && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-xl border border-error/30 text-[11px] font-medium text-error">
                              Low Stock
                            </span>
                          )}
                      </Link>

                      <div className="space-y-1.5 px-1">
                        {/* Shop name + sold count */}
                        <div className="flex items-center justify-between text-[11px]">
                          <Link
                            href={`/shops/${product.shop_id}`}
                            className="text-secondary font-semibold truncate hover:underline"
                          >
                            {product.shop_name}
                          </Link>
                          {product.total_sold > 0 && (
                            <span className="text-on-surface-variant/60">
                              {product.total_sold} sold
                            </span>
                          )}
                        </div>

                        {/* Name */}
                        <Link
                          href={`/product/${product.id}`}
                          className="block font-headline-sm text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                        >
                          {product.name}
                        </Link>

                        {/* Bangla name */}
                        {product.name_bn && (
                          <p className="text-[11px] text-on-surface-variant/70 line-clamp-1">
                            {product.name_bn}
                          </p>
                        )}

                        {/* Stock */}
                        <span
                          className={`text-[11px] block ${
                            product.is_out_of_stock
                              ? "text-error"
                              : product.current_stock <=
                                product.low_stock_threshold
                              ? "text-amber-500"
                              : "text-on-surface-variant"
                          }`}
                        >
                          {stockLabel(product)}
                        </span>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="pt-4 px-1 flex items-center justify-between">
                      <span className="font-currency-display text-base font-bold text-on-surface">
                        {formatBDT(product.price)}
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
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
