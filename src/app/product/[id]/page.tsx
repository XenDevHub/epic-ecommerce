"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useUIStore } from "@/stores/uiStore";
import { useProduct } from "@/hooks/useApi";
import type { Product } from "@/types";

export default function ProductDetailPage() {
  const routeParams = useParams();
  const id = (routeParams?.id as string) || "";
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openCart } = useUIStore();

  const { data: product, isLoading, isError } = useProduct(id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  const showToast = (title: string, subtitle: string) => {
    setToastMessage({ title, subtitle });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatBDT = (amount: number) => "৳" + amount.toLocaleString("bn-BD");

  // ── Loading ──
  if (isLoading) {
    return (
      <main className="w-full pt-24 bg-background min-h-screen text-on-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-pulse">
            <div className="lg:col-span-6 space-y-4">
              <div className="w-full aspect-square rounded-3xl bg-surface-container-high" />
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-surface-container-high"
                  />
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              <div className="h-6 w-32 bg-surface-container-high rounded" />
              <div className="h-10 w-3/4 bg-surface-container-high rounded" />
              <div className="h-4 w-full bg-surface-container-high rounded" />
              <div className="h-4 w-5/6 bg-surface-container-high rounded" />
              <div className="h-12 w-1/3 bg-surface-container-high rounded" />
              <div className="flex gap-3">
                <div className="h-14 flex-1 bg-surface-container-high rounded-2xl" />
                <div className="h-14 w-40 bg-surface-container-high rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Error / Not found ──
  if (isError || !product) {
    return (
      <main className="w-full pt-24 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">
            search_off
          </span>
          <div>
            <h1 className="text-2xl font-bold text-on-surface mb-2">
              Product Not Found
            </h1>
            <p className="text-on-surface-variant text-sm">
              The product &ldquo;{id}&rdquo; does not exist or has been removed.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-semibold text-sm hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Browse All Products
          </Link>
        </div>
      </main>
    );
  }

  // ── Helpers ──
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"];

  const mainCartProduct: Product = {
    id: product.id,
    shop_id: product.shop_id,
    name: product.name,
    name_bn: product.name_bn,
    description: product.description,
    price: product.price,
    initial_stock: product.initial_stock,
    current_stock: product.current_stock,
    low_stock_threshold: product.low_stock_threshold,
    is_out_of_stock: product.is_out_of_stock,
    is_active: product.is_active,
    has_variants: product.has_variants,
    images: product.images,
    created_at: product.created_at,
    updated_at: product.updated_at,
  };

  const wishlisted = isInWishlist(product.id);

  const stockLabel = () => {
    if (product.is_out_of_stock) return { text: "Out of Stock", color: "text-error" };
    if (product.current_stock <= product.low_stock_threshold)
      return { text: `Only ${product.current_stock} units left — order fast!`, color: "text-amber-500" };
    return { text: `${product.current_stock} units in stock`, color: "text-secondary" };
  };

  const stock = stockLabel();

  const handleAddToCart = () => {
    addItem(mainCartProduct);
    showToast("Added to Cart", `1× ${product.name} added to bag`);
    openCart();
  };

  const handleInstantBuy = () => {
    addItem(mainCartProduct);
    router.push("/checkout");
  };

  const handleWishlist = () => {
    toggleItem(mainCartProduct);
    showToast(
      wishlisted ? "Removed from Wishlist" : "Saved to Wishlist",
      product.name
    );
  };

  return (
    <main className="w-full pt-24 bg-background relative min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        {/* Product Overview */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-4 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2.5 font-label-sm text-xs tracking-wide text-on-surface-variant/70 mb-8">
            <Link href="/" className="hover:text-on-surface transition-colors">
              Marketplace
            </Link>
            <span className="text-outline-variant/60">/</span>
            <Link
              href={`/shops/${product.shop_id}`}
              className="hover:text-on-surface transition-colors"
            >
              {product.shop_name}
            </Link>
            <span className="text-outline-variant/60">/</span>
            <span className="text-on-surface font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Images */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Main image */}
              <div className="relative w-full aspect-square rounded-3xl bg-surface-container-lowest border border-outline-variant/15 shadow-2xl overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={product.name}
                  src={images[activeImageIndex]}
                />

                {/* Wishlist button */}
                <button
                  type="button"
                  onClick={handleWishlist}
                  className={`absolute top-5 right-5 w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md ${
                    wishlisted
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-highest/80 text-on-surface-variant hover:text-primary border border-outline-variant/20"
                  }`}
                  title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <span className="material-symbols-outlined text-lg">
                    {wishlisted ? "favorite" : "favorite_border"}
                  </span>
                </button>

                {product.is_out_of_stock && (
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-error/20 text-error text-sm font-bold border border-error/30">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3.5">
                  {images.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-2xl bg-surface-container-low border transition-all overflow-hidden ${
                        activeImageIndex === idx
                          ? "border-primary/60 ring-2 ring-primary opacity-100"
                          : "border-outline-variant/15 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover"
                        src={url}
                        alt={`Image ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/15 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">
                    verified
                  </span>
                  <span className="text-on-surface font-medium">
                    Verified Seller
                  </span>
                </div>
                <span className="text-outline-variant/60">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">
                    published_with_changes
                  </span>
                  <span>7-Day Easy Return</span>
                </div>
                <span className="text-outline-variant/60">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">
                    shield
                  </span>
                  <span>Escrow Protected</span>
                </div>
              </div>
            </div>

            {/* Right: Buy Box */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Shop link */}
              <Link
                href={`/shops/${product.shop_id}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:underline"
              >
                <span className="material-symbols-outlined text-base">
                  storefront
                </span>
                {product.shop_name}
              </Link>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-bold tracking-tight leading-tight">
                  {product.name}
                </h1>
                {product.name_bn && (
                  <p className="text-base text-on-surface-variant font-medium">
                    {product.name_bn}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-xl">
                  {product.description}
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-4 py-3 border-y border-outline-variant/15">
                <span className="font-currency-display text-4xl text-on-surface font-bold">
                  {formatBDT(product.price)}
                </span>
                {product.total_sold > 0 && (
                  <span className="text-sm text-on-surface-variant">
                    {product.total_sold.toLocaleString()} sold
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-base ${stock.color}`}
                >
                  {product.is_out_of_stock ? "cancel" : "check_circle"}
                </span>
                <span className={`text-sm font-medium ${stock.color}`}>
                  {stock.text}
                </span>
              </div>

              {/* Variants (if any) */}
              {product.has_variants && product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                    Available Options
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <div
                        key={v.id}
                        className="px-3 py-2 rounded-xl border border-outline-variant/20 bg-surface-container text-xs text-on-surface"
                      >
                        {v.color && <span>{v.color}</span>}
                        {v.color && v.size && <span> / </span>}
                        {v.size && <span>{v.size}</span>}
                        {v.price_modifier !== 0 && (
                          <span className="text-secondary ml-1">
                            {v.price_modifier > 0 ? "+" : ""}
                            {formatBDT(v.price_modifier)}
                          </span>
                        )}
                        <span className="ml-2 text-on-surface-variant">
                          ({v.stock} left)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SKU */}
              {product.sku && (
                <p className="text-xs text-on-surface-variant">
                  SKU:{" "}
                  <code className="font-mono text-primary">{product.sku}</code>
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={product.is_out_of_stock}
                    onClick={handleInstantBuy}
                    className="flex-1 py-4 px-6 rounded-2xl bg-primary text-on-primary font-label-md text-sm font-bold shadow-xl hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-lg">
                      bolt
                    </span>
                    <span>Instant Order ({formatBDT(product.price)})</span>
                  </button>
                  <button
                    type="button"
                    disabled={product.is_out_of_stock}
                    onClick={handleAddToCart}
                    className="sm:w-48 py-4 px-6 rounded-2xl bg-surface-container-high hover:bg-surface-bright border border-outline-variant/20 text-on-surface font-label-md text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-lg text-secondary">
                      shopping_bag
                    </span>
                    <span>Add to Bag</span>
                  </button>
                </div>

                {/* Delivery info */}
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">
                      local_shipping
                    </span>
                    <span>
                      Express dispatch via Pathao / Steadfast — Dhaka same-day
                      available
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-on-surface font-medium">COD</span>
                    <span className="text-outline-variant/50">•</span>
                    <span className="text-primary">bKash / Nagad</span>
                  </div>
                </div>
              </div>

              {/* Description (expanded) */}
              {product.description_bn && (
                <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15">
                  <h3 className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
                    বিবরণ (বাংলা)
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {product.description_bn}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Shop info banner */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-24">
          <Link
            href={`/shops/${product.shop_id}`}
            className="group flex items-center justify-between p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 hover:border-primary/30 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-xl">
                {product.shop_logo_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={product.shop_logo_url}
                    alt={product.shop_name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  product.shop_name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  {product.shop_name}
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  View all products from this shop
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
              arrow_forward
            </span>
          </Link>
        </section>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-highest shadow-2xl text-on-surface border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary text-2xl">
                check_circle
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold">
                  {toastMessage.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {toastMessage.subtitle}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
