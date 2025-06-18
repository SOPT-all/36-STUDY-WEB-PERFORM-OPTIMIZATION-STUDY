import { Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@shared/components/Loading/Loading';
import Header from '@shared/components/header/Header';

// Footer를 지연 로딩
const LazyFooter = lazy(() => import('@shared/components/footer/Footer'));

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <LazyFooter />
      </Suspense>
    </>
  );
};

export default Layout;
