export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const END_POINT = {
  GET_PRODUCTS_SEARCH: '/api/v1/products/search',
  GET_PRODUCTS_ID: (productId: number) => `/api/v1/products/${productId}`,
  GET_PRODUCTS_POPULAR: '/api/v1/products/popular',
  GET_PRODUCTS_CATEGORY: '/api/v1/products',
  GET_PRODUCTS_SORT: (keyword: string) =>
    `/api/v1/products/search/${keyword}/sort`,
  GET_STORES_BY_PRODUCT_ID: '/api/v1/stores',
  SEARCH_STORES_BY_NAME: '/api/v1/stores/search',
  GET_REVIEWS: '/api/v1/reviews',
  GET_BRAND_PRODUCTS: (brandId: number) => `/api/v1/brands/${brandId}/products`,
} as const;
