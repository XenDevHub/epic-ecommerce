/**
 * Product Data Adapter
 * 
 * This module provides a unified interface that:
 * 1. Tries fetching from the Xeni 2.0 public API (real backend)
 * 2. Falls back to local mock catalog (for demo/development)
 * 3. Enriches API data with extra display fields (category, rating, gallery etc.)
 *    that the storefront UI needs but the backend doesn't store yet
 * 
 * When the backend adds these fields, this adapter can be simplified to a passthrough.
 */

import { productService, type ProductFilters } from "@/services/productService";
import { PRODUCT_CATALOG, getAllProducts as getMockProducts, getProduct as getMockProduct } from "@/lib/products";
import type { ProductCatalogItem } from "@/lib/products";
import type { PublicProduct } from "@/types/api";
import type { PaginatedResponse } from "@/types";

/** Should we try the live API? Set via NEXT_PUBLIC_API_URL env var */
const USE_LIVE_API = !!process.env.NEXT_PUBLIC_API_URL;

/**
 * Convert a Xeni 2.0 API product into a ProductCatalogItem
 * by enriching with gallery, specs, category etc. from mock catalog if available
 */
export function enrichApiProduct(apiProduct: PublicProduct): ProductCatalogItem {
  // Try to find matching mock data for rich display fields
  const mockMatch = Object.values(PRODUCT_CATALOG).find(
    (m) => m.name.toLowerCase() === apiProduct.name.toLowerCase() || m.id === apiProduct.id
  );

  if (mockMatch) {
    // Use API data for prices/stock (live truth) + mock for display fields
    return {
      ...mockMatch,
      id: apiProduct.id,
      shop_id: apiProduct.shop_id,
      price: apiProduct.price,
      current_stock: apiProduct.current_stock,
      initial_stock: apiProduct.initial_stock,
      is_out_of_stock: apiProduct.is_out_of_stock,
      is_active: apiProduct.is_active,
      has_variants: apiProduct.has_variants,
      created_at: apiProduct.created_at,
      updated_at: apiProduct.updated_at,
    };
  }

  // No mock match — build a minimal ProductCatalogItem from API data
  return {
    id: apiProduct.id,
    shop_id: apiProduct.shop_id,
    name: apiProduct.name,
    name_bn: apiProduct.name_bn,
    description: apiProduct.description,
    price: apiProduct.price,
    initial_stock: apiProduct.initial_stock,
    current_stock: apiProduct.current_stock,
    low_stock_threshold: apiProduct.low_stock_threshold,
    is_out_of_stock: apiProduct.is_out_of_stock,
    is_active: apiProduct.is_active,
    has_variants: apiProduct.has_variants,
    images: apiProduct.images || [],
    created_at: apiProduct.created_at,
    updated_at: apiProduct.updated_at,
    // Display-only enrichments (defaults)
    category: "General",
    rating: 4.5,
    reviews_count: 0,
    gallery: (apiProduct.images || []).map((url, i) => ({
      label: `Image ${i + 1}`,
      url,
    })),
    specs: [],
    quick_specs: [],
    color_options: [],
    stock_label: apiProduct.current_stock > 0
      ? `${apiProduct.current_stock} in stock`
      : "Out of stock",
    dispatch_info: "Standard delivery",
  };
}

/**
 * Get all products — tries API first, falls back to mock
 */
export async function getProducts(filters: ProductFilters = {}): Promise<{
  products: ProductCatalogItem[];
  meta?: PaginatedResponse<unknown>["meta"];
}> {
  if (USE_LIVE_API) {
    try {
      const response = await productService.list(filters);
      const products = (response.data || []).map(enrichApiProduct);
      return { products, meta: response.meta };
    } catch (error) {
      console.warn("[ProductAdapter] API failed, falling back to mock data:", error);
    }
  }

  // Fallback: use local mock data
  let products = getMockProducts();

  // Apply client-side filtering to mock data
  if (filters.q) {
    const q = filters.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.name_bn && p.name_bn.includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (filters.shop_id) {
    products = products.filter((p) => p.shop_id === filters.shop_id);
  }

  if (filters.sort === "price_asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price_desc") {
    products.sort((a, b) => b.price - a.price);
  }

  const page = filters.page || 1;
  const perPage = filters.per_page || 20;
  const start = (page - 1) * perPage;
  const paged = products.slice(start, start + perPage);

  return {
    products: paged,
    meta: {
      page,
      per_page: perPage,
      total: products.length,
      total_pages: Math.ceil(products.length / perPage),
    },
  };
}

/**
 * Get a single product by ID — tries API first, falls back to mock
 */
export async function getProductById(id: string): Promise<ProductCatalogItem | null> {
  if (USE_LIVE_API) {
    try {
      const apiProduct = await productService.getById(id);
      return enrichApiProduct(apiProduct);
    } catch (error) {
      console.warn("[ProductAdapter] API failed for product", id, "- falling back to mock:", error);
    }
  }

  // Fallback
  return getMockProduct(id);
}
