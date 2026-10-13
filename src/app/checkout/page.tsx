"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useCreateOrder } from "@/hooks/useApi";

type GatewayType = "bkash" | "nagad" | "cards" | "cod";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();

  const [selectedGateway, setSelectedGateway] = useState<GatewayType>("bkash");
  const [phoneNumber, setPhoneNumber] = useState("1712 904822");
  const [fullName, setFullName] = useState("Riduan Hasan");
  const [deliveryPhone, setDeliveryPhone] = useState("01712 904822");
  const [deliveryZone, setDeliveryZone] = useState<"inside-dhaka" | "outside-dhaka">("inside-dhaka");
  const [streetAddress, setStreetAddress] = useState("House 42, Road 9/A, Dhanmondi, Dhaka");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [consentChecked, setConsentChecked] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const createOrderMutation = useCreateOrder();

  const cartSubtotal = subtotal() > 0 ? subtotal() : 8650;
  const transitFee = deliveryZone === "inside-dhaka" ? 120 : 240;
  const cashback = selectedGateway === "bkash" ? 450 : selectedGateway === "nagad" ? 300 : 0;
  const netPayable = cartSubtotal + transitFee - cashback;

  const handleSelectGateway = (type: GatewayType) => {
    setSelectedGateway(type);
  };

  const handleExecuteVault = async () => {
    if (!consentChecked) {
      alert("Please acknowledge the Xeni Smart Escrow terms to proceed.");
      return;
    }

    if (!fullName.trim() || !streetAddress.trim() || !deliveryPhone.trim()) {
      alert("Please provide your name, phone number, and delivery address.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsProcessing(true);
    setOrderError(null);
    setFeedbackMessage("Vault lock initialised. Handing over to encrypted channel...");

    // Map gateway type to Xeni 2.0 payment_method values
    const paymentMethod: "bkash" | "nagad" | "cod" =
      selectedGateway === "bkash"
        ? "bkash"
        : selectedGateway === "nagad"
        ? "nagad"
        : "cod"; // cards and cod both map to cod (physical payment)

    // Group cart items — use the most-common shop_id as the primary shop
    const shopIdCounts = items.reduce<Record<string, number>>((acc, item) => {
      acc[item.product.shop_id] = (acc[item.product.shop_id] || 0) + 1;
      return acc;
    }, {});
    const primaryShopId = Object.entries(shopIdCounts).sort(
      ([, a], [, b]) => b - a
    )[0][0];

    // Build order address string
    const fullAddress = `${streetAddress}${deliveryZone === "outside-dhaka" ? " (Outside Dhaka)" : ""}`;

    try {
      const result = await createOrderMutation.mutateAsync({
        shop_id: primaryShopId,
        customer_name: fullName.trim(),
        customer_phone: deliveryPhone.replace(/\s/g, ""),
        customer_address: fullAddress.trim(),
        payment_method: paymentMethod,
        payment_trx_id:
          selectedGateway !== "cod" && selectedGateway !== "cards"
            ? phoneNumber.replace(/\s/g, "")
            : undefined,
        notes: deliveryNotes || undefined,
        order_items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price + (item.selectedVariant?.price_modifier ?? 0),
          name: item.product.name,
          variant_id: item.selectedVariant?.id,
        })),
      });

      // Success — save to local storage for confirmation page
      try {
        localStorage.setItem(
          "epic_last_order",
          JSON.stringify({
            orderId: result.order_id,
            customerName: fullName,
            phone: deliveryPhone,
            address: streetAddress,
            zone: deliveryZone,
            gateway: selectedGateway,
            total: result.total_amount,
            itemsCount: items.length,
            paymentStatus: result.payment_status,
            deliveryStatus: result.delivery_status,
            createdAt: result.created_at,
          })
        );
      } catch {
        // ignore localStorage errors
      }

      setFeedbackMessage("✅ Order placed! Redirecting to confirmation...");
      clearCart();
      setTimeout(() => {
        router.push(
          `/order/confirmation?id=${result.order_id}&gateway=${selectedGateway}&zone=${deliveryZone}`
        );
      }, 700);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Order placement failed. Please check your connection and try again.";
      setOrderError(message);
      setFeedbackMessage(null);
      setIsProcessing(false);
    }
  };

  return (
    <main className="w-full bg-background relative min-h-screen pt-24 text-on-surface">
      <div className="flex flex-col w-full">
        {/* Top Atmospheric Glow Backdrop Elements */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 pt-4 pb-20 relative z-10">
            {/* Breadcrumbs & Live Node Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
              <nav className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant/70">
                <Link href="/" className="hover:text-on-surface transition-colors">
                  E-Pic
                </Link>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="hover:text-on-surface transition-colors">
                  Consignment #EPC-88291X
                </span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="text-primary font-medium">Smart Escrow Vault</span>
              </nav>

              <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-surface-container-high/60 backdrop-blur-md shadow-sm border border-outline-variant/15">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                </span>
                <span className="font-label-sm text-label-sm text-on-surface tracking-wider uppercase">
                  Xeni Mesh Node: Motijheel BB-04 Active
                </span>
              </div>
            </div>

            {/* Trust Header & National Compliance Callout */}
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/15 text-secondary font-label-sm text-label-sm uppercase tracking-widest border border-secondary/20">
                <span className="material-symbols-outlined text-sm">
                  shield_with_heart
                </span>
                <span>Zero Merchant Advance Risk</span>
              </div>
              <h1 className="font-display-lg text-3xl sm:text-5xl text-on-surface tracking-tight font-extrabold leading-tight">
                নিরাপদ এসক্রো পেমেন্ট ভল্ট
                <span className="block text-primary text-2xl sm:text-3xl font-normal opacity-90 mt-1">
                  Protected Escrow Settlement Protocol
                </span>
              </h1>
              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                আপনার পেমেন্ট সরাসরি সেলারের একাউন্টে যায় না। এটি বাংলাদেশ ব্যাংকের অনুমোদিত এসক্রো ভল্টে সম্পূর্ণ সুরক্ষিত থাকবে যতক্ষণ না ডেলিভারিম্যান সামনে রেখে ১৫ মিনিটের পণ্য যাচাই ও সন্তুষ্টি নিশ্চিত করছেন।
              </p>
            </div>

            {/* Order Allocation Summary Banner */}
            <div className="mt-10 rounded-2xl bg-surface-container/70 backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-outline-variant/15">
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                <div className="md:col-span-4 space-y-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                    Payable Settlement Total
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-currency-display text-on-surface font-extrabold text-4xl tracking-tight">
                      ৳{netPayable.toLocaleString("bn-BD")}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant/80">
                      BDT (All Taxes & Logistics Incl.)
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-secondary flex items-center gap-1.5 pt-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    <span>Protected under 7-Day Buyer Inspection Window</span>
                  </p>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                      Hold Guarantee
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold block">
                      100% Escrow
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      BB Circular #PSD 02/2021
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                      Merchant Payout
                    </span>
                    <span className="font-headline-sm text-headline-sm text-tertiary font-semibold block">
                      After Sign-off
                    </span>
                    <span className="text-[11px] text-on-surface-variant/70">
                      OTP Verification Gated
                    </span>
                  </div>
                </div>

                <div className="md:col-span-3 flex md:flex-col justify-between md:justify-center items-end text-right space-y-2">
                  <div className="text-right">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">
                      Consignment Tracking
                    </span>
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      EPC-88291X • Dhanmondi 9/A
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                    <span className="material-symbols-outlined text-xs">
                      local_shipping
                    </span>
                    Hyperlocal 4-Hour Slot
                  </span>
                </div>
              </div>
            </div>

            {/* Main Layout: Gateway Selector (Left) + Interactive Settlement Card (Right) */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Delivery Address & Gateway Options Column */}
              <div className="lg:col-span-7 space-y-6">
                {/* Delivery Address Form Card */}
                <div className="rounded-2xl p-6 bg-surface-container/60 backdrop-blur-xl border border-outline-variant/15 shadow-md space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        local_shipping
                      </span>
                      <h2 className="font-headline-sm text-lg text-on-surface font-bold">
                        ডেলিভারি ঠিকানা ও তথ্য
                      </h2>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-semibold">
                      Doorstep Dispatch
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                        প্রাপকের নাম
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full bg-surface-container py-3 px-4 rounded-xl text-on-surface font-body-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 border border-outline-variant/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                        যোগাযোগের নম্বর
                      </label>
                      <input
                        type="tel"
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-surface-container py-3 px-4 rounded-xl text-on-surface font-body-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 border border-outline-variant/15"
                      />
                    </div>
                  </div>

                  {/* Delivery Zone Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                      ডেলিভারি জোন (অটো-ক্যালকুলেশন)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setDeliveryZone("inside-dhaka")}
                        className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                          deliveryZone === "inside-dhaka"
                            ? "bg-surface-container-high/90 border-primary ring-1 ring-primary/40 shadow-sm"
                            : "bg-surface-container/40 border-outline-variant/15 hover:bg-surface-container-high/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery-zone"
                          checked={deliveryZone === "inside-dhaka"}
                          onChange={() => setDeliveryZone("inside-dhaka")}
                          className="mt-1 accent-primary"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-on-surface">ঢাকা সিটির ভিতরে</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary/15 text-secondary font-bold">৳১২০</span>
                          </div>
                          <span className="text-[11px] text-on-surface-variant block mt-0.5">
                            Hyperlocal 4-Hour / Same-Day Delivery
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => setDeliveryZone("outside-dhaka")}
                        className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                          deliveryZone === "outside-dhaka"
                            ? "bg-surface-container-high/90 border-primary ring-1 ring-primary/40 shadow-sm"
                            : "bg-surface-container/40 border-outline-variant/15 hover:bg-surface-container-high/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery-zone"
                          checked={deliveryZone === "outside-dhaka"}
                          onChange={() => setDeliveryZone("outside-dhaka")}
                          className="mt-1 accent-primary"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-on-surface">ঢাকার বাইরে (সারাদেশ)</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/15 text-primary font-bold">৳২৪০</span>
                          </div>
                          <span className="text-[11px] text-on-surface-variant block mt-0.5">
                            Steadfast / Pathao 24-48h Insured
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      পূর্ণাঙ্গ ঠিকানা (বাসা/রোড/এলাকা)
                    </label>
                    <textarea
                      rows={2}
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="বাড়ি নম্বর, রোড নম্বর, এলাকা, থানা ও জেলা লিখুন..."
                      className="w-full bg-surface-container py-3 px-4 rounded-xl text-on-surface font-body-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 border border-outline-variant/15 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      রাইডারের জন্য স্পেশাল নোট (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="যেমন: গেটে এসে কল দিন, লিফটের ৫ তলা..."
                      className="w-full bg-surface-container py-2.5 px-4 rounded-xl text-on-surface font-body-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 border border-outline-variant/15"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pb-2 pt-2">
                  <h2 className="font-headline-sm text-xl text-on-surface font-bold tracking-tight">
                    Select Settlement Channel
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      verified
                    </span>
                    Automated Dynamic Routing
                  </span>
                </div>

                {/* Gateway A: bKash Escrow */}
                <div
                  onClick={() => handleSelectGateway("bkash")}
                  className={`gateway-card cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden group ${
                    selectedGateway === "bkash"
                      ? "bg-surface-container-high/90 border-primary shadow-xl ring-1 ring-primary/40"
                      : "bg-surface-container/50 border-outline-variant/15 hover:bg-surface-container-high/60 shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#E2136E]/15 flex items-center justify-center shrink-0">
                        <span className="font-headline-sm font-black text-[#ff7bb1]">
                          bK
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-base text-on-surface font-bold">
                            bKash Direct Escrow
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#E2136E]/20 text-[#ff7bb1] font-label-sm text-[11px] font-semibold">
                            Recommended
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant/80 mt-0.5">
                          1-Tap Seamless Tokenized Auth • 0% Transaction Fee • 10-Min Auto Refund
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-secondary/15 text-secondary font-label-sm text-xs font-bold">
                        ৳৪৫০ ক্যাশব্যাক
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedGateway === "bkash"
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-highest text-transparent"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gateway B: Nagad Smart Escrow */}
                <div
                  onClick={() => handleSelectGateway("nagad")}
                  className={`gateway-card cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    selectedGateway === "nagad"
                      ? "bg-surface-container-high/90 border-primary shadow-xl ring-1 ring-primary/40"
                      : "bg-surface-container/50 border-outline-variant/15 hover:bg-surface-container-high/60 shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F7921E]/15 flex items-center justify-center shrink-0">
                        <span className="font-headline-sm font-black text-[#ffbe76]">
                          NG
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-base text-on-surface font-bold">
                            Nagad Smart Escrow
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#F7921E]/15 text-[#ffbe76] font-label-sm text-[11px]">
                            Instant Ping
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant/80 mt-0.5">
                          Bangladesh Post Office Direct Digital Escrow Node • ৳৩০০ বোনাস ভাউচার
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-secondary/15 text-secondary font-label-sm text-xs font-bold">
                        ৳৩০০ বোনাস
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedGateway === "nagad"
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-highest text-transparent"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gateway C: Cards & Instant EMI */}
                <div
                  onClick={() => handleSelectGateway("cards")}
                  className={`gateway-card cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    selectedGateway === "cards"
                      ? "bg-surface-container-high/90 border-primary shadow-xl ring-1 ring-primary/40"
                      : "bg-surface-container/50 border-outline-variant/15 hover:bg-surface-container-high/60 shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <span className="material-symbols-outlined text-2xl">
                          credit_card
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-base text-on-surface font-bold">
                            Cards & 0% EMI Vault
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-[11px]">
                            BRAC / City Bank
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant/80 mt-0.5">
                          Visa, Mastercard, AMEX • Up to 12 Months 0% EMI • 3D Secure 2.0
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        selectedGateway === "cards"
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-highest text-transparent"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm font-bold">
                        check
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gateway D: Doorstep Inspection COD */}
                <div
                  onClick={() => handleSelectGateway("cod")}
                  className={`gateway-card cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    selectedGateway === "cod"
                      ? "bg-surface-container-high/90 border-primary shadow-xl ring-1 ring-primary/40"
                      : "bg-surface-container/50 border-outline-variant/15 hover:bg-surface-container-high/60 shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0 text-tertiary">
                        <span className="material-symbols-outlined text-2xl">
                          package_2
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-base text-on-surface font-bold">
                            Doorstep Open-Box Inspection (COD)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-[11px]">
                            Verified Rider
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant/80 mt-0.5">
                          রাইডারের সামনে ১৫ মিনিট চেক করে সন্তুষ্ট হলে নগদ দিন। অপছন্দ হলে সাথে সাথে ফ্রি রিটার্ন।
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        selectedGateway === "cod"
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-highest text-transparent"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm font-bold">
                        check
                      </span>
                    </div>
                  </div>
                </div>

                {/* Operational Guarantee Footnote */}
                <div className="pt-4 flex items-center gap-3 text-on-surface-variant/70 text-xs px-2">
                  <span className="material-symbols-outlined text-base text-secondary">
                    gavel
                  </span>
                  <span>
                    All escrowed funds are held in Bangladesh Bank Authorized Statutory Settlement Trust. Disputed amounts are refunded automatically without merchant approval.
                  </span>
                </div>
              </div>

              {/* Interactive Vault Execution Terminal (Right Side) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 rounded-3xl bg-surface-container-low/95 backdrop-blur-2xl p-7 shadow-2xl space-y-6 border border-outline-variant/15">
                  <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                    <div>
                      <span className="font-label-sm text-xs text-primary uppercase tracking-widest block font-semibold">
                        Execution Terminal
                      </span>
                      <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                        {selectedGateway === "bkash" && "bKash Escrow Authorizer"}
                        {selectedGateway === "nagad" && "Nagad Escrow Settlement"}
                        {selectedGateway === "cards" && "BRAC / City Bank SSL Card Vault"}
                        {selectedGateway === "cod" && "Safe Doorstep Inspection COD"}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-primary text-2xl">
                      encrypted
                    </span>
                  </div>

                  {/* Terminal Form */}
                  <div className="space-y-4">
                    {selectedGateway !== "cod" ? (
                      <div>
                        <label className="block font-label-sm text-xs text-on-surface-variant uppercase tracking-wider mb-2">
                          Registered Wallet Account
                        </label>
                        <div className="relative flex items-center">
                          <div className="absolute left-4 flex items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined text-lg">
                              smartphone
                            </span>
                            <span className="font-body-md text-sm font-medium text-on-surface">
                              +880
                            </span>
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="1XXX XXXXXX"
                            className="w-full bg-surface-container py-3.5 pl-24 pr-4 rounded-xl text-on-surface font-body-md text-sm focus:outline-none focus:bg-surface-container-high transition-all border border-outline-variant/10"
                          />
                        </div>
                        <span className="text-[11px] text-on-surface-variant/70 mt-1.5 block">
                          One-Time Dynamic OTP will be transmitted upon submission.
                        </span>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-surface-container-high/40 border border-outline-variant/10 text-xs text-on-surface-variant">
                        <span className="text-secondary font-semibold block mb-1">
                          No Digital Advance Required
                        </span>
                        Pay cash directly to our verified EV courier after inspecting your product inside the 15-minute unboxing window.
                      </div>
                    )}

                    {/* Price Breakdown Glass Panel */}
                    <div className="p-4 rounded-xl bg-surface-container/70 space-y-2.5 font-body-sm text-xs border border-outline-variant/10">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Product Subtotal</span>
                        <span className="text-on-surface font-medium">
                          ৳{cartSubtotal.toLocaleString("bn-BD")}
                        </span>
                      </div>
                      <div className="flex justify-between text-on-surface-variant">
                        <span>
                          {deliveryZone === "inside-dhaka"
                            ? "Hyperlocal Dhaka Insured Transit"
                            : "Nationwide Steadfast Insured Transit"}
                        </span>
                        <span className="text-on-surface font-medium">
                          ৳{transitFee.toLocaleString("bn-BD")}
                        </span>
                      </div>
                      {cashback > 0 && (
                        <div className="flex justify-between text-secondary">
                          <span>
                            Instant {selectedGateway === "bkash" ? "bKash" : "Nagad"} Escrow Cashback
                          </span>
                          <span className="font-medium">- ৳{cashback}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Xeni Escrow Custody Protection Fee</span>
                        <span className="text-secondary font-medium">FREE (৳০)</span>
                      </div>
                      <div className="pt-2 flex justify-between font-headline-sm text-base text-on-surface font-bold border-t border-outline-variant/10">
                        <span>Net Payable Vault Lock</span>
                        <span className="text-primary font-bold">
                          ৳{netPayable.toLocaleString("bn-BD")}
                        </span>
                      </div>
                    </div>

                    {/* Escrow Agreement Consent */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="escrow-consent"
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer shrink-0"
                      />
                      <label
                        htmlFor="escrow-consent"
                        className="font-body-sm text-xs text-on-surface-variant/80 cursor-pointer select-none leading-relaxed"
                      >
                        I authorize holding ৳{netPayable.toLocaleString("bn-BD")} in neutral digital escrow. I understand that the merchant will receive funds{" "}
                        <strong className="text-on-surface">
                          only after my doorstep physical confirmation
                        </strong>
                        .
                      </label>
                    </div>

                    {/* Submission CTA */}
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleExecuteVault}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-container via-inverse-primary to-primary text-on-primary font-headline-sm text-sm font-bold tracking-wide shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isProcessing ? "hourglass_top" : "lock_open"}
                      </span>
                      <span>
                        {isProcessing
                          ? "Locking Escrow Channel..."
                          : selectedGateway === "bkash"
                          ? "Proceed to Secure bKash Gateway"
                          : selectedGateway === "nagad"
                          ? "Authorize via Nagad Network"
                          : selectedGateway === "cards"
                          ? "Proceed to 3D-Secure 2.0 Card Gateway"
                          : "Confirm Order with Inspection Rights"}
                      </span>
                    </button>

                    {feedbackMessage && (
                      <div className="p-3 rounded-xl bg-secondary/15 text-secondary text-center text-xs font-medium border border-secondary/20 animate-pulse">
                        {feedbackMessage}
                      </div>
                    )}

                    {orderError && (
                      <div className="p-3 rounded-xl bg-error/10 text-error text-center text-xs font-medium border border-error/20">
                        <span className="material-symbols-outlined text-sm align-middle mr-1">error</span>
                        {orderError}
                      </div>
                    )}

                    {/* Security Badges Footer */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="p-2 rounded-lg bg-surface-container/40 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-sm text-secondary block mx-auto mb-0.5">
                          verified_user
                        </span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                          256-Bit SSL
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-container/40 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-sm text-tertiary block mx-auto mb-0.5">
                          account_balance
                        </span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                          BB Compliant
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-container/40 border border-outline-variant/10">
                        <span className="material-symbols-outlined text-sm text-primary block mx-auto mb-0.5">
                          replay
                        </span>
                        <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                          Auto Refund
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explainer Infographic: "How E-Pic Escrow Architecture Protects You" */}
            <div className="mt-24 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="font-label-sm text-xs text-secondary uppercase tracking-widest block font-bold">
                  Frictionless Security Architecture
                </span>
                <h2 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                  How E-Pic Escrow Protects Every Taka
                </h2>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
                  Unlike ordinary e-commerce where sellers run away with upfront money or deliver counterfeit packages, E-Pic&apos;s digital trust protocol makes fraud mathematically impossible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="rounded-2xl p-8 bg-surface-container/70 backdrop-blur-xl relative overflow-hidden group shadow-lg border border-outline-variant/15">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base mb-6">
                    01
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-headline-sm text-base text-on-surface font-bold">
                      Lock in Neutral Escrow
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Money stays locked in an automated neutral escrow repository. The merchant cannot withdraw or utilize the capital during transit.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-xs text-primary font-medium border-t border-outline-variant/10">
                    <span className="material-symbols-outlined text-sm">shield</span>
                    <span>Merchant Access: LOCKED</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="rounded-2xl p-8 bg-surface-container/70 backdrop-blur-xl relative overflow-hidden group shadow-lg border border-outline-variant/15">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-base mb-6">
                    02
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-headline-sm text-base text-on-surface font-bold">
                      15-Min Doorstep Inspection
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Open the carton in front of our verified Dhaka hyperlocal rider. Power on electronics, verify authenticity marks, and verify serial codes.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-xs text-secondary font-medium border-t border-outline-variant/10">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>15 Minutes Guaranteed Check</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="rounded-2xl p-8 bg-surface-container/70 backdrop-blur-xl relative overflow-hidden group shadow-lg border border-outline-variant/15">
                  <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center font-bold text-base mb-6">
                    03
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-headline-sm text-base text-on-surface font-bold">
                      Confirm OTP or Instant Refund
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Satisfied? Hand over delivery OTP to release merchant funds. Defective or fake? Hand it back; 100% refund hits your wallet in 10 minutes.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center gap-2 text-xs text-tertiary font-medium border-t border-outline-variant/10">
                    <span className="material-symbols-outlined text-sm">bolt</span>
                    <span>10-Minute Reversal Engine</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Metrics & Merchant Bond Banner */}
            <div className="mt-16 rounded-2xl bg-surface-container-high/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-outline-variant/15">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm font-semibold text-on-surface">
                    Active Merchant Security Bond: ৳৫,০০,০০০
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    The boutique merchant selling this item has staked collateral against fraudulent claims.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 text-center sm:text-right">
                <div>
                  <span className="font-currency-display text-lg text-on-surface font-bold">
                    ৯৯.৮%
                  </span>
                  <span className="text-[11px] text-on-surface-variant block">
                    Dispute Free Rate
                  </span>
                </div>
                <div>
                  <span className="font-currency-display text-lg text-secondary font-bold">
                    ৳০
                  </span>
                  <span className="text-[11px] text-on-surface-variant block">
                    Buyer Loss History
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
