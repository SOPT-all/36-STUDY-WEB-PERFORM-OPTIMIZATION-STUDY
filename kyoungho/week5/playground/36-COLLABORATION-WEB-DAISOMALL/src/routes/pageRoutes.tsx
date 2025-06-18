import type { RouteType } from '@app-types/routeType';
import HomePage from '@pages/HomePage/HomePage';
import ProductDetailPage from '@pages/ProductDetailPage/ProductDetailPage';
import StoreSearchPage from '@pages/StoreSearchPage/StoreSearchPage';
import routePath from '@routes/routePath';

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
