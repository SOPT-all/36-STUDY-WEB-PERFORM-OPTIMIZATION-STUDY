import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL, END_POINT } from '@utils/constants/api/api';
import type { ApiResponse } from '@app-types/apiResponseType';
import type { LocationCardDataType } from '@app-types/store';

interface UseStoresByProductParams {
  productId: number;
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
}

export const useStoresByProduct = ({
  productId,
  keyword,
  pageNumber = 0,
  pageSize = 10,
}: UseStoresByProductParams) => {
  const keywordKey = keyword?.trim() ?? '';
  const queryKey = [
    'stores-combined',
    productId,
    keywordKey,
    pageNumber,
    pageSize,
  ];

  return useQuery({
    queryKey,
    queryFn: async () => {
      // 1. 재고 정보 요청
      const stockRes = await axios.get<
        ApiResponse<{ stores: Partial<LocationCardDataType>[] }>
      >(`${BASE_URL}${END_POINT.GET_STORES_BY_PRODUCT_ID}`, {
        params: {
          productId,
          pageNumber,
          pageSize,
        },
      });

      // 2. 매장 정보 요청 (키워드 조건부)
      const storeInfoRes = await axios.get<
        ApiResponse<{ stores: Partial<LocationCardDataType>[] }>
      >(`${BASE_URL}${END_POINT.SEARCH_STORES_BY_NAME}`, {
        params: {
          productId,
          ...(keywordKey ? { keyword: keywordKey } : {}),
          pageNumber,
          pageSize,
        },
      });

      const stockMap = new Map(
        stockRes.data.data.stores.map((store) => [store.storeId, store]),
      );

      const merged = storeInfoRes.data.data.stores.map((store) => {
        const stock = stockMap.get(store.storeId);
        return {
          ...stock,
          ...store,
        } as LocationCardDataType;
      });

      return merged;
    },
    enabled: !!productId,
  });
};
