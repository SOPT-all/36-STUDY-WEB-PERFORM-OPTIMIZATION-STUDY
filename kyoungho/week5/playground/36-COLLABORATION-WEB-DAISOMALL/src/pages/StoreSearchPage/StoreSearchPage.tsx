import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@components/Header/Header';
import Divider from '@components/common/divider/Divider';
import BottomNav from '@components/BottomNav/BottomNav';
import ChatbotButton from '@components/buttons/floatingButtons/ChatbotButton';
import FloatingUpButton from '@components/buttons/floatingButtons/FloatingUpButton';
import StoreNameSearchSection from '@pages/StoreSearchPage/StoreNameSearchSection/StoreNameSearchSection';
import PopularProductsSection from './PopularProductsSection';
import SearchProductsSection from './SearchProductsSection';
import { pageLayoutStyle, contentAreaStyle } from './StoreSearchPage.style';
import { usePopularProducts } from '@hooks/queries/usePopularProducts';

const StoreSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = usePopularProducts();
  const allProducts = data?.pages ? data.pages.flat() : [];
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<{
    productId: number;
    name: string;
    imageUrl: string;
    price: string;
    code?: string;
  } | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  // 홈에서 매장재고 퀵메뉴로 진입했는지 확인
  useEffect(() => {
    const isFromQuickMenu = location.state?.fromQuickMenu;
    if (isFromQuickMenu) {
      // 인기 상품 섹션으로 스크롤
      const popularSection = document.querySelector('#popular-products-section');
      if (popularSection) {
        popularSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setSelectedTab(null);
  };

  const handleProductSelect = (productId: number) => {
    const found = allProducts.find((p) => p.productId === productId);
    if (!found) return;
    setSelectedProduct({
      productId: found.productId,
      name: found.productName,
      imageUrl: found.mainImage,
      price: found.price.toString(),
      code: found.productCode,
    });
  };

  const handleBackButton = () => {
    if (selectedProduct) {
      if (selectedTab) {
        // 매장명 찾기에서 탭이 선택된 상태면 홈으로
        navigate('/');
      } else {
        // 매장명 찾기에서 탭이 선택되지 않은 상태면 이전 검색 결과로
        setSelectedProduct(null);
      }
    } else if (searchKeyword) {
      // 검색 결과 화면이면 인기 상품으로
      setSearchKeyword('');
    } else {
      // 인기 상품 화면이면 홈으로
      navigate('/');
    }
  };

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div css={pageLayoutStyle}>
      <Header 
        showBackButton 
        showTitle 
        title="매장 상품 찾기" 
        showCartIcon 
        onBackClick={handleBackButton}
      />
      <Divider />

      <div css={contentAreaStyle}>
        {selectedProduct ? (
          <StoreNameSearchSection 
            product={selectedProduct} 
            onTabSelect={handleTabSelect}
            selectedTab={selectedTab}
            onSearchClear={() => setSelectedProduct(null)}
            keyword={searchKeyword}
            setKeyword={setSearchKeyword}
          />
        ) : searchKeyword ? (
          <SearchProductsSection
            initialKeyword={searchKeyword}
            onSearchClear={() => setSearchKeyword('')}
            onProductSelect={handleProductSelect}
          />
        ) : (
          <PopularProductsSection
            id="popular-products-section"
            onSearch={handleSearch}
            onProductSelect={handleProductSelect}
          />
        )}
      </div>

      <ChatbotButton />
      <FloatingUpButton />
      <BottomNav />
    </div>
  );
};

export default StoreSearchPage;
