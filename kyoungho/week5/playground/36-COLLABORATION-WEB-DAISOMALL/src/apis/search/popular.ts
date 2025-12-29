import { END_POINT } from '@utils/constants/api/api';
import { instance } from '@apis/instance';
import type { GetPopularProductsResponseData } from '@app-types/popularProducts';
import type { ApiResponse } from '@app-types/apiResponseType';

export const getPopularProducts = async (): Promise<GetPopularProductsResponseData> => {
  const response = await instance.get<ApiResponse<GetPopularProductsResponseData>>(
    END_POINT.GET_PRODUCTS_POPULAR
  );
  return response.data.data;
};