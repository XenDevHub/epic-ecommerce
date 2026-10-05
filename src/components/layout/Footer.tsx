"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Globe,
  Share2,
  MessageCircle,
} from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Fashion", href: "/categories/fashion" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Beauty", href: "/categories/beauty" },
    { label: "Home & Living", href: "/categories/home-living" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Track Order", href: "/account/orders" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Contact Us", href: "/contact" },
  ],
  sellers: [
    { label: "Start Selling", href: "https://xeni.co", external: true },
    { label: "Seller Dashboard", href: "https://xeni.co/login", external: true },
    { label: "Seller Policies", href: "/seller-policies" },
    { label: "Xeni Commerce", href: "https://xeni.co", external: true },
  ],
  company: [
    { label: "About E-Pic", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Blog", href: "/blog" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Newsletter Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-4">
              <Sparkles size={12} />
              Stay Updated
            </div>
            <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
              Get the best deals first
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Subscribe for exclusive offers, new arrivals, and festival deals
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(108,71,255,0.1)] transition-all"
                id="newsletter-email"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold hover:shadow-[0_8px_25px_rgba(108,71,255,0.4)] hover:-translate-y-0.5 transition-all active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-bg-secondary/50 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-xs">E</span>
                </div>
                <span className="text-lg font-display font-bold text-text-primary">
                  E-Pic
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                Bangladesh&apos;s premium marketplace. Free for everyone — no
                seller fees, no hidden charges.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: Globe, href: "#", title: "Website" },
                  { icon: MessageCircle, href: "#", title: "Community" },
                  { icon: Share2, href: "#", title: "Share" },
                ].map(({ icon: Icon, href, title }, i) => (
                  <a
                    key={i}
                    href={href}
                    title={title}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/15 border border-white/5 hover:border-primary/30 flex items-center justify-center text-text-muted hover:text-primary-light transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {(
              Object.entries(footerLinks) as [
                string,
                typeof footerLinks.shop
              ][]
            ).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-widest mb-4">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          {link.label}
                          <ArrowUpRight
                            size={11}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-text-muted hover:text-text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/5">
            {[
              { icon: Phone, text: "+880 1XXX-XXXXXX" },
              { icon: Mail, text: "support@epic.co" },
              { icon: MapPin, text: "Dhaka, Bangladesh" },
            ].map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-text-muted"
              >
                <Icon size={14} className="text-text-muted" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-text-muted">
            <p>© 2026 E-Pic Marketplace. All rights reserved.</p>
            <p>
              Powered by{" "}
              <a
                href="https://xeni.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:text-primary transition-colors font-medium"
              >
                Xeni Commerce
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
