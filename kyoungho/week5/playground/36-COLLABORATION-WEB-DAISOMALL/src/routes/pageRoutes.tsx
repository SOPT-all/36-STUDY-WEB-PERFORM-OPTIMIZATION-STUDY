import { lazy } from 'react';
import type { RouteType } from '@app-types/routeType';
import routePath from '@routes/routePath';

// 페이지 컴포넌트들을 lazy loading으로 코드 분할
const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage/ProductDetailPage'));
const StoreSearchPage = lazy(() => import('@pages/StoreSearchPage/StoreSearchPage'));

const pageRoutes: RouteType[] = [
  {
    path: routePath.HOME,
    element: <HomePage />,
  },

  {
    path: routePath.STORE_LIST,
    element: <StoreSearchPage />,
  },

  {
    path: routePath.PRODUCT_DETAIL,
    element: <ProductDetailPage />,
  },

  // 임시 테스트용 경로
  {
    path: '/product-detail/1',
    element: <ProductDetailPage />,
  },

];

export default pageRoutes;
