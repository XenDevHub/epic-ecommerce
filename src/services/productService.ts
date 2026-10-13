import api from "@/lib/api";
import type { PaginatedResponse } from "@/types";
import type { PublicProduct } from "@/types/api";

// ── Product Service — talks to Xeni 2.0 /api/public/products ──

export interface ProductFilters {
  page?: number;
  per_page?: number;
  q?: string;
  shop_id?: string;
  sort?: "created_at" | "price_asc" | "price_desc" | "popular";
}

export const productService = {
  /** List all active products with pagination, search, and sorting */
  async list(filters: ProductFilters = {}): Promise<PaginatedResponse<PublicProduct>> {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", String(filters.page));
    if (filters.per_page) params.set("per_page", String(filters.per_page));
    if (filters.q) params.set("q", filters.q);
    if (filters.shop_id) params.set("shop_id", filters.shop_id);
    if (filters.sort) params.set("sort", filters.sort);

    const { data } = await api.get(`/public/products?${params.toString()}`);
    return data;
  },

  /** Get a single product by ID */
  async getById(id: string): Promise<PublicProduct> {
    const { data } = await api.get(`/public/products/${id}`);
    return data.data;
  },
};
