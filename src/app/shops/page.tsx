"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useShops } from "@/hooks/useApi";
import type { PublicShop } from "@/types/api";

const DISTRICT_FILTERS = [
  "All Regions",
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Rangpur",
];

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Regions");

  const { data, isLoading, isError } = useShops({
    per_page: 50,
    q: searchQuery.trim() || undefined,
  });

  const shops = data?.data ?? [];

  const filteredShops = useMemo(() => {
    if (selectedDistrict === "All Regions") {
      return shops;
    }
    return shops.filter(
      (s) =>
        s.district?.toLowerCase() === selectedDistrict.toLowerCase() ||
        (!s.district && selectedDistrict === "Dhaka")
    );
  }, [shops, selectedDistrict]);

  const initials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join("");

  return (
    <main className="w-full pt-28 pb-24 bg-background min-h-screen text-on-surface relative">
      {/* Ambient decorative gradients */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2.5 font-label-sm text-xs tracking-wide text-on-surface-variant/70 mb-6">
          <Link href="/" className="hover:text-on-surface transition-colors">
            Marketplace
          </Link>
          <span className="text-outline-variant/60">/</span>
          <span className="text-on-surface font-medium">Boutiques & Brand Studios</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-outline-variant/15">
          <div>
            <span className="text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-1.5 mb-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              Official Merchant Directory
            </span>
            <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-extrabold tracking-tight">
              Verified Boutiques & Studios
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xl">
              Discover authentic Bangladeshi brands and verified flagship stores directly powered by Xeni Commerce. Guaranteed escrow delivery across all 64 districts.
            </p>
          </div>

          {/* Search box */}
          <div className="w-full md:w-80 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search boutique or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:border-primary/50 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Region Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {DISTRICT_FILTERS.map((district) => (
            <button
              key={district}
              onClick={() => setSelectedDistrict(district)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                selectedDistrict === district
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/10"
              }`}
            >
              {district}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-surface-container-low p-6 space-y-4 animate-pulse border border-outline-variant/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-32 bg-surface-container-high rounded" />
                    <div className="h-3 w-20 bg-surface-container-high rounded" />
                  </div>
                </div>
                <div className="aspect-[16/9] rounded-2xl bg-surface-container-high" />
                <div className="h-10 bg-surface-container-high rounded-full w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-3xl bg-surface-container-low p-12 text-center border border-outline-variant/15 my-8">
            <span className="material-symbols-outlined text-5xl text-error mb-3">
              error_outline
            </span>
            <h3 className="text-lg font-bold text-on-surface mb-1">
              Unable to load boutiques
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              There was an issue connecting to Xeni 2.0 gateway. Please check your network or try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-surface-container-high text-xs font-semibold text-on-surface hover:bg-surface-bright"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredShops.length === 0 && (
          <div className="rounded-3xl bg-surface-container-low p-16 text-center border border-outline-variant/15 my-8 space-y-4">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">
              storefront
            </span>
            <h3 className="text-xl font-bold text-on-surface">
              No Boutiques Found
            </h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              {searchQuery
                ? `No studios matching "${searchQuery}". Try searching with a different term.`
                : "New boutiques are currently onboarding with Xeni 2.0. Check back soon!"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2 rounded-full bg-surface-container-high text-xs font-semibold text-on-surface hover:bg-surface-bright"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Shop Grid */}
        {!isLoading && !isError && filteredShops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredShops.map((shop: PublicShop) => {
              const coverImage =
                shop.shop_banner_url ||
                shop.shop_logo_url ||
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDZwR2qdke35-YhmXDncKNWF4Hsp5lXyaDhGGxoXZX4J1TMRVoCx1gVlxA52-G6hoTuNJlMf6tLJA_qnrGjGpt6FtOizUoPvo7tenvfN4XXZwwO9nPwVrYdkbapNIGTmn-_0AWVH4Wm-XvPJdJMdqHgscOEf3ptSuSyWCWLjWx5lh4zKpoT9AwrADMjaz8pulJutH8jAu5fJAT6GFI1Yb4Y4el26FlMbtOZR2WRV7UxxFkzE3KEuVztdw";

              return (
                <div
                  key={shop.id}
                  className="group rounded-3xl bg-surface-container-low p-6 transition-all duration-300 shadow-lg hover:shadow-2xl border border-outline-variant/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Avatar, Name, District & Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center font-headline-sm text-sm font-bold text-on-surface shadow-sm overflow-hidden shrink-0 border border-outline-variant/20">
                          {shop.shop_logo_url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={shop.shop_logo_url}
                              alt={shop.shop_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            initials(shop.shop_name)
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1">
                              {shop.shop_name}
                            </h3>
                            <span className="material-symbols-outlined text-primary text-xs shrink-0">
                              verified
                            </span>
                          </div>
                          <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              location_on
                            </span>
                            {shop.district || "Dhaka"} • Official Merchant
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">
                          star
                        </span>
                        4.9
                      </span>
                    </div>

                    {/* Banner Cover */}
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container-lowest mb-4 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={shop.shop_name}
                        src={coverImage}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low/90 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Badge */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-[10px] font-semibold text-on-surface border border-outline-variant/20">
                        {shop.courier_preference ? `Via ${shop.courier_preference.toUpperCase()}` : "Fast Delivery"}
                      </div>
                    </div>

                    {/* Description if available */}
                    {shop.shop_description && (
                      <p className="text-xs text-on-surface-variant/80 line-clamp-2 mb-4">
                        {shop.shop_description}
                      </p>
                    )}

                    {/* Shipping Charges Info */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-surface-container-lowest/50 text-[11px] text-on-surface-variant mb-4">
                      <div>
                        <span className="block text-[10px] text-outline">Inside:</span>
                        <span className="font-semibold text-on-surface">৳{shop.delivery_charge_inside ?? 60}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-outline">Outside:</span>
                        <span className="font-semibold text-on-surface">৳{shop.delivery_charge_outside ?? 120}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Style count and CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                    <span className="text-xs text-on-surface-variant">
                      {shop.total_products > 0
                        ? `${shop.total_products} Available products`
                        : "Curated collection"}
                    </span>
                    <Link
                      href={`/shops/${shop.id}`}
                      className="px-5 py-2.5 rounded-full bg-primary hover:brightness-110 text-on-primary text-xs font-semibold transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>Visit Boutique</span>
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </Link>
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
