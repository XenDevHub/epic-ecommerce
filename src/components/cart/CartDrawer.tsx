"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import { formatPrice, parseImages, placeholderImage } from "@/lib/utils";
import Button from "@/components/ui/Button";

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
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md"
          >
            <div className="h-full flex flex-col bg-bg-secondary/90 backdrop-blur-2xl border-l border-white/5">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <ShoppingBag size={20} className="text-primary-light" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-text-primary">
                      Your Cart
                    </h2>
                    <p className="text-xs text-text-muted">
                      {itemCount()} item{itemCount() !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
                  id="close-cart-btn"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-text-muted" />
                    </div>
                    <h3 className="text-base font-semibold text-text-secondary mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-text-muted mb-6">
                      Discover amazing products and add them here
                    </p>
                    <Button variant="primary" size="sm" onClick={closeCart}>
                      Start Shopping
                    </Button>
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
                          className="flex gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-xl bg-bg-card overflow-hidden shrink-0 relative">
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
                            <h4 className="text-sm font-medium text-text-primary truncate">
                              {item.product.name}
                            </h4>
                            {item.selectedVariant && (
                              <p className="text-[11px] text-text-muted mt-0.5">
                                {[
                                  item.selectedVariant.color,
                                  item.selectedVariant.size,
                                ]
                                  .filter(Boolean)
                                  .join(" / ")}
                              </p>
                            )}
                            <p className="text-sm font-bold text-primary-light mt-1">
                              {formatPrice(price)}
                            </p>

                            {/* Quantity + Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-8 text-center text-sm font-semibold text-text-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-text-secondary hover:text-text-primary transition-all"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <button
                                onClick={() =>
                                  removeItem(
                                    item.product.id,
                                    item.selectedVariant?.id
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:text-accent-2 hover:bg-accent-2/10 transition-all opacity-0 group-hover:opacity-100"
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
                <div className="border-t border-white/5 px-6 py-5 space-y-4 bg-bg-primary/50 backdrop-blur-xl">
                  {/* Clear all */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={clearCart}
                      className="text-xs text-text-muted hover:text-accent-2 transition-colors"
                    >
                      Clear all
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">
                        Subtotal:
                      </span>
                      <span className="text-lg font-bold gradient-text-primary">
                        {formatPrice(subtotal())}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" onClick={closeCart} className="block">
                    <Button variant="primary" size="lg" className="w-full group">
                      Proceed to Checkout
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>

                  <p className="text-center text-[11px] text-text-muted">
                    Delivery charges calculated at checkout
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
