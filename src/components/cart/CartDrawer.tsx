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
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md shadow-2xl"
          >
            <div className="h-full flex flex-col bg-white border-l border-slate-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingBag size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-slate-900">
                      Your Shopping Cart
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {itemCount()} item{itemCount() !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all"
                  id="close-cart-btn"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-hide">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-xs">
                      Discover amazing products and add them here to order
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
                          className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 relative">
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
                            <h4 className="text-sm font-semibold text-slate-900 truncate">
                              {item.product.name}
                            </h4>
                            {item.selectedVariant && (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                {[
                                  item.selectedVariant.color,
                                  item.selectedVariant.size,
                                ]
                                  .filter(Boolean)
                                  .join(" / ")}
                              </p>
                            )}
                            <p className="text-sm font-bold text-primary mt-1">
                              {formatPrice(price)}
                            </p>

                            {/* Quantity + Remove */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-xs">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1,
                                      item.selectedVariant?.id
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-slate-900">
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
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-all"
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
                                className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
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
                <div className="border-t border-slate-200 px-6 py-5 space-y-4 bg-slate-50">
                  {/* Clear all */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={clearCart}
                      className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
                    >
                      Clear all items
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">
                        Subtotal:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(subtotal())}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout" onClick={closeCart} className="block">
                    <Button variant="primary" size="lg" className="w-full group shadow-md shadow-primary/25">
                      Proceed to Checkout
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>

                  <p className="text-center text-[11px] text-slate-500 font-medium">
                    Shipping & taxes calculated at checkout
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
