"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "EPC-88291X";
  const gateway = searchParams.get("gateway") || "bkash";
  const zone = searchParams.get("zone") || "inside-dhaka";

  const [orderData, setOrderData] = useState<{
    customerName: string;
    phone: string;
    address: string;
    total: number;
    itemsCount: number;
  }>({
    customerName: "Riduan Hasan",
    phone: "+880 1712 904822",
    address: "House 42, Road 9/A, Dhanmondi, Dhaka",
    total: 8890,
    itemsCount: 1,
  });

  useEffect(() => {
    // Read from localStorage if available
    try {
      const saved = localStorage.getItem("epic_last_order");
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch {
      // fallback to defaults
    }
  }, []);

  const gatewayNames: Record<string, string> = {
    bkash: "bKash Smart Escrow",
    nagad: "Nagad Smart Escrow",
    cards: "Visa / Mastercard 3D Secure",
    cod: "Doorstep Open-Box Inspection (COD)",
  };

  return (
    <main className="w-full pt-28 pb-24 bg-background min-h-screen text-on-surface relative">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Success Header Card */}
        <div className="rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl border border-secondary/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary" />

          {/* Animated Success Emblem */}
          <div className="w-20 h-20 rounded-3xl bg-secondary/15 text-secondary border border-secondary/30 flex items-center justify-center mx-auto mb-6 shadow-inner animate-in zoom-in-50 duration-500">
            <span className="material-symbols-outlined text-4xl">
              verified
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-xs font-semibold mb-3 border border-secondary/30">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Escrow Vault Activated</span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-3">
            অর্ডার সফল হয়েছে!
          </h1>
          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto">
            আপনার কনসাইনমেন্ট <strong className="text-on-surface">#{orderId}</strong> সফলভাবে নথিভুক্ত হয়েছে এবং ফান্ড বাংলাদেশ ব্যাংকের অনুমোদিত এসক্রো ভল্টে সুরক্ষিত রাখা হয়েছে।
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/tracking?id=${orderId}`}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-bold text-sm shadow-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                near_me
              </span>
              <span>Track Live Fleet Telemetry</span>
            </Link>

            <Link
              href="/products"
              className="px-6 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-all border border-outline-variant/15 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                shopping_bag
              </span>
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* 15-Minute Unboxing Guarantee Banner */}
        <div className="mt-8 rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-outline-variant/15 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">
                timer
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                ১৫ মিনিট ওপেন-বক্স যাচাই গ্যারান্টি
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                রাইডারের উপস্থিতিতে পার্সেল খুলে যাচাই করুন। সন্তুষ্ট না হলে তাৎক্ষণিক ফ্রি রিটার্ন।
              </p>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary font-label-sm text-xs font-semibold shrink-0">
            Zero Merchant Risk
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dispatch & Address */}
          <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/15 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  local_shipping
                </span>
                ডেলিভারি তথ্য
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-medium">
                {zone === "outside-dhaka" ? "Steadfast 24-48h" : "Dhaka Hyperlocal 4-Hour"}
              </span>
            </div>

            <div className="space-y-2 text-xs font-body-sm text-on-surface-variant">
              <div>
                <span className="text-on-surface-variant/70 block">প্রাপক:</span>
                <span className="text-on-surface font-semibold text-sm">
                  {orderData.customerName}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant/70 block">ফোন নম্বর:</span>
                <span className="text-on-surface font-medium">
                  {orderData.phone}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant/70 block">ঠিকানা:</span>
                <span className="text-on-surface font-medium">
                  {orderData.address}
                </span>
              </div>
            </div>
          </div>

          {/* Payment & Vault Status */}
          <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-md border border-outline-variant/15 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">
                  shield
                </span>
                এসক্রো ও পেমেন্ট
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold">
                100% Escrow Hold
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-body-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">পেমেন্ট মেথড:</span>
                <span className="text-on-surface font-semibold">
                  {gatewayNames[gateway] || "bKash Smart Escrow"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">এসক্রো স্ট্যাটাস:</span>
                <span className="text-secondary font-semibold">
                  Vault Locked (Motijheel BB-04)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">মোট পরিশোধিত:</span>
                <span className="text-on-surface font-bold text-sm">
                  ৳{orderData.total.toLocaleString("bn-BD")}
                </span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>মার্চেন্ট পে-আউট:</span>
                <span>OTP ভেরিফিকেশনের পর</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security / BB Notice */}
        <div className="mt-8 p-4 rounded-xl bg-surface-container/40 border border-outline-variant/10 text-center text-xs text-on-surface-variant/70">
          Bangladesh Bank Circular #PSD 02/2021 Compliant • Automated escrow dispute resolution protected by Xeni Smart Escrow Network.
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="w-full pt-28 pb-20 bg-background min-h-screen text-center">
          <div className="max-w-md mx-auto p-8 rounded-2xl bg-surface-container animate-pulse">
            <div className="h-12 w-12 mx-auto bg-surface-container-high rounded-full mb-4" />
            <div className="h-6 w-48 mx-auto bg-surface-container-high rounded mb-2" />
          </div>
        </main>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
