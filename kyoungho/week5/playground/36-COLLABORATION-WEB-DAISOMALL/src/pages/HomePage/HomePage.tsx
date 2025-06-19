import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
import * as H from '@pages/HomePage/HomeSectionCard/HomeSectionCard.style';
import HomeCarousel from '@components/homeCarousel/HomeCarousel';
import QuickMenuBar from '@pages/HomePage/quickMenuBar/QuickMenuBar';
import HomeDivider from '@pages/HomePage/HomeDivider/HomeDivider';
import Divider from '@components/common/divider/Divider';
import HomeSectionCard from '@pages/HomePage/HomeSectionCard/HomeSectionCard';
import SpecialSection from '@pages/HomePage/SpecialSection/HomeSectionCard';
import Header from '@components/Header/Header';
import HeaderNav from '@components/HeaderNav/HeaderNav';
import BottomNav from '@components/BottomNav/BottomNav';
import RankingSection from '@pages/HomePage/RankingSection/RankingSection';
import { getSlideRankingProducts } from '@pages/HomePage/mockData/slideRankingProducts';
import { FIRST_PRODUCTS } from '@pages/HomePage/mockData/section1Data';
import { SECOND_PRODUCTS } from '@pages/HomePage/mockData/section2Data';
import { THIRD_PRODUCTS } from '@pages/HomePage/mockData/section3Data';
import { FOURTH_PRODUCTS } from '@pages/HomePage/mockData/section4Data';

const HomePage = () => {
  const navigate = useNavigate();
  const [rankingPage, setRankingPage] = useState(1);
  
  // 슬라이드 컨텐츠를 useMemo로 최적화
  const slideContents = useMemo(() => getSlideRankingProducts(), []);

  // 네비게이션 핸들러를 useCallback으로 최적화
  const handleStoreSearchClick = useCallback(() => {
    navigate('/store-list', { state: { fromQuickMenu: true } });
  }, [navigate]);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 스크롤 핸들러를 useCallback과 디바운싱으로 최적화
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setShowHeader(currentScrollY < lastScrollY);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // 디바운싱을 위한 타이머
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [handleScroll]);

  return (
    <div css={H.homeWrapper}>
      <div css={H.paddingWrapper} />
      <Header showHeader={showHeader} showLogo showSearchIcon showCartIcon />
      <HeaderNav headerVisible={showHeader} />
      <HomeCarousel />
      <QuickMenuBar onStoreSearchClick={handleStoreSearchClick} />
      <Divider />

      <HomeSectionCard
        title1="오늘의 추천 상품"
        productList={FIRST_PRODUCTS}
        hasBanner
      />
      <HomeDivider />

      <HomeSectionCard
        title1="지금 올라온 따끈따끈 신상"
        subtitle="매일 업데이트 되는 상품들을 만나보세요🔥"
        productList={SECOND_PRODUCTS}
      />
      <HomeDivider />

      <RankingSection
        title1="고객 반응 베스트"
        subtitle="24시간 동안 가장 많이 판매됐어요"
        currentPage={rankingPage}
        onPageChange={setRankingPage}
        contents={slideContents}
      />
      <HomeDivider />

      <SpecialSection
        title1="시원한 얼음 아이스트레이"
        subtitle="시원하게 더위 이겨내세요"
      />
      <HomeDivider />

      <HomeSectionCard
        title1="따스한 햇살 속 피크닉💗"
        subtitle="매장픽업으로 피크닉 준비를 빠르게"
        productList={THIRD_PRODUCTS}
      />
      <HomeDivider />

      <HomeSectionCard
        title1="시원한 얼음 아이스트레이"
        subtitle="시원하게 더위 이겨내세요"
        productList={FOURTH_PRODUCTS}
      />
      <BottomNav />
    </div>
  );
};

export default HomePage;
