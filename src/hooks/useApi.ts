import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, type ProductFilters } from "@/services/productService";
import { shopService, type ShopFilters } from "@/services/shopService";
import { orderService, type CreateOrderPayload } from "@/services/orderService";
import { searchService, type SearchParams } from "@/services/searchService";

// ── Product Hooks ──

/** Fetch paginated list of all public products */
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.list(filters),
    staleTime: 1000 * 60 * 2, // 2 min
  });
}

/** Fetch a single product by ID */
export function useProduct(id: string | null) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

// ── Shop Hooks ──

/** Fetch paginated list of all public shops */
export function useShops(filters: ShopFilters = {}) {
  return useQuery({
    queryKey: ["shops", filters],
    queryFn: () => shopService.list(filters),
    staleTime: 1000 * 60 * 5,
  });
}

/** Fetch a single shop by ID (includes its products) */
export function useShop(id: string | null) {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: () => shopService.getById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// ── Search Hook ──

/** Search products by keyword */
export function useSearch(params: SearchParams | null) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => searchService.search(params!),
    enabled: !!params?.q && params.q.length >= 2,
    staleTime: 1000 * 60 * 1,
  });
}

// ── Order Hooks ──

/** Create a new order (guest checkout) */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderService.create(payload),
    onSuccess: () => {
      // Invalidate product queries to reflect updated stock
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/** Track an order by ID */
export function useTrackOrder(orderId: string | null) {
  return useQuery({
    queryKey: ["order-tracking", orderId],
    queryFn: () => orderService.track(orderId!),
    enabled: !!orderId,
    staleTime: 1000 * 30, // 30 sec — tracking updates frequently
    refetchInterval: 1000 * 60, // auto-refetch every 60 sec
  });
}
