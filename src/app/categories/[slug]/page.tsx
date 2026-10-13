"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { useProducts } from "@/hooks/useApi";
import { enrichApiProduct } from "@/lib/productAdapter";
import { getAllProducts as getMockProducts } from "@/lib/products";
import type { Product } from "@/types";
import type { ProductCatalogItem } from "@/lib/products";

const CATEGORY_META: Record<string, { title: string; icon: string; description: string; accent: string }> = {
  "flagship-audio": {
    title: "Flagship Audio",
    icon: "headphones",
    description: "Studio-grade earphones, headphones, and portable DACs — certified Hi-Res audio for audiophiles.",
    accent: "text-primary",
  },
  "tech-hub": {
    title: "Tech Hub",
    icon: "devices",
    description: "Premium keyboards, chargers, smart devices, and cutting-edge tech accessories from verified sellers.",
    accent: "text-secondary",
  },
  "heritage-textiles": {
    title: "Heritage Textiles",
    icon: "checkroom",
    description: "Hand-woven Tangail sarees, Jamdani, and heritage cotton textiles — GI-certified craftsmanship from Bengal.",
    accent: "text-tertiary",
  },
  "skincare": {
    title: "Skincare",
    icon: "spa",
    description: "Clinical-grade ampoules, serums, and barrier repair formulations — dermatologist-tested, EWG-verified.",
    accent: "text-secondary",
  },
};

function slugToCategory(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CategoryPage() {
  const routeParams = useParams();
  const slug = (routeParams?.slug as string) || "";
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  const meta = CATEGORY_META[slug];
  const categoryName = meta?.title ?? slugToCategory(slug);

  const [sortBy, setSortBy] = useState<string>("featured");

  const { data, isLoading } = useProducts({ per_page: 100 });

  const allProducts: ProductCatalogItem[] = useMemo(() => {
    if (data?.data && data.data.length > 0) {
      return data.data.map(enrichApiProduct);
    }
    return getMockProducts();
  }, [data]);

  const filteredProducts = useMemo(() => {
    const result = allProducts.filter(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, slug, sortBy]);

  const allCategories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats).map((c) => ({
      name: c,
      slug: c.toLowerCase().replace(/\s+/g, "-"),
    }));
  }, [allProducts]);

  const handleAddToCart = (product: ProductCatalogItem) => {
    const cartProduct: Product = {
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
      images: product.images && product.images.length > 0 ? product.images : product.gallery.map((g) => g.url),
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
    addItem(cartProduct);
    openCart();
  };

  const formatBDT = (amount: number) => "৳" + amount.toLocaleString("en-BD");

  return (
    <main className="w-full pt-24 bg-background min-h-screen text-on-surface">
      <div className="flex flex-col w-full">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-4 pb-8">
          <nav className="flex items-center gap-2.5 font-label-sm text-xs tracking-wide text-on-surface-variant/70 mb-6">
            <Link href="/" className="hover:text-on-surface transition-colors">Marketplace</Link>
            <span className="text-outline-variant/60">/</span>
            <Link href="/products" className="hover:text-on-surface transition-colors">Categories</Link>
            <span className="text-outline-variant/60">/</span>
            <span className="text-on-surface font-medium">{categoryName}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-start gap-4">
              {meta && (
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined text-2xl ${meta.accent}`}>
                    {meta.icon}
                  </span>
                </div>
              )}
              <div>
                <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold">
                  {categoryName}
                </h1>
                {meta && (
                  <p className="text-sm text-on-surface-variant mt-2 max-w-xl">
                    {meta.description}
                  </p>
                )}
                <p className="text-xs text-on-surface-variant/70 mt-1">
                  {isLoading ? "Loading products..." : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none">
                unfold_more
              </span>
            </div>
          </div>
        </section>

        {/* Category Chips */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Link
              href="/products"
              className="px-4 py-2 rounded-full text-xs font-bold shrink-0 bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant shadow-sm transition-all"
            >
              All
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                  cat.slug === slug
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant shadow-sm"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 w-full pb-24">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
                category
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                No products in this category
              </h3>
              <p className="text-sm text-on-surface-variant max-w-md">
                We don&apos;t have any products in &ldquo;{categoryName}&rdquo; yet. Browse other categories!
              </p>
              <Link
                href="/products"
                className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold hover:brightness-105 transition-all"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const imageUrl =
                  product.gallery?.[0]?.url ||
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
                          src={imageUrl}
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-xl border border-outline-variant/20 text-[11px] font-medium text-on-surface">
                            <span
                              className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                                product.badge_variant === "primary"
                                  ? "bg-primary"
                                  : product.badge_variant === "tertiary"
                                  ? "bg-tertiary"
                                  : "bg-secondary"
                              }`}
                            />
                            {product.badge}
                          </span>
                        )}
                      </Link>

                      <div className="space-y-1.5 px-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-secondary font-semibold uppercase tracking-wider">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <span
                              className="material-symbols-outlined text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            <span className="text-on-surface font-semibold text-xs">{product.rating}</span>
                            <span className="text-on-surface-variant/50">({product.reviews_count})</span>
                          </div>
                        </div>
                        <Link
                          href={`/product/${product.id}`}
                          className="block font-headline-sm text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                        >
                          {product.name}
                        </Link>
                        <span className="text-[11px] text-on-surface-variant block">{product.stock_label}</span>
                      </div>
                    </div>

                    <div className="pt-4 px-1 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-currency-display text-base font-bold text-on-surface">
                          {formatBDT(product.price)}
                        </span>
                        {product.original_price && (
                          <span className="text-[11px] text-on-surface-variant/60 line-through">
                            {formatBDT(product.original_price)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="px-3.5 py-2 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-semibold text-on-surface transition-all flex items-center gap-1 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
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
