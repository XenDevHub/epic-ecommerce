// ── Product Types ──
export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color?: string;
  size?: string;
  stock: number;
  price_modifier: number;
  created_at: string;
}

export interface Product {
  id: string;
  shop_id: string;
  name: string;
  name_bn?: string;
  description?: string;
  description_bn?: string;
  price: number;
  sku?: string;
  initial_stock: number;
  current_stock: number;
  low_stock_threshold: number;
  is_out_of_stock: boolean;
  is_active: boolean;
  has_variants: boolean;
  images: string[];
  variants?: ProductVariant[];
  created_at: string;
  updated_at: string;
}

// ── Shop Types ──
export interface Shop {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  created_at: string;
}

// ── Order Types ──
export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  variant_id?: string;
  variant_label?: string;
}

export interface Order {
  id: string;
  shop_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  payment_method: string;
  notes?: string;
  created_at: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// ── Cart Types ──
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

// ── API Response Types ──
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  success: boolean;
}

// ── Content Types ──
export interface HeroContent {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_url: string;
  image_url?: string;
  is_active: boolean;
}

export interface BannerContent {
  title: string;
  subtitle?: string;
  image_url?: string;
  link_url?: string;
  is_active: boolean;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  product_name?: string;
  avatar_url?: string;
  created_at: string;
  is_approved: boolean;
  display_order: number;
}

export interface FAQ {
  question: string;
  answer: string;
  order: number;
}
