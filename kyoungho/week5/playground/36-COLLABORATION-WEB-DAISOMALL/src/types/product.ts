export interface ProductImageInfo {
  productImageId: number;
  imageUrl: string;
  sortOrder: number;
}

export interface GetProductDetailResponseData {
  productId: number;
  productName: string;
  price: string;
  ratingAvg: string;
  reviewCount: string;
  brandName: string;
  productImages: {
    main: ProductImageInfo[];
    detail: ProductImageInfo[];
  };
}

// 리뷰 API 관련 타입들
export interface ReviewImageInfo {
  reviewImageId: number;
  imageUrl: string;
  isMain: boolean;
  sortOrder: number;
}

export interface Review {
  reviewId: number;
  nickname: string;
  profileImageUrl: string;
  rating: number;
  content: string;
  images: ReviewImageInfo[];
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  isLast: boolean;
}

export interface GetReviewsResponseData {
  reviews: Review[];
  pageable: Pageable;
}

// 브랜드별 상품 조회 API 관련 타입들
export interface BrandProduct {
  productId: number;
  productName: string;
  price: number;
  tags: string[];
}

export interface GetBrandProductsResponseData {
  products: BrandProduct[];
  pageable: Pageable;
}

// 인기 상품 조회 API 관련 타입들
export interface PopularProduct {
  productId: number;
  productName: string;
  productCode: string;
  price: number;
  mainImage: string;
}

export interface GetPopularProductsResponseData {
  pages: PopularProduct[][];
  total: number;
}

// 카테고리별 상품 조회 API 관련 타입들
export interface CategoryProduct {
  productId: number;
  productName: string;
  mainImage: string;
  price: number;
  category: string;
  tags: string[];
}

export interface GetCategoryProductsResponseData {
  products: CategoryProduct[];
  pageable: Pageable;
}
