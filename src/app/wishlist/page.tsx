"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    triggerToast(`"${product.name}" added to bag`);
    openCart();
  };

  const handleAddAllToCart = () => {
    items.forEach((p) => addItem(p));
    triggerToast(`Added ${items.length} items to bag`);
    openCart();
  };

  if (!mounted) {
    return (
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
    );
  }

  return (
    <main className="w-full pt-28 pb-24 bg-background min-h-screen text-on-surface relative">
      {/* Background ambient glow */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-60 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface-container-highest/95 backdrop-blur-xl border border-secondary/30 text-on-surface shadow-2xl animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-secondary text-xl">
            check_circle
          </span>
          <span className="font-body-md text-sm font-medium">
            {toastMessage}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body-sm text-xs text-on-surface-variant/70 mb-6">
          <Link href="/" className="hover:text-on-surface transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-primary font-medium">Saved Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-outline-variant/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/15 text-secondary font-label-sm text-xs font-semibold mb-3 border border-secondary/20">
              <span className="material-symbols-outlined text-sm">favorite</span>
              <span>Saved Collections</span>
            </div>
            <h1 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              আমার পছন্দের তালিকা
              <span className="block text-primary text-xl sm:text-2xl font-normal opacity-90 mt-1">
                Your Curated Wishlist ({items.length})
              </span>
            </h1>
            <p className="text-on-surface-variant text-sm mt-1 max-w-xl">
              Save pieces you love, get notified on price changes and reserve stock directly with certified merchants.
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearWishlist}
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold transition-all border border-outline-variant/15 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">
                  delete_sweep
                </span>
                Clear All
              </button>
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  add_shopping_cart
                </span>
                Move All to Bag
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        {items.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-center mx-auto text-on-surface-variant/50">
              <span className="material-symbols-outlined text-4xl">
                favorite_border
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="font-headline-sm text-xl font-bold text-on-surface">
                আপনার উইশলিস্ট এখনো খালি
              </h2>
              <p className="text-on-surface-variant text-sm">
                You haven&apos;t added any items to your wishlist yet. Explore our curated boutiques and trending drops.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <span className="material-symbols-outlined text-lg">
                  explore
                </span>
                Explore Curated Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => {
              const image =
                product.images?.[0] ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
              const isOutOfStock = product.is_out_of_stock;

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/15 hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col shadow-md hover:shadow-xl"
                >
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-surface-container-highest/80 backdrop-blur-md text-on-surface-variant hover:text-error hover:bg-error/10 border border-outline-variant/20 flex items-center justify-center transition-colors"
                    title="Remove from wishlist"
                  >
                    <span className="material-symbols-outlined text-base">
                      close
                    </span>
                  </button>

                  {/* Product Image Link */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative aspect-square w-full overflow-hidden bg-surface-container"
                  >
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-error/20 text-error text-xs font-bold border border-error/30">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-on-surface-variant/80">
                        <span className="uppercase tracking-wider font-semibold text-[10px] text-secondary">
                          Verified Stock
                        </span>
                        <span className="text-primary font-medium text-[11px]">
                          Fast Dispatch
                        </span>
                      </div>

                      <Link
                        href={`/product/${product.id}`}
                        className="font-headline-sm text-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-1 block"
                      >
                        {product.name}
                      </Link>

                      {product.name_bn && (
                        <p className="text-xs text-on-surface-variant/80 line-clamp-1">
                          {product.name_bn}
                        </p>
                      )}

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-currency-display text-lg font-bold text-on-surface">
                          ৳{product.price.toLocaleString("bn-BD")}
                        </span>
                        <span className="text-xs text-on-surface-variant/70">
                          BDT
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-outline-variant/10 flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={() => handleAddToCart(product)}
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
