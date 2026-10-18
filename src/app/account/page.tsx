"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/stores/wishlistStore";
import { authService } from "@/services/authService";

interface OrderRecord {
  id: string;
  date: string;
  items: string;
  total: number;
  status: "In Transit" | "Delivered" | "Escrow Secured";
  statusColor: string;
  gateway: string;
  trackingId: string;
}

interface StoredOrder {
  orderId: string;
  itemsCount: number;
  total: number;
  gateway: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { itemCount: getWishlistCount } = useWishlistStore();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "escrow" | "profile">("orders");
  const [lastOrder, setLastOrder] = useState<StoredOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof authService.getStoredUser>>(null);

  useEffect(() => {
    setCurrentUser(authService.getStoredUser());
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("epic_last_order");
      if (saved) {
        setLastOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const initialOrders: OrderRecord[] = [
    ...(lastOrder
      ? [
          {
            id: lastOrder.orderId,
            date: "আজকে, " + new Date().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }),
            items: `${lastOrder.itemsCount || 1}টি পণ্য (সিল্ড পার্সেল)`,
            total: lastOrder.total,
            status: "In Transit" as const,
            statusColor: "text-secondary bg-secondary/15 border-secondary/30",
            gateway: lastOrder.gateway === "bkash" ? "bKash Smart Escrow" : lastOrder.gateway === "nagad" ? "Nagad Escrow" : "Safe Inspection COD",
            trackingId: lastOrder.orderId,
          },
        ]
      : []),
    {
      id: "EPC-73918A",
      date: "০৮ অক্টোবর ২০২৬",
      items: "Phantom RGB 75% Mechanical Keyboard • Space Gray",
      total: 3410,
      status: "Delivered" as const,
      statusColor: "text-primary bg-primary/15 border-primary/30",
      gateway: "bKash Smart Escrow",
      trackingId: "EPC-73918A",
    },
    {
      id: "EPC-61204B",
      date: "২৫ সেপ্টেম্বর ২০২৬",
      items: "VoltPrime 65W GaN Charger • Matte Black",
      total: 1970,
      status: "Delivered" as const,
      statusColor: "text-primary bg-primary/15 border-primary/30",
      gateway: "Nagad Smart Escrow",
      trackingId: "EPC-61204B",
    },
  ];

  return (
    <main className="w-full pt-28 pb-24 bg-background min-h-screen text-on-surface relative">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[130px] pointer-events-none" />

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
          <span className="text-primary font-medium">Customer Dashboard</span>
        </nav>

        {/* Profile Card Header */}
        <div className="rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl border border-outline-variant/15 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-tertiary p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full bg-surface-container-lowest rounded-[14px] flex items-center justify-center text-primary font-bold text-2xl">
                    RH
                  </div>
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow"
                  title="Verified Smart Escrow Member"
                >
                  <span className="material-symbols-outlined text-xs font-bold">
                    verified
                  </span>
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-headline-xl text-2xl font-bold text-on-surface">
                    {currentUser?.full_name || "Guest Customer"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-[11px] font-semibold border border-secondary/20">
                    Smart Escrow Verified
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-3">
                  <span>{currentUser?.email || "riduan@example.com"}</span>
                  {currentUser && (
                    <button
                      onClick={async () => {
                        await authService.logout();
                        router.push("/");
                        window.location.reload();
                      }}
                      className="text-xs text-error hover:underline flex items-center gap-1 font-medium"
                    >
                      <span className="material-symbols-outlined text-xs">logout</span>
                      Log Out
                    </button>
                  )}
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs text-on-surface-variant/80">
                  <span className="flex items-center gap-1 text-secondary">
                    <span className="material-symbols-outlined text-sm">shield</span>
                    <span>100% Escrow Protection Active</span>
                  </span>
                  <span>•</span>
                  <span>Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill Counters */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="p-3.5 rounded-2xl bg-surface-container-high/60 border border-outline-variant/10 text-center">
                <span className="text-xl font-bold text-on-surface block font-currency-display">
                  {initialOrders.length}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Orders
                </span>
              </div>

              <Link
                href="/wishlist"
                className="p-3.5 rounded-2xl bg-surface-container-high/60 hover:bg-surface-container-high border border-outline-variant/10 text-center transition-colors"
              >
                <span className="text-xl font-bold text-primary block font-currency-display">
                  {getWishlistCount()}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Wishlist
                </span>
              </Link>

              <div className="p-3.5 rounded-2xl bg-surface-container-high/60 border border-outline-variant/10 text-center">
                <span className="text-xl font-bold text-secondary block font-currency-display">
                  ০%
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Dispute
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 pt-6 border-t border-outline-variant/10 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {[
              { id: "orders" as const, label: "অর্ডার হিস্ট্রি ও ট্র্যাকিং", icon: "package_2" },
              { id: "addresses" as const, label: "ডেলিভারি ঠিকানা", icon: "location_on" },
              { id: "escrow" as const, label: "এসক্রো ভল্ট ও সুরক্ষা", icon: "security" },
              { id: "profile" as const, label: "প্রোফাইল সেটিংস", icon: "person" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === "orders" && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                আপনার সাম্প্রতিক অর্ডারসমূহ
              </h2>
              <span className="text-xs text-on-surface-variant">
                Showing {initialOrders.length} consignments
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {initialOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/15 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-on-surface">
                          #{order.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        অর্ডার তারিখ: {order.date}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[11px] text-on-surface-variant block">
                        পরিশোধিত অর্থ ({order.gateway})
                      </span>
                      <span className="font-currency-display text-lg font-bold text-on-surface">
                        ৳{order.total.toLocaleString("bn-BD")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-on-surface">
                        {order.items}
                      </p>
                      <p className="text-[11px] text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>15-Minute Doorstep Inspection Guarantee Gated</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tracking?id=${order.trackingId}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary text-xs font-bold shadow transition-all flex items-center gap-1.5 hover:brightness-105"
                      >
                        <span className="material-symbols-outlined text-base">
                          near_me
                        </span>
                        <span>Track Live Fleet</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => showToast(`Invoice #${order.id} downloaded`)}
                        className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                        title="Download Receipt"
                      >
                        <span className="material-symbols-outlined text-base">
                          description
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === "addresses" && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                সংরক্ষিত ডেলিভারি ঠিকানা
              </h2>
              <button
                type="button"
                onClick={() => showToast("Add Address modal opened")}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address 1 */}
              <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-primary/30 shadow-md space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">
                      home
                    </span>
                    <span className="text-xs font-bold text-on-surface">
                      বাসা (Primary)
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
                    ঢাকা সিটির ভিতরে (৳১২০)
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <p className="text-on-surface font-semibold">Riduan Hasan</p>
                  <p>+880 1712 904822</p>
                  <p>House 42, Road 9/A, Dhanmondi, Dhaka - 1209</p>
                </div>
                <div className="pt-2 border-t border-outline-variant/10 flex items-center gap-2">
                  <span className="text-[11px] text-secondary font-medium">Default Address</span>
                </div>
              </div>

              {/* Address 2 */}
              <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/15 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">
                      apartment
                    </span>
                    <span className="text-xs font-bold text-on-surface">
                      অফিস
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold">
                    ঢাকা সিটির ভিতরে (৳১২০)
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <p className="text-on-surface font-semibold">Riduan Hasan</p>
                  <p>+880 1712 904822</p>
                  <p>Floor 5, Tower 11, Road 11, Banani, Dhaka - 1213</p>
                </div>
                <div className="pt-2 border-t border-outline-variant/10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast("Office set as default")}
                    className="text-[11px] text-primary hover:underline font-medium"
                  >
                    Set as Default
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Escrow Vault & Security */}
        {activeTab === "escrow" && (
          <div className="mt-8 space-y-6">
            <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-secondary/30 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">
                    verified_user
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Xeni Smart Escrow Trust Shield Active
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Bangladesh Bank PSD Circular #02/2021 Compliant Vault
                  </p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                আপনার প্রতিটি অনলাইন কেনাকাটার অর্থ সরাসরি কোনো বিক্রেতার হাতে পৌঁছায় না। এটি একটি নিরপেক্ষ ডিজিটাল এসক্রো ট্রাস্টে জমা থাকে যতক্ষণ না আপনি ডেলিভারিম্যানের সামনে পণ্য যাচাই করে ডেলিভারি ওটিপি দিচ্ছেন। কোনো সমস্যা হলে ১০ মিনিটের মধ্যে শতভাগ অর্থ ফেরত পাওয়ার নিশ্চয়তা রয়েছে।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 space-y-1.5">
                <span className="material-symbols-outlined text-secondary text-xl">
                  lock_clock
                </span>
                <h4 className="text-xs font-bold text-on-surface">১৫-মিনিট যাচাই উইন্ডো</h4>
                <p className="text-[11px] text-on-surface-variant">রাইডারের সামনে পার্সেল ওপেন করে সন্তুষ্ট হওয়ার অধিকার।</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 space-y-1.5">
                <span className="material-symbols-outlined text-primary text-xl">
                  bolt
                </span>
                <h4 className="text-xs font-bold text-on-surface">১০-মিনিট রিফান্ড ইঞ্জিন</h4>
                <p className="text-[11px] text-on-surface-variant">পণ্য পছন্দ না হলে তাৎক্ষণিক আপনার ওয়ালেটে সম্পূর্ণ রিফান্ড।</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10 space-y-1.5">
                <span className="material-symbols-outlined text-tertiary text-xl">
                  gavel
                </span>
                <h4 className="text-xs font-bold text-on-surface">মার্চেন্ট জামানত বন্ড</h4>
                <p className="text-[11px] text-on-surface-variant">প্রতিটি ভেরিফাইড সেলারের ৫,০০,০০০ টাকার নিরাপত্তা বন্ড সংরক্ষিত।</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === "profile" && (
          <div className="mt-8 p-6 rounded-2xl bg-surface-container-low/70 border border-outline-variant/15 shadow-md space-y-6 max-w-xl">
            <h2 className="font-headline-sm text-base font-bold text-on-surface">
              ব্যক্তিগত তথ্য ও নিরাপত্তা
            </h2>
            <div className="space-y-4 text-xs font-body-sm">
              <div>
                <label className="block text-on-surface-variant uppercase font-semibold mb-1">
                  পুরো নাম
                </label>
                <input
                  type="text"
                  defaultValue="Riduan Hasan"
                  className="w-full bg-surface-container py-3 px-4 rounded-xl text-on-surface border border-outline-variant/15 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-on-surface-variant uppercase font-semibold mb-1">
                  ফোন নম্বর
                </label>
                <input
                  type="tel"
                  defaultValue="+880 1712 904822"
                  className="w-full bg-surface-container py-3 px-4 rounded-xl text-on-surface border border-outline-variant/15 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-on-surface-variant uppercase font-semibold mb-1">
                  ইমেইল ঠিকানা
                </label>
                <input
                  type="email"
                  defaultValue="riduan@example.com"
                  className="w-full bg-surface-container py-3 px-4 rounded-xl text-on-surface border border-outline-variant/15 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <button
                type="button"
                onClick={() => showToast("Profile settings saved successfully")}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md transition-all hover:brightness-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
