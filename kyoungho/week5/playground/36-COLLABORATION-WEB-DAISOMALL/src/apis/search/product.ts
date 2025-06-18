import { END_POINT } from '@utils/constants/api/api';
import { instance } from '@apis/instance';
import type { SearchProductsResponseData, ApiResponse, SortOptionType } from '@app-types/apiResponseType';

const DEFAULT_PAGE_SIZE = 20;

export const searchProducts = async (
  keyword: string,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
): Promise<SearchProductsResponseData> => {
  const pageSize = Math.max(1, size);
  
  const response = await instance.get<ApiResponse<SearchProductsResponseData>>(
    END_POINT.GET_PRODUCTS_SEARCH,
    {
      params: {
        keyword,
        pageNumber: page,
        pageSize
      }
    }
  );
  return response.data.data;
};

export const getSortedProducts = async (
  keyword: string,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE,
  sortOption: SortOptionType
): Promise<SearchProductsResponseData> => {
  const pageSize = Math.max(1, size);
  
  const encodedKeyword = encodeURIComponent(keyword);
  const response = await instance.get<ApiResponse<SearchProductsResponseData>>(
    END_POINT.GET_PRODUCTS_SORT(encodedKeyword),
    {
      params: {
        pageNumber: page,
        pageSize,
        sortOption
      }
    }
  );
  return response.data.data;
};