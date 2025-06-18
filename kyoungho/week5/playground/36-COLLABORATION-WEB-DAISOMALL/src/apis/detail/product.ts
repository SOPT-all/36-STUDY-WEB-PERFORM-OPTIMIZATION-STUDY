import { END_POINT } from '@utils/constants/api/api';
import { instance } from '@apis/instance';
import type { GetProductDetailResponseData, GetReviewsResponseData, GetBrandProductsResponseData, GetPopularProductsResponseData, GetCategoryProductsResponseData } from '@app-types/product';
import type { ApiResponse } from '@app-types/apiResponseType';

export const getProductDetail = async (
  productId: number,
): Promise<GetProductDetailResponseData> => {
  const response = await instance.get<ApiResponse<GetProductDetailResponseData>>(
    END_POINT.GET_PRODUCTS_ID(productId)
  );
  return response.data.data;
};

export const getReviews = async (
  productId: number,
  pageNumber: number = 0,
  pageSize: number = 20,
): Promise<GetReviewsResponseData> => {
  const response = await instance.get<ApiResponse<GetReviewsResponseData>>(
    END_POINT.GET_REVIEWS,
    {
      params: {
        productId,
        pageNumber,
        pageSize,
      },
    }
  );
  return response.data.data;
};

export const getBrandProducts = async (
  brandId: number,
  pageNumber: number = 0,
  pageSize: number = 10,
): Promise<GetBrandProductsResponseData> => {
  const response = await instance.get<ApiResponse<GetBrandProductsResponseData>>(
    END_POINT.GET_BRAND_PRODUCTS(brandId),
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
  return response.data.data;
};

export const getPopularProducts = async (): Promise<GetPopularProductsResponseData> => {
  const response = await instance.get<ApiResponse<GetPopularProductsResponseData>>(
    END_POINT.GET_PRODUCTS_POPULAR
  );
  return response.data.data;
};

export const getCategoryProducts = async (
  category: string = 'BEAUTY_HYGIENE',
  pageNumber: number = 0,
  pageSize: number = 20,
): Promise<GetCategoryProductsResponseData> => {
  const response = await instance.get<ApiResponse<GetCategoryProductsResponseData>>(
    END_POINT.GET_PRODUCTS_CATEGORY,
    {
      params: {
        category,
        pageNumber,
        pageSize,
      },
    }
  );
  return response.data.data;
};
