export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  isLast: boolean;
}

export interface SearchedProduct {
  productId: number;
  productName: string;
  productCode: string;
  price: number;
  mainImage: string;
}

export interface SearchProductsResponseData {
  products: SearchedProduct[];
  pageable: Pageable;
}

// 브랜드 타입
export type BrandType = 'VT' | '비즈' | '락앤락';

// 정렬 옵션 타입
export type SortOptionType = '최신순' | '가격 낮은 순' | '가격 높은 순';
