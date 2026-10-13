import type { Product } from "@/types";

export interface ProductCatalogItem extends Product {
  category: string;
  rating: number;
  reviews_count: number;
  badge?: string;
  badge_variant?: "primary" | "secondary" | "tertiary";
  gallery: { label: string; url: string }[];
  specs: { section: string; icon: string; color: string; rows: { label: string; value: string }[] }[];
  quick_specs: { icon: string; color: string; title: string; subtitle: string }[];
  color_options: { name: string; colorClass: string }[];
  original_price?: number;
  stock_label: string;
  dispatch_info: string;
}

export const PRODUCT_CATALOG: Record<string, ProductCatalogItem> = {
  "lumio-soundwave": {
    id: "lumio-soundwave",
    shop_id: "shop-pulse-acoustics",
    name: "Lumio SoundWave ANC Earphones",
    name_bn: "লুমিও সাউন্ডওয়েভ এএনসি ইয়ারফোনস",
    description:
      "Studio-grade acoustic architecture featuring 11mm beryllium transducers, adaptive hybrid cancellation, and gyroscopic spatial tracking.",
    price: 3290,
    original_price: 4690,
    initial_stock: 50,
    current_stock: 24,
    low_stock_threshold: 5,
    is_out_of_stock: false,
    is_active: true,
    has_variants: true,
    images: [],
    category: "Flagship Audio",
    rating: 4.9,
    reviews_count: 312,
    badge: "Hi-Res Wireless",
    badge_variant: "secondary",
    stock_label: "Banani & Dhanmondi Stock Available",
    dispatch_info: "Express Dhaka Dispatch in 24 hrs via Pathao / Steadfast",
    gallery: [
      {
        label: "Chamber",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY06EiHK-MDu3hSqaFNTZKsohAvHL1_BDWEVrqYgY_bSETshf31ncn-5NcZEPawuvnoOL1r8KywLhlo-Iccn9EEsCXvYjwmpPc5deV1Fc6UuVxsgWWdBz9T37nqWbpFgkpKgpSqR2CCh6-VHJBTfU_zSG4CPgCIoFVRnG82wrrYZyU-H2slLrss7DW48a7gRRQfsafWh3-EvzgUmjyp_Vopxuu-3bky59Q2golGGZPXwRaDOG08xESZw",
      },
      {
        label: "Driver",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVhVPezy8pBU-yR7qgHafZtF_bQAD3Zg9sDwgUaB-QVqCzeoseWJyLlrNr4lm1KOFfHrCg0IdoFdjEqKrHNx-R-efT7PAGlRJH_02Mp8MFxi3OQsSgnjPy4DAvfzOGuGZN0n5nqcuhgZmIGjD5gdCg22tLZRA4Flu6PFin_XoHAwCUmDzjrP0-3M97fhj2cMxN42iI4nQ3JKaaPTNXAAH0t6dUO0-H2aoKPfCmNBdSWas7QX9QgjqTZw",
      },
      {
        label: "Ergonomics",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0TfYFtl5KvHpfrxG3Wz0yjrwf8TjYZXUrDpl8S1vyJFeDpwPUTXUq5ATRf2qA3tIsT8t5kJ62Esvjx4UKP53mSRFsNrMqdPdxkCtwpdfzW2gMKbGBLsNQ42sl-cj-w0KFLADLkrvUnympb67Bc4e4l8BmETwIaIkLx_euwcKCLHc1xGWXC5kkMtxhUt0jH4RPkogyfHBiLT-XxpsS-TzhPTQPleNm6_qdko02hreEELeoSTWRgNa17A",
      },
      {
        label: "Unbox",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZdDNmHG8Z67IBMW89DHeZvXDCK1aZoM-scnQht16y9b_3lkDP5dfmxZhrsUzjhs7lbYM96-lXnB2EAbNI31sVa2Pg6tSWhHwT-jdjxFLNZEudsU_c6Ji1ztGsTEsS4MK_Ez9jT892hIzCZdWO_h92ZGogJTuRi-g3EKSKf6riaLStsoxOI20vFvAaFi6PK7JjBeGN-7vQpk2bdQ4-5bZM_cIt6xrCfAmJ_WzR3b5GWSXsAISs-nU9g",
      },
    ],
    color_options: [
      { name: "Matte Charcoal", colorClass: "bg-neutral-800" },
      { name: "Silver Titanium", colorClass: "bg-slate-300" },
      { name: "Cosmic Indigo", colorClass: "bg-indigo-600" },
    ],
    quick_specs: [
      { icon: "battery_charging_full", color: "text-primary", title: "40h Total Play", subtitle: "10h per earbud" },
      { icon: "noise_aware", color: "text-secondary", title: "-38dB Hybrid", subtitle: "Active cancelling" },
      { icon: "water_drop", color: "text-tertiary", title: "IPX5 Armor", subtitle: "Water resistant" },
      { icon: "graphic_eq", color: "text-primary", title: "LDAC 990k", subtitle: "Hi-Res streaming" },
    ],
    specs: [
      {
        section: "Acoustics & Transducers",
        icon: "tune",
        color: "text-primary",
        rows: [
          { label: "Driver Topology", value: "11mm Beryllium Dynamic Transducers" },
          { label: "Active Noise Cancellation", value: "-38dB Hybrid Feedforward & Feedback" },
          { label: "Acoustic Response", value: "15Hz – 42,000Hz (Hi-Res Certified)" },
          { label: "Microphone Array", value: "6x MEMS with Beamforming AI Filtering" },
          { label: "Spatial Tracking", value: "6-Axis Gyroscopic Realtime Engine" },
        ],
      },
      {
        section: "Wireless & Battery Architecture",
        icon: "sensors",
        color: "text-secondary",
        rows: [
          { label: "Wireless Standard", value: "Bluetooth 5.4 Dual-Sync Multipoint" },
          { label: "High-Res Codecs", value: "Sony LDAC (24-bit/96kHz), AAC, SBC" },
          { label: "Playback Reserve", value: "10h Buds + 30h Case (40h Total)" },
          { label: "Fast Charge", value: "10-min boost delivers 3.5h audio" },
          { label: "Charging Interface", value: "USB-C & Qi Wireless Protocol" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  "phantom-rgb-keyboard": {
    id: "phantom-rgb-keyboard",
    shop_id: "shop-apex-artisanal",
    name: "Phantom RGB 75% Mechanical Keyboard",
    name_bn: "ফ্যান্টম আরজিবি ৭৫% মেকানিকাল কীবোর্ড",
    description:
      "Premium 75% layout mechanical keyboard with per-key RGB illumination, hot-swap PCB, and dual-side gasket mount for unparalleled typing acoustics.",
    price: 3290,
    original_price: 4200,
    initial_stock: 15,
    current_stock: 4,
    low_stock_threshold: 2,
    is_out_of_stock: false,
    is_active: true,
    has_variants: true,
    images: [],
    category: "Tech Hub",
    rating: 4.8,
    reviews_count: 187,
    badge: "Hot-Swap PCB",
    badge_variant: "primary",
    stock_label: "Only 4 left • Banani Hub",
    dispatch_info: "Express Dhaka Dispatch in 24 hrs via Steadfast",
    gallery: [
      {
        label: "Overview",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAElGnxnOAPdSE-u8zAk3VBj3ubvdrG9tlgnovYQ3wTKw0BUvXfkWT7qXhSSvNJ2Av8t5jk1VEJUnJ1L6Vc0cPW_J7aWN4v3rQ8hYIihtDsuh2SAe1h_AWRk1PCr0fAazgP03gMp-WThMAsaZrnrOmQ1x0AiH3C0ljCrWXUD6mVLds-AhHyx1nhS5PS8atlSO6roQn-4nFhFegkbsDHfJACxguUohhutJqzt6urmxpJdrLsXi8gqg8qcQ",
      },
      {
        label: "RGB",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAElGnxnOAPdSE-u8zAk3VBj3ubvdrG9tlgnovYQ3wTKw0BUvXfkWT7qXhSSvNJ2Av8t5jk1VEJUnJ1L6Vc0cPW_J7aWN4v3rQ8hYIihtDsuh2SAe1h_AWRk1PCr0fAazgP03gMp-WThMAsaZrnrOmQ1x0AiH3C0ljCrWXUD6mVLds-AhHyx1nhS5PS8atlSO6roQn-4nFhFegkbsDHfJACxguUohhutJqzt6urmxpJdrLsXi8gqg8qcQ",
      },
      {
        label: "Side Profile",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAElGnxnOAPdSE-u8zAk3VBj3ubvdrG9tlgnovYQ3wTKw0BUvXfkWT7qXhSSvNJ2Av8t5jk1VEJUnJ1L6Vc0cPW_J7aWN4v3rQ8hYIihtDsuh2SAe1h_AWRk1PCr0fAazgP03gMp-WThMAsaZrnrOmQ1x0AiH3C0ljCrWXUD6mVLds-AhHyx1nhS5PS8atlSO6roQn-4nFhFegkbsDHfJACxguUohhutJqzt6urmxpJdrLsXi8gqg8qcQ",
      },
      {
        label: "PCB",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAElGnxnOAPdSE-u8zAk3VBj3ubvdrG9tlgnovYQ3wTKw0BUvXfkWT7qXhSSvNJ2Av8t5jk1VEJUnJ1L6Vc0cPW_J7aWN4v3rQ8hYIihtDsuh2SAe1h_AWRk1PCr0fAazgP03gMp-WThMAsaZrnrOmQ1x0AiH3C0ljCrWXUD6mVLds-AhHyx1nhS5PS8atlSO6roQn-4nFhFegkbsDHfJACxguUohhutJqzt6urmxpJdrLsXi8gqg8qcQ",
      },
    ],
    color_options: [
      { name: "Space Gray", colorClass: "bg-zinc-700" },
      { name: "Arctic White", colorClass: "bg-slate-100" },
    ],
    quick_specs: [
      { icon: "keyboard", color: "text-primary", title: "75% Layout", subtitle: "84 key compact" },
      { icon: "swap_horiz", color: "text-secondary", title: "Hot-Swap", subtitle: "5-pin PCB" },
      { icon: "light_mode", color: "text-tertiary", title: "Per-Key RGB", subtitle: "16.8M colors" },
      { icon: "volume_down", color: "text-primary", title: "Gasket Mount", subtitle: "Silenced acoustics" },
    ],
    specs: [
      {
        section: "Keyboard Architecture",
        icon: "keyboard",
        color: "text-primary",
        rows: [
          { label: "Layout", value: "75% Compact (84 Keys)" },
          { label: "Switch Type", value: "Hot-Swap 5-Pin MX Compatible" },
          { label: "Actuation Force", value: "Tactile 45gf / Linear 35gf" },
          { label: "Lighting", value: "Per-Key RGB, 16.8M Color Spectrum" },
          { label: "Polling Rate", value: "1000Hz USB / 2000Hz Mode" },
        ],
      },
      {
        section: "Build & Connectivity",
        icon: "settings_input_component",
        color: "text-secondary",
        rows: [
          { label: "Mount System", value: "Dual-Side Silicone Gasket" },
          { label: "Case Material", value: "Anodized Aluminum Top + PC Bottom" },
          { label: "Connectivity", value: "USB-C Detachable Braided Cable" },
          { label: "NKRO", value: "Full N-Key Rollover + Anti-Ghosting" },
          { label: "Onboard Memory", value: "6 Custom Profiles (512KB)" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  "heritage-tangail-saree": {
    id: "heritage-tangail-saree",
    shop_id: "shop-anokhi-handloom",
    name: "Heritage Tangail Cotton Saree",
    name_bn: "ঐতিহ্যবাহী টাঙ্গাইল কটন শাড়ি",
    description:
      "Hand-woven by master craftsmen from Tangail district using century-old jamdani techniques. Pure cotton with signature geometric border weaving.",
    price: 2450,
    original_price: 3200,
    initial_stock: 30,
    current_stock: 7,
    low_stock_threshold: 3,
    is_out_of_stock: false,
    is_active: true,
    has_variants: true,
    images: [],
    category: "Heritage Textiles",
    rating: 4.9,
    reviews_count: 94,
    badge: "GI Certified",
    badge_variant: "tertiary",
    stock_label: "7 units left • Tangail Studio",
    dispatch_info: "Dispatch from Tangail in 48 hrs via Pathao",
    gallery: [
      {
        label: "Full Drape",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIT868IO6r4sSPeZmxt3egbO-zl5Lk1ZzPNIuxOBnGDX3F3RCpAeUAeVJMqiBOE1tyj8aU80KfcG9JGY-YFYI_u-sbX77couLzG9LW4Myb6vwZMSzAttaJybsXU8sXEuwVJXLCrFpE78l3eHROZ8KlTRqEQi-umUUrGscqpL1TzX3-3BnyI5ggMjtfDR4JH2CKHDJDnD50e6mBgOlMN4r3YEdEn3MHob2DlJMvB7aaVT2sj56FsiGPg",
      },
      {
        label: "Border Detail",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIT868IO6r4sSPeZmxt3egbO-zl5Lk1ZzPNIuxOBnGDX3F3RCpAeUAeVJMqiBOE1tyj8aU80KfcG9JGY-YFYI_u-sbX77couLzG9LW4Myb6vwZMSzAttaJybsXU8sXEuwVJXLCrFpE78l3eHROZ8KlTRqEQi-umUUrGscqpL1TzX3-3BnyI5ggMjtfDR4JH2CKHDJDnD50e6mBgOlMN4r3YEdEn3MHob2DlJMvB7aaVT2sj56FsiGPg",
      },
      {
        label: "Weave Close",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIT868IO6r4sSPeZmxt3egbO-zl5Lk1ZzPNIuxOBnGDX3F3RCpAeUAeVJMqiBOE1tyj8aU80KfcG9JGY-YFYI_u-sbX77couLzG9LW4Myb6vwZMSzAttaJybsXU8sXEuwVJXLCrFpE78l3eHROZ8KlTRqEQi-umUUrGscqpL1TzX3-3BnyI5ggMjtfDR4JH2CKHDJDnD50e6mBgOlMN4r3YEdEn3MHob2DlJMvB7aaVT2sj56FsiGPg",
      },
      {
        label: "Fold",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWIT868IO6r4sSPeZmxt3egbO-zl5Lk1ZzPNIuxOBnGDX3F3RCpAeUAeVJMqiBOE1tyj8aU80KfcG9JGY-YFYI_u-sbX77couLzG9LW4Myb6vwZMSzAttaJybsXU8sXEuwVJXLCrFpE78l3eHROZ8KlTRqEQi-umUUrGscqpL1TzX3-3BnyI5ggMjtfDR4JH2CKHDJDnD50e6mBgOlMN4r3YEdEn3MHob2DlJMvB7aaVT2sj56FsiGPg",
      },
    ],
    color_options: [
      { name: "Ivory Cream", colorClass: "bg-amber-100" },
      { name: "Peacock Blue", colorClass: "bg-cyan-700" },
      { name: "Rose Mauve", colorClass: "bg-rose-400" },
    ],
    quick_specs: [
      { icon: "straighten", color: "text-primary", title: "6 Yards", subtitle: "Standard length" },
      { icon: "water_drop", color: "text-secondary", title: "100% Cotton", subtitle: "Breathable weave" },
      { icon: "verified", color: "text-tertiary", title: "GI Certified", subtitle: "Tangail origin" },
      { icon: "handshake", color: "text-primary", title: "Hand-Woven", subtitle: "Traditional loom" },
    ],
    specs: [
      {
        section: "Textile Specifications",
        icon: "texture",
        color: "text-primary",
        rows: [
          { label: "Material", value: "100% Fine Count Cotton (80s thread)" },
          { label: "Length x Width", value: "6 Yards x 47 inches" },
          { label: "Weaving Style", value: "Jamdani Extra Weft Pattern" },
          { label: "Border Design", value: "Geometric Koniapur Motif" },
          { label: "Care Instructions", value: "Hand wash cold, shade dry" },
        ],
      },
      {
        section: "Provenance & Certification",
        icon: "workspace_premium",
        color: "text-secondary",
        rows: [
          { label: "Origin", value: "Tangail District, Bangladesh" },
          { label: "GI Tag", value: "Tangail Saree – GI Certified 2023" },
          { label: "Master Weaver", value: "Anokhi Studio Artisan Collective" },
          { label: "Loom Age", value: "Traditional Pitt Loom (100+ years)" },
          { label: "Production Time", value: "7-10 days per saree" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  "voltprime-65w-charger": {
    id: "voltprime-65w-charger",
    shop_id: "shop-apex-artisanal",
    name: "VoltPrime 65W GaN Charger",
    name_bn: "ভোল্টপ্রাইম ৬৫ওয়াট গ্যান চার্জার",
    description:
      "Ultra-compact 65W GaN charger with 3 ports, simultaneous multi-device charging, and intelligent power distribution chip. Travel-ready with global voltage support.",
    price: 1850,
    original_price: 2400,
    initial_stock: 50,
    current_stock: 18,
    low_stock_threshold: 5,
    is_out_of_stock: false,
    is_active: true,
    has_variants: false,
    images: [],
    category: "Tech Hub",
    rating: 4.7,
    reviews_count: 243,
    badge: "65W GaN",
    badge_variant: "tertiary",
    stock_label: "18 units in stock • Dhanmondi",
    dispatch_info: "Express Dhaka Dispatch in 24 hrs via Pathao",
    gallery: [
      {
        label: "Overview",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TzBYEprnASzpC632ZDWA8E8eyOoTxDUk0zgWqt_I6QUM_9eMw0dhZlRoWg5013T675TTGznB6BUIJylGctG9xASxxNbQGrl_gEF3bU3UgxABTMYGQSlek_lHnAgUtR7CsndPIiJ885CYUJ4Ta1iPoGTwChPbHXzx7b8Xjx9UUbGlTY2gsFefEFsUxapjZQb86xoI8hLiplFl44b1YRKqbbF9ehogbEBBMTXtqVszDkwqwhf4BTFc4w",
      },
      {
        label: "Ports",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TzBYEprnASzpC632ZDWA8E8eyOoTxDUk0zgWqt_I6QUM_9eMw0dhZlRoWg5013T675TTGznB6BUIJylGctG9xASxxNbQGrl_gEF3bU3UgxABTMYGQSlek_lHnAgUtR7CsndPIiJ885CYUJ4Ta1iPoGTwChPbHXzx7b8Xjx9UUbGlTY2gsFefEFsUxapjZQb86xoI8hLiplFl44b1YRKqbbF9ehogbEBBMTXtqVszDkwqwhf4BTFc4w",
      },
      {
        label: "Scale",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TzBYEprnASzpC632ZDWA8E8eyOoTxDUk0zgWqt_I6QUM_9eMw0dhZlRoWg5013T675TTGznB6BUIJylGctG9xASxxNbQGrl_gEF3bU3UgxABTMYGQSlek_lHnAgUtR7CsndPIiJ885CYUJ4Ta1iPoGTwChPbHXzx7b8Xjx9UUbGlTY2gsFefEFsUxapjZQb86xoI8hLiplFl44b1YRKqbbF9ehogbEBBMTXtqVszDkwqwhf4BTFc4w",
      },
      {
        label: "Box",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TzBYEprnASzpC632ZDWA8E8eyOoTxDUk0zgWqt_I6QUM_9eMw0dhZlRoWg5013T675TTGznB6BUIJylGctG9xASxxNbQGrl_gEF3bU3UgxABTMYGQSlek_lHnAgUtR7CsndPIiJ885CYUJ4Ta1iPoGTwChPbHXzx7b8Xjx9UUbGlTY2gsFefEFsUxapjZQb86xoI8hLiplFl44b1YRKqbbF9ehogbEBBMTXtqVszDkwqwhf4BTFc4w",
      },
    ],
    color_options: [
      { name: "Matte Black", colorClass: "bg-zinc-900" },
      { name: "Frost White", colorClass: "bg-slate-100" },
    ],
    quick_specs: [
      { icon: "bolt", color: "text-primary", title: "65W Max", subtitle: "GaN Tech" },
      { icon: "usb", color: "text-secondary", title: "3 Ports", subtitle: "2C + 1A" },
      { icon: "travel_explore", color: "text-tertiary", title: "Global Voltage", subtitle: "100-240V" },
      { icon: "compress", color: "text-primary", title: "Super Compact", subtitle: "58g only" },
    ],
    specs: [
      {
        section: "Power & Charging",
        icon: "bolt",
        color: "text-primary",
        rows: [
          { label: "Total Output", value: "65W Maximum (Dynamic Distribution)" },
          { label: "Port 1 (USB-C)", value: "45W PD 3.0 / PPS" },
          { label: "Port 2 (USB-C)", value: "20W PD 3.0" },
          { label: "Port 3 (USB-A)", value: "18W QC 3.0" },
          { label: "Fast Charging Protocol", value: "PD3.0, QC3.0, PPS, AFC, FCP" },
        ],
      },
      {
        section: "Build & Safety",
        icon: "shield",
        color: "text-secondary",
        rows: [
          { label: "Technology", value: "3rd Gen Gallium Nitride (GaN)" },
          { label: "Input Voltage", value: "100-240V AC Universal" },
          { label: "Weight", value: "58 grams (Ultra-Light)" },
          { label: "Dimensions", value: "45 × 45 × 34mm" },
          { label: "Safety Features", value: "OVP, OCP, OTP, SCP Protection" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  "pure-centella-ampoule": {
    id: "pure-centella-ampoule",
    shop_id: "shop-pure-glow",
    name: "Pure Centella 100ml Ampoule",
    name_bn: "পিউর সেন্টেলা ১০০ মিলি আম্পুল",
    description:
      "Clinical-grade Centella Asiatica (CICA) ampoule with 98% pure extract concentration. Intensively repairs damaged skin barrier, reduces redness and inflammation.",
    price: 1650,
    original_price: 2100,
    initial_stock: 40,
    current_stock: 9,
    low_stock_threshold: 5,
    is_out_of_stock: false,
    is_active: true,
    has_variants: false,
    images: [],
    category: "Skincare",
    rating: 4.8,
    reviews_count: 167,
    badge: "98% CICA Extract",
    badge_variant: "secondary",
    stock_label: "9 units in stock • Uttara Hub",
    dispatch_info: "Cool-chain Express Dispatch in 24 hrs",
    gallery: [
      {
        label: "Bottle",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDasgckhLJOGXZ88qG2h4cToX9bq68Y2YQHJFW1l5HxoQIbMGX0a-eg7u12jZNJlQZh-b71l9aikHFuV3fdr78isaq9boQ8VltqUh1r3dNWhT3W6DT6sFPccQLm1b0i7iWJ4PKdPAvOWWcMNCsn6BRNLL9RG2_c-GRIIcDOTHSDJLpQY0Kh0SjuhEwQvKxE04oz-f9vD0RWTazgUzl7TjESp580ru_pbcI9xFH_jBwfkNNYe7SQ6MxzcQ",
      },
      {
        label: "Texture",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDasgckhLJOGXZ88qG2h4cToX9bq68Y2YQHJFW1l5HxoQIbMGX0a-eg7u12jZNJlQZh-b71l9aikHFuV3fdr78isaq9boQ8VltqUh1r3dNWhT3W6DT6sFPccQLm1b0i7iWJ4PKdPAvOWWcMNCsn6BRNLL9RG2_c-GRIIcDOTHSDJLpQY0Kh0SjuhEwQvKxE04oz-f9vD0RWTazgUzl7TjESp580ru_pbcI9xFH_jBwfkNNYe7SQ6MxzcQ",
      },
      {
        label: "Ingredients",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDasgckhLJOGXZ88qG2h4cToX9bq68Y2YQHJFW1l5HxoQIbMGX0a-eg7u12jZNJlQZh-b71l9aikHFuV3fdr78isaq9boQ8VltqUh1r3dNWhT3W6DT6sFPccQLm1b0i7iWJ4PKdPAvOWWcMNCsn6BRNLL9RG2_c-GRIIcDOTHSDJLpQY0Kh0SjuhEwQvKxE04oz-f9vD0RWTazgUzl7TjESp580ru_pbcI9xFH_jBwfkNNYe7SQ6MxzcQ",
      },
      {
        label: "Box",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDasgckhLJOGXZ88qG2h4cToX9bq68Y2YQHJFW1l5HxoQIbMGX0a-eg7u12jZNJlQZh-b71l9aikHFuV3fdr78isaq9boQ8VltqUh1r3dNWhT3W6DT6sFPccQLm1b0i7iWJ4PKdPAvOWWcMNCsn6BRNLL9RG2_c-GRIIcDOTHSDJLpQY0Kh0SjuhEwQvKxE04oz-f9vD0RWTazgUzl7TjESp580ru_pbcI9xFH_jBwfkNNYe7SQ6MxzcQ",
      },
    ],
    color_options: [],
    quick_specs: [
      { icon: "science", color: "text-primary", title: "98% CICA", subtitle: "Pure extract" },
      { icon: "water_drop", color: "text-secondary", title: "Hydrating", subtitle: "Barrier repair" },
      { icon: "spa", color: "text-tertiary", title: "Calming", subtitle: "Anti-redness" },
      { icon: "verified", color: "text-primary", title: "Dermatologist", subtitle: "Tested & approved" },
    ],
    specs: [
      {
        section: "Active Formula",
        icon: "science",
        color: "text-primary",
        rows: [
          { label: "Key Ingredient", value: "Centella Asiatica Leaf Extract 98%" },
          { label: "Secondary Actives", value: "Madecassoside, Asiaticoside, Asiatic Acid" },
          { label: "pH Level", value: "5.5 – 6.0 (Skin-Optimized)" },
          { label: "Texture", value: "Lightweight Clear Gel-Serum" },
          { label: "Fragrance", value: "Fragrance-Free & EWG Verified" },
        ],
      },
      {
        section: "Skin Benefits & Usage",
        icon: "spa",
        color: "text-secondary",
        rows: [
          { label: "Primary Benefit", value: "Damaged Skin Barrier Intensive Repair" },
          { label: "Anti-Inflammatory", value: "Clinically Reduces Redness 67% in 4 Weeks" },
          { label: "Hydration Lock", value: "Ceramide Blend Moisture Retention" },
          { label: "Usage", value: "AM & PM After Toner, Before Moisturizer" },
          { label: "Suitable For", value: "All Skin Types incl. Sensitive & Acne-Prone" },
        ],
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

export function getProduct(id: string): ProductCatalogItem | null {
  return PRODUCT_CATALOG[id] ?? null;
}

export function getAllProducts(): ProductCatalogItem[] {
  return Object.values(PRODUCT_CATALOG);
}
