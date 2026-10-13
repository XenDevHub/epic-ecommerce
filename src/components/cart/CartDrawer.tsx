"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { formatPrice, parseImages, placeholderImage } from "@/lib/utils";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } =
    useCartStore();
  const { isCartOpen, closeCart } = useUIStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md shadow-2xl"
          >
            <div className="h-full flex flex-col bg-surface-container border-l border-outline-variant/20 text-on-surface">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/15 bg-surface-container-high/60 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="text-base font-headline-sm font-bold text-on-surface">
                      Your Shopping Cart
                    </h2>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {itemCount()} item{itemCount() !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-highest border border-outline-variant/15 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all"
                  id="close-cart-btn"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-on-surface-variant/40" />
                    </div>
                    <h3 className="text-base font-bold text-on-surface mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-6 max-w-xs">
                      Discover curated drops and authentic products to add here
                    </p>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => {
                      const images = parseImages(item.product.images);
                      const imgSrc = images[0] || placeholderImage(120, 120);
                      const price =
                        item.product.price +
                        (item.selectedVariant?.price_modifier ?? 0);

                      return (
                        <motion.div
                          key={`${item.product.id}-${item.selectedVariant?.id || "base"}`}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30, scale: 0.9 }}
                          className="flex gap-4 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/15 hover:border-outline-variant/30 transition-all group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-xl bg-surface-container-lowest border border-outline-variant/15 overflow-hidden shrink-0 relative">
                            <Image
                              src={imgSrc}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-on-surface truncate">
                              {item.product.name}
                            </h4>
                            {item.selectedVariant && (
                              <p className="text-[11px] text-on-surface-variant mt-0.5">
                                {[
                                  item.selectedVariant.color,
                                  item.selectedVariant.size,
                                ]
                                  .filter(Boolean)
                                  .join(" / ")}
                              </p>
                            )}
                            <p className="text-sm font-bold text-secondary mt-1">
                              {formatPrice(price)}
                            </p>

                            {/* Quantity + Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 bg-surface-container border border-outline-variant/20 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-on-surface">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(
                                    item.product.id,
                                    item.selectedVariant?.id
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant/50 hover:text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-outline-variant/15 px-6 py-5 space-y-4 bg-surface-container-high/50">
                  {/* Clear all & Subtotal */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-on-surface-variant hover:text-error font-medium transition-colors"
                    >
                      Clear all items
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-on-surface-variant">
                        Subtotal:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(subtotal())}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" onClick={closeCart} className="block">
                    <button
                      type="button"
                      className="w-full py-3.5 px-6 rounded-xl bg-primary text-on-primary font-headline-sm text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                    >
                      Proceed to Checkout
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </Link>

                  <p className="text-center text-[11px] text-on-surface-variant/70 font-medium">
                    100% Escrow Protection • Instant bKash &amp; Nagad Refunds
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
