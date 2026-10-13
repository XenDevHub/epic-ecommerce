import api from "@/lib/api";
import type { PaginatedResponse } from "@/types";
import type { PublicShop } from "@/types/api";

// ── Shop Service — talks to Xeni 2.0 /api/public/shops ──

export interface ShopFilters {
  page?: number;
  per_page?: number;
  q?: string;
}

export const shopService = {
  /** List all active shops with pagination */
  async list(filters: ShopFilters = {}): Promise<PaginatedResponse<PublicShop>> {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", String(filters.page));
    if (filters.per_page) params.set("per_page", String(filters.per_page));
    if (filters.q) params.set("q", filters.q);

    const { data } = await api.get(`/public/shops?${params.toString()}`);
    return data;
  },

  /** Get a single shop by ID (includes its products) */
  async getById(id: string): Promise<PublicShop> {
    const { data } = await api.get(`/public/shops/${id}`);
    return data.data;
  },
};
