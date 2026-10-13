// ── Types matching Xeni 2.0 public API response structures ──

/** Product variant from Xeni 2.0 */
export interface PublicProductVariant {
  id: string;
  sku: string;
  color?: string;
  size?: string;
  stock: number;
  price_modifier: number;
}

/** Product as returned by Xeni 2.0 /api/public/products */
export interface PublicProduct {
  id: string;
  shop_id: string;
  shop_name: string;
  shop_logo_url?: string;
  name: string;
  name_bn?: string;
  description?: string;
  description_bn?: string;
  price: number;
  sku?: string;
  initial_stock: number;
  current_stock: number;
  low_stock_threshold: number;
  is_active: boolean;
  is_out_of_stock: boolean;
  has_variants: boolean;
  total_sold: number;
  images: string[];
  variants?: PublicProductVariant[];
  created_at: string;
  updated_at: string;
}

/** Shop as returned by Xeni 2.0 /api/public/shops */
export interface PublicShop {
  id: string;
  shop_name: string;
  shop_description?: string;
  shop_logo_url?: string;
  district?: string;
  bkash_merchant_number?: string;
  nagad_merchant_number?: string;
  delivery_charge_inside: number;
  delivery_charge_outside: number;
  courier_preference: string;
  total_products: number;
  products?: PublicProduct[];
  created_at: string;
}

/** Response from POST /api/public/orders */
export interface PublicOrderResponse {
  order_id: string;
  total_amount: number;
  payment_status: string;
  delivery_status: string;
  created_at: string;
  message: string;
}

/** Response from GET /api/public/orders/:id (tracking) */
export interface PublicTrackingResponse {
  order_id: string;
  shop_name: string;
  customer_name?: string;
  customer_phone?: string;
  total_amount: number;
  payment_method?: string;
  payment_status: string;
  delivery_status: string;
  courier_name?: string;
  tracking_number?: string;
  order_items: unknown[];
  notes?: string;
  created_at: string;
  updated_at: string;
}
