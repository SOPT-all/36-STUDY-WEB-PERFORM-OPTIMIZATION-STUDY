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