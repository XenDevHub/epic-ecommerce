"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTrackOrder } from "@/hooks/useApi";

function TrackingContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("id");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [orderId, setOrderId] = useState(queryOrderId || "");
  const [destinationAddress, setDestinationAddress] = useState("House 34, Road 7A, Dhanmondi");

  // Fetch real tracking data from Xeni 2.0
  const { data: trackingData } = useTrackOrder(
    orderId.trim() || null
  );

  useEffect(() => {
    if (queryOrderId) {
      setOrderId(queryOrderId);
    }
    try {
      const saved = localStorage.getItem("epic_last_order");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!queryOrderId && parsed.orderId) {
          setOrderId(parsed.orderId);
        }
        if (parsed.address) {
          setDestinationAddress(parsed.address);
        }
      }
    } catch {
      // ignore
    }
  }, [queryOrderId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Derive delivery status step from Xeni tracking data
  const currentStep = (() => {
    if (!trackingData) return 2;
    switch (trackingData.delivery_status?.toLowerCase()) {
      case "pending": return 1;
      case "processing": return 2;
      case "dispatched": return 3;
      case "in_transit": return 4;
      case "out_for_delivery": return 5;
      case "delivered": return 6;
      default: return 2;
    }
  })();

  const handleCallRider = () => {
    setIsCalling(true);
    showToast("Connecting direct encrypted call with Courier Tanvir (+880171299281)...");
    setTimeout(() => setIsCalling(false), 2000);
  };

  return (
    <main className="w-full bg-background relative min-h-screen pt-24 text-on-surface">
      <div className="flex flex-col w-full">
        {/* Dynamic Atmospheric Glow Backdrop Elements */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-80 right-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 py-6 w-full space-y-10 relative z-10">
            {/* Breadcrumb, Metadata Capsule & Live Node Sync Bar */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3 font-label-md text-xs sm:text-sm">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant/15">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    share_location
                  </span>
                  <span>Live Dispatch</span>
                </span>
                <span className="text-outline text-xs">/</span>
                <span className="text-on-surface font-semibold tracking-wide">
                  Dhaka Hyperlocal Corridor
                </span>
                <span className="text-outline text-xs">•</span>
                <span className="px-2.5 py-0.5 rounded bg-surface-container-low text-primary text-xs font-mono border border-outline-variant/15">
                  Consignment #{orderId}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Real-time Xeni Decentralized Fleet Node */}
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-low shadow-sm border border-outline-variant/15">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                  </span>
                  <span className="font-label-sm text-xs text-on-surface font-medium tracking-tight">
                    Xeni Node BD-04 Verified
                  </span>
                  <span className="text-outline text-xs">•</span>
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    Pathao Express Fleet Mesh
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs border border-outline-variant/15">
                  <span className="material-symbols-outlined text-sm text-tertiary">
                    bolt
                  </span>
                  <span>Instant Sync (0.4s ping)</span>
                </div>
              </div>
            </section>

            {/* Primary Status Hero: Bangla + English Editorial Contrast */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary-container/20 text-secondary font-label-sm text-xs uppercase tracking-wider font-bold border border-secondary/20">
                  <span className="material-symbols-outlined text-xs">moped</span>
                  <span>Active Urban In-Flight Courier</span>
                </div>
                <h1 className="font-display-lg text-3xl sm:text-5xl text-on-surface tracking-tight leading-tight font-extrabold">
                  আপনার পার্সেলটি এখন পথে রয়েছে
                  <span className="text-primary font-light text-2xl sm:text-3xl block mt-1 tracking-normal font-body-lg">
                    Package in Hyperlocal Transit to Dhanmondi 7A
                  </span>
                </h1>
                <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                  Consignment dispatched from Banani Logistics Deck via EV-Courier. Real-time telemetry, tamper-proof temperature telemetry, and live cryptographic OTP lock are active.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
                {/* Realtime ETA Display Badge */}
                <div className="p-6 rounded-2xl bg-surface-container-high shadow-xl relative overflow-hidden border border-outline-variant/15">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary/10 rounded-full blur-2xl" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
                      Calculated Arrival
                    </span>
                    <span className="flex items-center gap-1 font-label-sm text-xs text-secondary bg-surface-container px-2 py-0.5 rounded-full border border-secondary/20">
                      <span className="material-symbols-outlined text-xs">
                        schedule
                      </span>{" "}
                      On Schedule
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-currency-display text-4xl text-on-surface font-extrabold tracking-tight">
                      38
                    </span>
                    <span className="font-headline-sm text-lg text-on-surface-variant">
                      minutes
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Expected Doorstep Time:{" "}
                    <strong className="text-on-surface font-semibold">
                      04:15 PM
                    </strong>
                  </p>
                  <div className="mt-4 pt-3 flex items-center justify-between text-xs text-on-surface-variant border-t border-outline-variant/10">
                    <span>Banani 11 Hub</span>
                    <span className="material-symbols-outlined text-sm text-primary">
                      arrow_forward
                    </span>
                    <span>Dhanmondi Lake Enclave</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Visual Grid: Live Telemetry Map & Rider Shield Interface */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Cols: Stylized Dhaka Metro Corridor Visualizer Map */}
              <div className="lg:col-span-8 space-y-6">
                <div className="relative w-full rounded-3xl bg-surface-container-low shadow-2xl overflow-hidden p-6 sm:p-8 border border-outline-variant/15">
                  {/* Top Map Bar Elements */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-outline-variant/15">
                        <span className="material-symbols-outlined text-xl">
                          satellite_alt
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-base text-on-surface font-bold leading-snug">
                          Dhaka Metro Vector Radar
                        </h3>
                        <p className="font-body-sm text-xs text-on-surface-variant">
                          GPS Sat-Lock • Mohakhali Expressway Overhead Corridor
                        </p>
                      </div>
                    </div>

                    {/* Route Weather & Air Assist */}
                    <div className="flex items-center gap-3 bg-surface-container px-3.5 py-2 rounded-xl text-xs font-medium border border-outline-variant/10">
                      <span className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-sm">
                          water_drop
                        </span>
                        <span>Clear Run • 29°C</span>
                      </span>
                      <span className="text-outline-variant">•</span>
                      <span className="flex items-center gap-1 text-secondary">
                        <span className="material-symbols-outlined text-sm">
                          traffic
                        </span>
                        <span>Flyover Congestion Bypassed</span>
                      </span>
                    </div>
                  </div>

                  {/* Stylized Map Canvas Component */}
                  <div className="relative w-full h-[460px] rounded-2xl bg-surface-container-lowest overflow-hidden flex items-center justify-center mt-6 border border-outline-variant/10">
                    {/* Dhaka Vector Metro Grid (Subtle Dark Mode Blueprint) */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="grid-pattern"
                          width="48"
                          height="48"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 48 0 L 0 0 0 48"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.75"
                            className="text-outline-variant/30"
                          />
                        </pattern>
                        <linearGradient
                          id="routeGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#4edea3"
                            stopOpacity="0.9"
                          />
                          <stop
                            offset="60%"
                            stopColor="#4cd7f6"
                            stopOpacity="0.8"
                          />
                          <stop
                            offset="100%"
                            stopColor="#8083ff"
                            stopOpacity="0.9"
                          />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                      {/* Stylized Roads / Urban Arteries of Dhaka Metro */}
                      <path
                        d="M-20,110 C 140,90 280,140 450,110 S 750,70 950,120"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-outline-variant/20"
                      />
                      <path
                        d="M80,-30 L 140,240 L 220,480"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-outline-variant/15"
                      />
                      <path
                        d="M720,-10 L 680,260 L 590,490"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-outline-variant/15"
                      />

                      {/* Lake & Green Belt Representation (Dhanmondi / Gulshan aesthetic) */}
                      <path
                        d="M 210,310 Q 250,290 290,320 T 360,370 Q 320,420 270,390 Z"
                        fill="#003824"
                        fillOpacity="0.3"
                        stroke="#4edea3"
                        strokeOpacity="0.3"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 640,60 Q 670,40 700,70 T 730,130 Q 690,140 650,120 Z"
                        fill="#003640"
                        fillOpacity="0.3"
                        stroke="#4cd7f6"
                        strokeOpacity="0.3"
                        strokeWidth="0.5"
                      />

                      {/* Active Trajectory Route Path (Banani to Dhanmondi) */}
                      <path
                        id="transit-route"
                        d="M 720,80 C 640,110 540,180 440,230 S 310,310 240,360"
                        fill="none"
                        stroke="url(#routeGradient)"
                        strokeWidth="4.5"
                        strokeDasharray="8 6"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />

                      {/* Radar Radius Pulsing Rings over Rider Position */}
                      <circle
                        cx="440"
                        cy="230"
                        r="48"
                        fill="#4edea3"
                        fillOpacity="0.08"
                        className="animate-ping"
                        style={{ animationDuration: "3s" }}
                      />
                      <circle
                        cx="440"
                        cy="230"
                        r="26"
                        fill="#8083ff"
                        fillOpacity="0.2"
                      />
                      <circle cx="440" cy="230" r="9" fill="#4edea3" />
                      <circle cx="440" cy="230" r="4" fill="#0f131d" />

                      {/* Origin Node: Banani Hub */}
                      <circle cx="720" cy="80" r="7" fill="#4cd7f6" />
                      <circle cx="720" cy="80" r="3" fill="#0f131d" />

                      {/* Destination Node: Recipient Home (Dhanmondi 7A) */}
                      <circle cx="240" cy="360" r="8" fill="#c0c1ff" />
                      <circle cx="240" cy="360" r="3.5" fill="#0f131d" />
                    </svg>

                    {/* Node Callout 1: Banani Hub Flag */}
                    <div className="absolute top-12 right-12 sm:right-28 bg-surface-container/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg pointer-events-none border border-outline-variant/15">
                      <p className="font-label-sm text-[10px] text-tertiary">
                        Origin Hub
                      </p>
                      <p className="text-xs text-on-surface font-semibold">
                        Banani 11 Dispatch
                      </p>
                    </div>

                    {/* Node Callout 2: Live Rider Telemetry Tag */}
                    <div className="absolute top-[36%] left-[42%] -translate-x-1/2 -translate-y-full bg-surface-container-high/95 backdrop-blur-xl px-4 py-2.5 rounded-xl shadow-2xl space-y-1 border border-outline-variant/20">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider">
                          In Flight (Mohakhali Flyover)
                        </span>
                      </div>
                      <p className="font-headline-sm text-xs font-semibold text-on-surface">
                        Tanvir • 34 km/h • EV-Eco Mode
                      </p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant">
                        Box Temp: 21.5°C • Seal Intact #992
                      </p>
                    </div>

                    {/* Node Callout 3: Destination Flag */}
                    <div className="absolute bottom-16 left-10 sm:left-24 bg-surface-container/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg pointer-events-none border border-outline-variant/15">
                      <p className="font-label-sm text-[10px] text-primary">
                        Destination
                      </p>
                      <p className="text-xs text-on-surface font-semibold truncate max-w-[200px]">
                        {destinationAddress}
                      </p>
                    </div>

                    {/* Bottom Overlay Map Controls */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                      <button
                        type="button"
                        onClick={() => showToast("Recalibrating to current Rider coordinates")}
                        className="w-9 h-9 rounded-lg bg-surface-container-high/90 hover:bg-surface-bright text-on-surface flex items-center justify-center transition-all shadow-md border border-outline-variant/15"
                        title="Recenter Location"
                      >
                        <span className="material-symbols-outlined text-lg">
                          my_location
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast("Satellite 3D elevation layer toggled")}
                        className="w-9 h-9 rounded-lg bg-surface-container-high/90 hover:bg-surface-bright text-on-surface flex items-center justify-center transition-all shadow-md border border-outline-variant/15"
                        title="Toggle Drone Elevation View"
                      >
                        <span className="material-symbols-outlined text-lg">
                          layers
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Rider Identity & Rapid Direct Action Tray */}
                  <div className="mt-6 pt-6 bg-surface-container p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-outline-variant/10">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-14 h-14 rounded-2xl object-cover shadow-md ring-1 ring-secondary/30"
                          alt="Tanvir Hasan - Courier specialist"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSkXMbSThbuhJJ8G5DOeikzIzFNRFdf6dTx-kt-Ehc_0ApgT-Ei2xkoTDtjpNRSafQwRQCuJFP8G7pqJjZmSVfptaHy2lK7UG7hfoKdkGdMZ3Msoa1Gho3iJ3AzXqRpjIFy8jlN5nVCrSGqivuzS3_gA29DH6av8hRT7e2p1eA3DTjFX1m_LfRpoj0U49FOst3xkNA_h5WOjiyo9f80wyHE_DMikybG0I5bupdr4mrtxYodk96uePPow"
                        />
                        <span
                          className="absolute -bottom-1 -right-1 p-1 rounded-full bg-secondary text-on-secondary flex items-center justify-center"
                          title="Verified Pathao Fleet Master"
                        >
                          <span className="material-symbols-outlined text-xs">
                            verified
                          </span>
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-headline-sm text-base text-on-surface font-bold">
                            Tanvir Hasan
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface-variant font-medium">
                            PX-992
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body-sm text-xs text-on-surface-variant mt-0.5">
                          <span className="flex items-center text-amber-300 font-semibold text-xs">
                            <span
                              className="material-symbols-outlined text-sm text-amber-300 mr-0.5"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>{" "}
                            4.97
                          </span>
                          <span>1,240+ Delivered</span>
                          <span>•</span>
                          <span className="text-secondary font-medium">
                            Electric Two-Wheeler
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Action Trays */}
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setChatOpen(!chatOpen);
                          showToast("Encrypted Chat Session Opened with Rider");
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-xs font-semibold transition-all shadow-sm border border-outline-variant/15"
                      >
                        <span className="material-symbols-outlined text-base text-primary">
                          chat
                        </span>
                        <span>Secure Chat</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCallRider}
                        disabled={isCalling}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold hover:brightness-105 transition-all shadow-lg"
                      >
                        <span className="material-symbols-outlined text-base">
                          call
                        </span>
                        <span>{isCalling ? "Dialing..." : "Call Rider"}</span>
                      </button>
                    </div>
                  </div>

                  {/* OTP Handover Shield (Proprietary Trust Lock) */}
                  <div className="mt-4 p-5 rounded-2xl bg-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/15">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-secondary font-label-sm text-xs uppercase tracking-wider font-bold">
                        <span className="material-symbols-outlined text-base">
                          shield_lock
                        </span>
                        <span>Cryptographic Handover Shield</span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Provide this OTP to Tanvir only after your 15-minute package inspection is verified.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-surface-container-lowest px-6 py-3 rounded-xl shadow-inner border border-outline-variant/10">
                      <span className="font-label-sm text-[10px] text-outline uppercase tracking-widest block font-bold">
                        OTP
                      </span>
                      <div className="flex items-center gap-2 font-mono text-2xl font-extrabold tracking-widest text-primary">
                        <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/15">
                          4
                        </span>
                        <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/15">
                          9
                        </span>
                        <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/15">
                          2
                        </span>
                        <span className="px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/15">
                          8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Innovations Triad */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-surface-container-low shadow-sm space-y-2 border border-outline-variant/15">
                    <div className="w-9 h-9 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">
                        timer
                      </span>
                    </div>
                    <h5 className="font-headline-sm text-sm font-bold text-on-surface">
                      15-Min Live Unbox Window
                    </h5>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Take your time. Inspect both factory seals, power on the ANC audio, and inspect audio hardware before releasing payment OTP.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low shadow-sm space-y-2 border border-outline-variant/15">
                    <div className="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">
                        energy_savings_leaf
                      </span>
                    </div>
                    <h5 className="font-headline-sm text-sm font-bold text-on-surface">
                      Carbon-Neutral Urban Fleet
                    </h5>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      100% emission-free localized transit via high-density battery EV. 0.42 kg CO₂ offset logged onto Xeni ledger.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-container-low shadow-sm space-y-2 border border-outline-variant/15">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">
                        cloud_sync
                      </span>
                    </div>
                    <h5 className="font-headline-sm text-sm font-bold text-on-surface">
                      Dynamic Routing & Weather Sync
                    </h5>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      Live Dhaka monsoon forecasting algorithm continuously routes around waterlogged choke points and flyover holdups.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Milestone Timeline & Order Manifest Summary */}
              <div className="lg:col-span-4 space-y-6">
                {/* 4-Phase Chronological Milestone Timeline */}
                <div className="p-6 sm:p-7 rounded-3xl bg-surface-container-low shadow-xl space-y-6 border border-outline-variant/15">
                  <div className="flex items-center justify-between pb-2 border-b border-outline-variant/10">
                    <h3 className="font-headline-sm text-base font-bold text-on-surface">
                      Journey Milestones
                    </h3>
                    <span className="text-xs font-mono text-secondary px-2.5 py-1 rounded bg-surface-container-high font-semibold border border-secondary/20">
                      Phase {Math.min(currentStep, 4)} of 4
                    </span>
                  </div>

                  <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-3 before:w-0.5 before:bg-outline-variant/30">
                    {/* Milestone 1 */}
                    <div className="relative group">
                      <div className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md ring-4 ring-surface-container-low">
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="font-label-md text-xs text-on-surface font-bold">
                            Order Verified & Escrow Locked
                          </h5>
                          <span className="font-body-sm text-[11px] font-mono text-on-surface-variant">
                            02:45 PM
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                          ৳8,890 held under decentralized smart escrow. Merchant authorization completed.
                        </p>
                      </div>
                    </div>

                    {/* Milestone 2 */}
                    <div className="relative group">
                      <div className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md ring-4 ring-surface-container-low">
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="font-label-md text-xs text-on-surface font-bold">
                            Banani Hub Quality Check
                          </h5>
                          <span className="font-body-sm text-[11px] font-mono text-on-surface-variant">
                            03:10 PM
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                          Barcode serialized, box humidity verified, tamper-evident security foil sealed.
                        </p>
                      </div>
                    </div>

                    {/* Milestone 3: IN PROGRESS */}
                    <div className="relative group">
                      <div className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg ring-4 ring-surface-container-low">
                        <span className="material-symbols-outlined text-sm animate-spin">
                          sync
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="font-label-md text-xs text-primary font-bold">
                            Out for Rapid Dispatch
                          </h5>
                          <span className="font-body-sm text-[11px] font-mono text-primary font-bold">
                            03:32 PM
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface font-medium mt-0.5">
                          Rider Tanvir Hasan departed Banani 11 hub. En-route Mohakhali linkway.
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-secondary font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                          <span>Live GPS Telemetry Broadcasting</span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 4: UPCOMING */}
                    <div className="relative group opacity-60">
                      <div className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant ring-4 ring-surface-container-low">
                        <span className="material-symbols-outlined text-sm">
                          inventory
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="font-label-md text-xs text-on-surface font-bold">
                            Doorstep Handover & Unboxing
                          </h5>
                          <span className="font-body-sm text-[11px] font-mono text-on-surface-variant">
                            Est. 04:15 PM
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                          Customer activates 15-min unboxing verification before final OTP settlement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Manifest Summary Drawer */}
                <div className="p-6 sm:p-7 rounded-3xl bg-surface-container-low shadow-xl space-y-6 border border-outline-variant/15">
                  <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                    <h3 className="font-headline-sm text-base font-bold text-on-surface">
                      Order Manifest
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-secondary-container/20 text-secondary font-bold">
                      2 Items Sealed
                    </span>
                  </div>

                  {/* Product Items List */}
                  <div className="space-y-4">
                    {/* Item 1 */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        alt="Lumio SoundWave ANC Earphones"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN95HZC9OHLfSivZ6HX0W4cuMbIOD98qYmjKUik7UVsxLhDvzM6KLKVQgwXQx2avcezZgm5pqBe6CuXyYyfKtL1_SfYltAAVjW7il5uQOH9OEUqZbncdmjJeX2QquPST5WWdXubElSaOxaQGloZAJcvEhvJ8YUgc2G64Qo62aGliAAjn0B9i6ZhUpY8mMbpj-DJJFDn-AtnNdshdIyqzSHgEECXIV-618w2pqMCKSEiod0uv5SIBRwDQ"
                      />
                      <div className="min-w-0 flex-1">
                        <h6 className="font-label-md text-xs text-on-surface font-semibold truncate">
                          Lumio SoundWave ANC Earphones
                        </h6>
                        <p className="font-body-sm text-[11px] text-on-surface-variant">
                          Midnight Slate • Matte Edition
                        </p>
                        <p className="font-label-sm text-xs text-on-surface font-bold mt-0.5">
                          ৳7,490
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        alt="Pulse 20W GaN Mini Turbo"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLFjyzWrUztxOWar05OeCm0-m4rUO7q5Tax4sMULS-DCQ_0uJfhy7meoGDj5-cF49tFky72dfVSh-zqAR0D4_oRlOyF2O2H09CuF0aP6hcHCPOBcjYGdKe6avYzkSh0NOfs1HJCYT9ghv21ULkHkhHkWyklYjFj-ojRcnVPCKvVZOBaExsVQEK0sitYvBLdeIaa7s5VNJBqLu4VZ0j871K7a5ObFYDxo-n6vKXG6-N9mIcFxMsFiqnhQ"
                      />
                      <div className="min-w-0 flex-1">
                        <h6 className="font-label-md text-xs text-on-surface font-semibold truncate">
                          Pulse 20W GaN Mini Turbo
                        </h6>
                        <p className="font-body-sm text-[11px] text-on-surface-variant">
                          Dual Type-C • Frost White
                        </p>
                        <p className="font-label-sm text-xs text-on-surface font-bold mt-0.5">
                          ৳1,400
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Financials & Escrow Breakdown */}
                  <div className="p-4 rounded-2xl bg-surface-container-high space-y-2.5 text-xs border border-outline-variant/10">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Subtotal (2 Items)</span>
                      <span className="text-on-surface font-mono">৳8,890</span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Express Hyperlocal Fleet Fee</span>
                      <span className="text-secondary font-semibold font-mono">
                        FREE (Promotional)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Payment Method</span>
                      <span className="flex items-center gap-1.5 font-bold text-[#ff7bb1]">
                        <span className="px-1.5 py-0.2 rounded bg-[#E2136E]/20 text-[10px]">
                          bKash
                        </span>{" "}
                        Escrow Protected
                      </span>
                    </div>
                    <div className="pt-2 flex items-center justify-between font-headline-sm text-sm text-on-surface font-bold border-t border-outline-variant/10">
                      <span>Total Amount Paid</span>
                      <span className="text-secondary font-mono font-extrabold text-base">
                        ৳8,890
                      </span>
                    </div>
                  </div>

                  {/* Download Invoice & Concierge Helpline */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => showToast(`Certified E-Challan #${orderId} downloading...`)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-xs font-semibold transition-all shadow-sm border border-outline-variant/15"
                    >
                      <span className="material-symbols-outlined text-base text-tertiary">
                        description
                      </span>
                      <span>Download Certified E-Challan & Invoice</span>
                    </button>
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-container text-xs text-on-surface-variant border border-outline-variant/10">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-primary">
                          support_agent
                        </span>
                        <span>E-Pic 24/7 Concierge Hotline</span>
                      </span>
                      <a
                        className="font-mono font-bold text-on-surface hover:text-primary transition-colors"
                        href="tel:16299"
                      >
                        16299
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Minimalist Delivery Assurance Strip */}
            <section className="py-6 px-8 rounded-2xl bg-surface-container-low shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-outline-variant/15">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-2xl">
                    verified
                  </span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface">
                    The E-Pic Zero-Risk Escrow Guarantee
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant max-w-xl">
                    Payment is held safe in decentralized merchant escrow until your 15-minute unboxing verification is confirmed. Any seal tampering authorizes an instant bKash reversal.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => showToast("Dispute Flag Raised: Vault Lock Frozen pending inspection")}
                  className="px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-semibold transition-all border border-outline-variant/15"
                >
                  Report Issue / Halt
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Handover Confirmed: Escrow Released to Merchant. Thank you!")}
                  className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold transition-all shadow-md hover:brightness-105"
                >
                  Confirm Handover Early
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Dynamic Toast Feedback */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-highest shadow-2xl text-on-surface border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary text-2xl">
                info
              </span>
              <span className="font-label-md text-xs font-medium">
                {toastMessage}
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function DeliveryTrackingPage() {
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
      <TrackingContent />
    </Suspense>
  );
}
