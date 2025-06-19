import { useQuery } from '@tanstack/react-query';
import { getPopularProducts } from '@apis/search/popular';
import type { GetPopularProductsResponseData } from '@app-types/popularProducts'; // 이 import가 있는지 확인

export const usePopularProducts = () => 
  useQuery<GetPopularProductsResponseData>({
    queryKey: ['popularProducts'],
    queryFn: getPopularProducts,
  });