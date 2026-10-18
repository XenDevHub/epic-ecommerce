# 🚀 E-Pic Marketplace & Xeni-2.0 Integration Tracker

> **ডোমেইন নোট:** `https://xeni.e-pic.co` হলো **Xeni 2.0** গেটওয়ে ব্যাকএন্ডের প্রধান ডোমেইন।  
> এই ফাইলটি প্রজেক্টের প্রতিটি স্টেপ এবং কাজের অগ্রগতি ট্র্যাক করার জন্য তৈরি করা হয়েছে। কোনো কাজ শেষ হলে এখানে `[x]` টিক দেওয়া হবে এবং বিস্তারিত আপডেট রাখা হবে।

---

## 📊 সামগ্রিক অগ্রগতি (Overall Progress)

- **সর্বশেষ আপডেট:** ১৮ অক্টোবর ২০২৬
- **চলমান কাজ:** সকল স্টেপ (Step 1 থেকে Step 5) সফলভাবে সম্পন্ন হয়েছে 🎉
- **অগ্রগতি:** `১০০% সম্পন্ন` (সবগুলো স্টেপ সম্পন্ন)

---

## 📝 মাস্টার চেকলিস্ট (Master Checklist)

- [x] **Step 1: E-Pic Marketplace-এ শপ লিস্টিং ও ডিরেক্টরি পেজ ডায়নামিক করা** ✅ (সম্পন্ন)
  - [x] হোমপেজের (`src/app/page.tsx`) হার্ডকোডেড ৩টি ফেক শপ কার্ড বাদ দিয়ে রিয়েল `useShops()` এপিআই দিয়ে ডায়নামিক রেন্ডারিং।
  - [x] সম্পূর্ণ নতুন ডেডিকেটেড শপ ব্রাউজিং পেজ (`src/app/shops/page.tsx`) তৈরি করা (সার্চ, ক্যাটাগরি, ফিল্টারিং ও পেজিনেশন সহ)।
  - [x] ন্যাভবারে Boutiques লিঙ্ককে সরাসরি `/shops` পেজে রিডাইরেক্ট করা।
  - [x] এরর স্টেট, লোডিং স্কেলিটন ও খালি শপ স্টেট হ্যান্ডেল করা।

- [x] **Step 2: শপ ব্যানার (Shop Banner) সাপোর্ট যুক্ত করা (End-to-End)** ✅ (সম্পন্ন)
  - [x] **Xeni-2.0 Backend:** `Shop` ডাটাবেজ মডেলে (`gateway/internal/models/shop.go`) `ShopBannerURL` ফিল্ড যুক্ত করা ও মাইগ্রেশন কনফিগার করা।
  - [x] **Xeni-2.0 Public API:** `PublicShopResponse` DTO-তে `shop_banner_url` এক্সপোজ করা (`gateway/internal/public/handler.go`)।
  - [x] **Xeni-2.0 Merchant API:** `CreateShop` ও `UpdateMyShop`-এ `shop_banner_url` ফিল্ড রিসিভ ও ডাটাবেজে সংরক্ষণ করা (`gateway/internal/shop/handler.go`)।
  - [x] **Xeni-2.0 Seller Dashboard:** সেলার ড্যাশবোর্ডে (`dashboard/shop/page.tsx`) শপ ব্যানার আপলোড / ইউআরএল সেট করার ইনপুট ও লাইভ ইমেজ প্রিভিউ যোগ করা।
  - [x] **E-Pic Marketplace:** শপ প্রোফাইল পেজে (`src/app/shops/[id]/page.tsx`) এবং শপ কার্ডগুলোতে আসল ব্যানার ডিসপ্লে করা।

- [x] **Step 3: SSLCommerz ও অনলাইন পেমেন্ট গেটওয়ে ইন্টিগ্রেশন** ✅ (সম্পন্ন)
  - [x] **Xeni-2.0 Backend:** 
    - `Shop` মডেলে মার্চেন্টের নিজস্ব SSLCommerz ক্রেডেনশিয়ালস (`sslcommerz_store_id`, `sslcommerz_store_passwd`, `sslcommerz_is_live`) যুক্ত করা।
    - `OrderPaymentMethod` এ `PaymentSSLCommerz` ("sslcommerz") যোগ করা।
    - SSLCommerz সেশন ইনিশিয়ালাইজেশন এপিআই তৈরি করা (`/api/public/payments/sslcommerz/init`) যা ডায়নামিকালি সংশ্লিষ্ট শপের `Store ID` ও `Password` ব্যবহার করে (না থাকলে প্ল্যাটফর্ম ফলব্যাক ব্যবহার করে)।
    - পেমেন্ট ভেরিফিকেশন সাকসেস, ফেইল, ক্যান্সেল ও IPN ওয়েবহুক হ্যান্ডলার তৈরি করা (`gateway/internal/public/payment.go`)।
  - [x] **Xeni-2.0 Seller Dashboard:** শপ সেটিংসে (`dashboard/shop/page.tsx`) SSLCommerz Store ID, Store Password ও Live Mode কনফিগারেশন যোগ করা।
  - [x] **E-Pic Marketplace:** 
    - চেকআউট পেজে (`src/app/checkout/page.tsx`) কার্ড পেমেন্ট সিলেক্ট করলে ডায়নামিকালি SSLCommerz গেটওয়েতে রিডাইরেক্ট করা ও অর্ডার ভেরিফিকেশন ফ্লো চালু করা।

- [x] **Step 4: E-Pic Marketplace-এ কাস্টমার অথেন্টিকেশন UI তৈরি করা** ✅ (সম্পন্ন)
  - [x] প্রিমিয়াম গ্লাসইউআই `AuthModal` কম্পোনেন্ট তৈরি করা (`src/components/auth/AuthModal.tsx`)।
  - [x] Resend-এর মাধ্যমে ইমেইল OTP ভেরিফিকেশন এবং পাসওয়ার্ড রিসেট ফ্লো যুক্ত করা।
  - [x] Google OAuth বাটন ইন্টিগ্রেশন (`/api/auth/google`)।
  - [x] গ্লোবাল প্রোভাইডার্স (`Providers.tsx`) এবং UI স্টোরে (`uiStore.ts`) মডাল স্টেট ম্যানেজমেন্ট যোগ করা।
  - [x] ন্যাভবার ও একাউন্ট পেজে ডায়নামিক কাস্টমার প্রোফাইল ও Sign In / Logout বাটন ইন্টিগ্রেশন।

- [x] **Step 5: Xeni-2.0 ডিপ্লয়মেন্ট ও ডাটাবেজ আইসোলেশন নিশ্চিত করা** ✅ (সম্পন্ন)
  - [x] `xeni-2.0/.github/workflows/deploy.yml` ফাইলে রিপোজিটরি ক্লোনিং ঠিক করা (`xeni.git` এর জায়গায় `xeni-2.0.git`, `fetch` ও `reset --hard` যুক্ত করা)।
  - [x] `docker-compose.prod.yml`-এ সব ইমেজ পাথ `ghcr.io/xendevhub/xeni-2.0/*` এ আপডেট করা।
  - [x] `gateway/internal/database/database.go` এ অটো-মাইগ্রেশন নিশ্চিতকরণ কোড যোগ করা (`shop_banner_url`, `sslcommerz_*`, `order_payment_method` enum ভ্যালু)।
  - [x] `infra/postgres/init.sql`-এ `order_payment_method` এনামে `'sslcommerz'` অন্তর্ভুক্ত করা।
  - [x] `xeni.e-pic.co` সার্ভারে ডিপ্লয় হলে যেন সরাসরি Xeni 2.0 এর ডাটাবেজ ও নতুন শপ ও প্রডাক্ট লোড করে তা কনফার্ম করা।

---

## 🔑 প্রয়োজনীয় এপিআই কি ও ক্রেডেনশিয়ালস রেফারেন্স

| ক্রেডেনশিয়াল | প্রয়োজন কার কাছে | স্ট্যাটাস |
| :--- | :--- | :--- |
| **SSLCommerz Store ID & Pass** | Step 3 (পেমেন্ট) | ⏳ অপেক্ষমাণ (Sandbox দিয়ে কাজ শুরু করা যাবে) |
| **Google Client ID** | Step 4 (লগইন) | ⏳ অপেক্ষমাণ |
| **Resend API Key** | Step 4 (ইমেইল OTP) | ⏳ অপেক্ষমাণ |
| **Xeni 2.0 Droplet/DB Sync** | Step 5 (ডিপ্লয়) | ⏳ অপেক্ষমাণ |

---

> 💡 **নোট:** আপনি যেকোনো সময় ফিরে এসে এই ফাইলটি চেক করলে দেখতে পারবেন কোন স্টেপ পর্যন্ত কাজ শেষ হয়েছে এবং পরবর্তী কাজ কী।
