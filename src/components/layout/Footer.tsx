"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant pt-16 pb-12 mt-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Manifesto */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary via-secondary to-tertiary p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-surface-container-lowest rounded-[10px] flex items-center justify-center">
                <span className="font-headline-sm text-sm font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EP
                </span>
              </div>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              E-Pic Marketplace
            </span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant/80 max-w-sm leading-relaxed">
            The hyper-velocity decentralized commerce engine engineered for
            Bangladesh and Southeast Asia. Real-time distributed stock control
            powered by Xeni Commerce Architecture.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-secondary text-base">
                verified_user
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                100% Escrow Protected
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-tertiary text-base">
                sync_saved_locally
              </span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Live Xeni ERP Mesh
              </span>
            </div>
          </div>
        </div>

        {/* Customer Service */}
        <div className="space-y-3">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold block">
            Customer Service
          </span>
          <ul className="space-y-2 font-body-sm text-body-sm">
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Instant bKash / Nagad Refunds
            </li>
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Cash on Delivery (COD) Terms
            </li>
            <li>
              <Link
                href="/tracking"
                className="hover:text-on-surface transition-colors"
              >
                Track Active Consignment
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="hover:text-on-surface transition-colors"
              >
                Escrow Guarantee Coverage
              </Link>
            </li>
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Dispute Resolution Portal
            </li>
          </ul>
        </div>

        {/* Sellers & Partners */}
        <div className="space-y-3">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold block">
            For Sellers &amp; Partners
          </span>
          <ul className="space-y-2 font-body-sm text-body-sm">
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Xeni ERP Cloud Integration
            </li>
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Decentralized Logistics API
            </li>
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Dhaka &amp; Regional Hub Fulfillment
            </li>
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              Merchant Escrow Payouts
            </li>
            <li className="hover:text-on-surface transition-colors cursor-pointer">
              AI Inventory Forecaster
            </li>
          </ul>
        </div>

        {/* Authorized Gateways */}
        <div className="space-y-4">
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-bold block">
            Authorized Gateways
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#E2136E]/20 text-[#ff7bb1] font-label-sm text-label-sm font-bold shadow-sm">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F7921E]/20 text-[#ffbe76] font-label-sm text-label-sm font-bold shadow-sm">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm shadow-sm">
              Visa
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm shadow-sm">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm shadow-sm">
              AMEX
            </span>
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-medium text-on-surface-variant/70 block uppercase tracking-wider">
              Download E-Pic App
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base text-primary">
                  android
                </span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  Play Store
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base text-tertiary">
                  phone_iphone
                </span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  App Store
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 mt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-4">
        <span>
          &copy; 2025 E-Pic Marketplace &amp; Xeni Commerce Ecosystem. All
          rights reserved.
        </span>
        <div className="flex items-center gap-6">
          <span className="hover:text-on-surface cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-on-surface cursor-pointer">
            Terms of Escrow
          </span>
          <span className="hover:text-on-surface cursor-pointer">
            Merchant Agreement
          </span>
        </div>
      </div>
    </footer>
  );
}
