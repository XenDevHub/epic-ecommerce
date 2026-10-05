import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string
  ) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedVariant?.id === variant?.id
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex].quantity += 1;
          set({ items: updated });
        } else {
          set({
            items: [...items, { product, quantity: 1, selectedVariant: variant }],
          });
        }
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedVariant?.id === variantId
              )
          ),
        });
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId &&
            item.selectedVariant?.id === variantId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, item) => {
          const basePrice = item.product.price;
          const modifier = item.selectedVariant?.price_modifier ?? 0;
          return sum + (basePrice + modifier) * item.quantity;
        }, 0),
    }),
    {
      name: "epic-cart",
    }
  )
);
