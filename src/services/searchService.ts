import api from "@/lib/api";
import type { PublicProduct } from "@/types/api";
import type { PaginatedResponse } from "@/types";

// ── Search Service — talks to Xeni 2.0 /api/public/search ──

export interface SearchParams {
  q: string;
  page?: number;
  per_page?: number;
}

export const searchService = {
  /** Search products by keyword (matches name, name_bn, description) */
  async search(params: SearchParams): Promise<PaginatedResponse<PublicProduct>> {
    const urlParams = new URLSearchParams();
    urlParams.set("q", params.q);
    if (params.page) urlParams.set("page", String(params.page));
    if (params.per_page) urlParams.set("per_page", String(params.per_page));

    const { data } = await api.get(`/public/search?${urlParams.toString()}`);
    return data;
  },
};
