"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { useShop } from "@/hooks/useApi";
import type { PublicProduct } from "@/types/api";
import type { Product } from "@/types";

export default function ShopPage() {
  const routeParams = useParams();
  const id = (routeParams?.id as string) || "";
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  const { data: shop, isLoading, isError } = useShop(id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    setToastMessage(`${product.name} added to bag`);
    setTimeout(() => setToastMessage(null), 3000);
    openCart();
  };

  const formatBDT = (amount: number) => "৳" + amount.toLocaleString("en-BD");

  // Derive initials from shop name
  const initials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join("");

  // ── Loading ──
  if (isLoading) {
    return (
      <main className="w-full pt-24 bg-background min-h-screen text-on-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-24 space-y-8 animate-pulse">
          <div className="h-48 rounded-3xl bg-surface-container-high" />
          <div className="h-8 w-56 bg-surface-container-high rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-surface-container-low p-4 space-y-4"
              >
                <div className="w-full aspect-square rounded-2xl bg-surface-container-high" />
                <div className="h-3 w-3/4 bg-surface-container-high rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ── Error / Not found ──
  if (isError || !shop) {
    return (
      <main className="w-full pt-24 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">
            storefront
          </span>
          <div>
            <h1 className="text-2xl font-bold text-on-surface mb-2">
              Shop Not Found
            </h1>
            <p className="text-on-surface-variant text-sm">
              The shop &ldquo;{id}&rdquo; does not exist in our marketplace.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-semibold text-sm hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Back to Marketplace
          </Link>
        </div>
      </main>
    );
  }

  const shopProducts = shop.products ?? [];

  return (
    <main className="w-full pt-24 bg-background min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-4">
          <nav className="flex items-center gap-2.5 font-label-sm text-xs tracking-wide text-on-surface-variant/70 mb-6">
            <Link href="/" className="hover:text-on-surface transition-colors">
              Marketplace
            </Link>
            <span className="text-outline-variant/60">/</span>
            <span className="text-on-surface font-medium">{shop.shop_name}</span>
          </nav>
        </section>

        {/* Shop Hero */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-10">
          <div className="rounded-3xl overflow-hidden bg-surface-container-low border border-outline-variant/15 shadow-xl">
            {/* Cover */}
            <div className="relative w-full aspect-[4/1] bg-gradient-to-br from-primary/20 via-secondary/15 to-tertiary/20 flex items-center justify-center overflow-hidden">
              {shop.shop_banner_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className="w-full h-full object-cover"
                  alt={`${shop.shop_name} cover banner`}
                  src={shop.shop_banner_url}
                />
              ) : shop.shop_logo_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className="w-full h-full object-cover opacity-30"
                  alt={`${shop.shop_name} cover`}
                  src={shop.shop_logo_url}
                />
              ) : (
                <span className="text-on-surface/10 font-bold text-9xl select-none">
                  {initials(shop.shop_name)}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent" />
            </div>

            {/* Shop Info */}
            <div className="relative px-6 sm:px-10 pb-8 -mt-10 sm:-mt-14">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center font-headline-xl text-2xl sm:text-3xl font-bold shadow-xl border-4 border-surface-container-low text-on-primary shrink-0">
                  {shop.shop_logo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={shop.shop_logo_url}
                      alt={shop.shop_name}
                      className="w-full h-full object-cover rounded-[20px]"
                    />
                  ) : (
                    initials(shop.shop_name)
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-extrabold">
                      {shop.shop_name}
                    </h1>
                    <span className="material-symbols-outlined text-primary text-xl">
                      verified
                    </span>
                  </div>
                  {shop.district && (
                    <p className="text-sm text-on-surface-variant flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-secondary">
                        location_on
                      </span>
                      {shop.district}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <span className="text-on-surface font-bold text-lg block">
                      {shop.total_products}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Products
                    </span>
                  </div>
                  <div className="w-px h-10 bg-outline-variant/20" />
                  <div className="text-center">
                    <span className="text-on-surface font-bold text-sm block">
                      {shop.courier_preference || "Pathao / Steadfast"}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Courier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Details Bar */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About */}
            <div className="md:col-span-2 p-6 rounded-2xl bg-surface-container-low/70 border border-outline-variant/15">
              <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-3">
                About This Shop
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {shop.shop_description || `Welcome to ${shop.shop_name}! Browse our curated collection of quality products with guaranteed delivery across Bangladesh.`}
              </p>
            </div>

            {/* Delivery Info */}
            <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-outline-variant/15 space-y-4">
              <h3 className="text-xs font-bold text-primary tracking-widest uppercase">
                Delivery Info
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-base">
                      location_city
                    </span>
                    <span>Inside Dhaka</span>
                  </div>
                  <span className="font-semibold text-on-surface">
                    {formatBDT(shop.delivery_charge_inside)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-tertiary text-base">
                      local_shipping
                    </span>
                    <span>Outside Dhaka</span>
                  </div>
                  <span className="font-semibold text-on-surface">
                    {formatBDT(shop.delivery_charge_outside)}
                  </span>
                </div>

                {/* Payment methods */}
                <div className="pt-2 border-t border-outline-variant/15 space-y-1.5">
                  {shop.bkash_merchant_number && (
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-[#E2136E]" />
                      bKash: {shop.bkash_merchant_number}
                    </div>
                  )}
                  {shop.nagad_merchant_number && (
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-[#F7921E]" />
                      Nagad: {shop.nagad_merchant_number}
                    </div>
                  )}
                  {!shop.bkash_merchant_number && !shop.nagad_merchant_number && (
                    <div className="text-[11px] text-on-surface-variant">
                      Cash on Delivery accepted
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Products */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase">
                Shop Collection
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-extrabold mt-1">
                Products by {shop.shop_name}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {shopProducts.length} product{shopProducts.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          {shopProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
                inventory_2
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                No products listed yet
              </h3>
              <p className="text-sm text-on-surface-variant max-w-md">
                This shop hasn&apos;t listed any active products yet. Check back
                soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shopProducts.map((product) => {
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
                      </Link>

                      <div className="space-y-1.5 px-1">
                        <Link
                          href={`/product/${product.id}`}
                          className="block font-headline-sm text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                        >
                          {product.name}
                        </Link>
                        {product.name_bn && (
                          <p className="text-[11px] text-on-surface-variant/70 line-clamp-1">
                            {product.name_bn}
                          </p>
                        )}
                        {product.total_sold > 0 && (
                          <span className="text-[11px] text-on-surface-variant">
                            {product.total_sold} sold
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 px-1 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-currency-display text-base font-bold text-on-surface">
                          {formatBDT(product.price)}
                        </span>
                      </div>
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

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-highest shadow-2xl text-on-surface border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary text-2xl">
                check_circle
              </span>
              <span className="font-label-md text-sm font-bold">
                {toastMessage}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
