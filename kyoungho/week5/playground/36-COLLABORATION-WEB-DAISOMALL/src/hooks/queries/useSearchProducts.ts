import { useQuery } from '@tanstack/react-query';
import { searchProducts, getSortedProducts } from '@apis/search/product';
import type { SearchProductsResponseData, SortOptionType } from '@app-types/apiResponseType';

const DEFAULT_PAGE_SIZE = 20;

export const useSearchProducts = (
  keyword: string,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE,
  sort?: SortOptionType
) => 
  useQuery<SearchProductsResponseData>({
    queryKey: ['searchProducts', keyword, page, size, sort],
    queryFn: () => {
      if (sort) {
        return getSortedProducts(keyword, page, size, sort);
      }
      return searchProducts(keyword, page, size);
    },
    enabled: !!keyword, // 검색어가 있을 때만 쿼리 실행
  });