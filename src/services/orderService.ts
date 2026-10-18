import api from "@/lib/api";
import type { PublicOrderResponse, PublicTrackingResponse } from "@/types/api";

// ── Order Service — talks to Xeni 2.0 /api/public/orders ──

export interface CreateOrderPayload {
  shop_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  payment_method: "bkash" | "nagad" | "cod" | "sslcommerz";
  payment_trx_id?: string;
  notes?: string;
  order_items: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    price: number;
    name: string;
  }[];
}

export const orderService = {
  /** Place a new order (guest checkout — no auth required) */
  async create(payload: CreateOrderPayload): Promise<PublicOrderResponse> {
    const { data } = await api.post("/public/orders", payload);
    return data.data;
  },

  /** Track an order by ID */
  async track(orderId: string): Promise<PublicTrackingResponse> {
    const { data } = await api.get(`/public/orders/${orderId}`);
    return data.data;
  },

  /** Initialize dynamic SSLCommerz payment session for an order */
  async initSSLCommerz(orderId: string): Promise<{ gateway_url: string; sessionkey: string; order_id: string }> {
    const { data } = await api.post("/public/payments/sslcommerz/init", { order_id: orderId });
    return data.data;
  },
};
