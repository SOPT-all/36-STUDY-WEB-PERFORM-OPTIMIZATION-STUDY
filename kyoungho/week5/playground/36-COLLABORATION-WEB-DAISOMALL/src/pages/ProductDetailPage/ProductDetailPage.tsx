/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ImageCarousel from '@components/ImageCarousel/ImageCarousel';
import ProductPageInfo from '../ProductPage/components/ProductPageInfo';
import ReviewCarousel from './ReviewCarousel/ReviewCarousel';
import PickupInfo from './PickupInfo/PickupInfo';
import PerkInfo from './PerkInfo/PerkInfo';
import ProductCardVertical from '@components/ProductCard/ProductCardVertical/ProductCardVertical';
import NavBar from './NavBar/NavBar';
import BrandInfo from './BrandInfo/BrandInfo';
import ViewMoreButton from '@components/buttons/viewMoreButton/ViewMoreButton';
import SectionTitle from '@components/common/SectionTitle/SectionTitle';
import * as S from './ProductDetailPage.style';
import theme from '@styles/theme';
import Divider from '@components/common/divider/Divider';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BottomCarousel from './components/Carousel/BottomCarousel';
import Review from './components/Review/Review';
import TodayDiscovery from './components/TodayDiscovery/TodayDiscovery';
import Accordion from './components/Accordion/Accordion';
import BuyBar from './components/BuyBar/BuyBar';
import {
  getProductDetail,
  getReviews,
  getBrandProducts,
  getPopularProducts,
  getCategoryProducts,
} from '@apis/detail/product';
import type {
  GetProductDetailResponseData,
  GetReviewsResponseData,
  GetBrandProductsResponseData,
  GetPopularProductsResponseData,
  GetCategoryProductsResponseData,
} from '@app-types/product';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productData, setProductData] =
    useState<GetProductDetailResponseData | null>(null);
  const [reviewData, setReviewData] = useState<GetReviewsResponseData | null>(
    null,
  );
  const [brandProductsData, setBrandProductsData] =
    useState<GetBrandProductsResponseData | null>(null);
  const [popularProductsData, setPopularProductsData] =
    useState<GetPopularProductsResponseData | null>(null);
  const [categoryProductsData, setCategoryProductsData] =
    useState<GetCategoryProductsResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isNavBarSticky, setIsNavBarSticky] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  // 스크롤 대상 섹션들에 대한 ref 추가
  const brandInfoRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const buyBarRef = useRef<HTMLDivElement>(null);

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const id = productId ? parseInt(productId) : 1; // ProductId가 없으면 기본값 1 사용
        console.log('API 요청 - productId:', id);

        // 상품 정보, 리뷰, 브랜드별 상품, 인기 상품, 카테고리별 상품을 병렬로 호출
        const [
          productResponse,
          reviewResponse,
          brandProductsResponse,
          popularProductsResponse,
          categoryProductsResponse,
        ] = await Promise.all([
          getProductDetail(id),
          getReviews(id, 0, 20), // 첫 번째 페이지, 20개씩
          getBrandProducts(1, 0, 10), // BrandId는 1로 고정, 10개씩
          getPopularProducts(), // 인기 상품 조회
          getCategoryProducts('BEAUTY_HYGIENE', 0, 20), // 카테고리별 상품 조회
        ]);

        console.log('상품 API 응답:', productResponse);
        console.log('리뷰 API 응답:', reviewResponse);
        console.log('브랜드별 상품 API 응답:', brandProductsResponse);
        console.log('인기 상품 API 응답:', popularProductsResponse);
        console.log('카테고리별 상품 API 응답:', categoryProductsResponse);

        setProductData(productResponse);
        setReviewData(reviewResponse);
        setBrandProductsData(brandProductsResponse);
        setPopularProductsData(popularProductsResponse);
        setCategoryProductsData(categoryProductsResponse);
      } catch (error) {
        console.error('API 호출 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleExpandImage = () => {
    setIsImageExpanded(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navBarRef.current) {
        const navBarPosition = navBarRef.current.getBoundingClientRect().top;
        setIsNavBarSticky(navBarPosition <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 네비게이션 바 클릭 핸들러 추가
  const handleNavTabClick = (tabId: number) => {
    const navBarHeight = navBarRef.current?.offsetHeight || 0;

    switch (tabId) {
      case 1: // 상품설명 -> 브랜드 정보로 스크롤
        if (brandInfoRef.current) {
          const targetPosition = brandInfoRef.current.offsetTop - navBarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
        break;
      case 2: // 리뷰 -> 리뷰 컴포넌트로 스크롤
        if (reviewRef.current) {
          const targetPosition = reviewRef.current.offsetTop - navBarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
        break;
      case 3: // 상품정보 -> 페이지 최하단으로 스크롤
        if (buyBarRef.current) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }
        break;
    }
  };

  // 로딩 중일 때 표시 (모든 Hook 호출 후)
  if (isLoading) {
    return;
  }

  // API에서 받아온 데이터만 사용 (더미 데이터 제거)
  const productTitle = productData?.productName || '';

  // API 응답 구조에 정확히 맞춘 이미지 처리
  console.log('전체 productData:', productData);
  console.log('productImages 전체:', productData?.productImages);
  console.log('main 배열:', productData?.productImages?.main);
  console.log('detail 배열:', productData?.productImages?.detail);

  // Main 이미지들 (2번 캐러셀용)
  const mainImages =
    productData?.productImages?.main
      ?.map((img) => img.imageUrl)
      .filter(Boolean) || [];

  // Detail 이미지들 (11번 상세 이미지용)
  const detailImages =
    productData?.productImages?.detail
      ?.map((img) => img.imageUrl)
      .filter(Boolean) || [];

  // 리뷰 이미지 수집 및 처리
  const reviewImages =
    reviewData?.reviews?.flatMap(
      (review) =>
        review.images?.map((img) => img.imageUrl).filter(Boolean) || [],
    ) || [];

  console.log('처리된 이미지 배열:', {
    'main 이미지들 (2번 캐러셀용)': mainImages,
    'main 이미지 개수': mainImages.length,
    'detail 이미지들 (11번 상세용)': detailImages,
    'detail 이미지 개수': detailImages.length,
    '리뷰 이미지들 (4번 캐러셀용)': reviewImages,
    '리뷰 이미지 개수': reviewImages.length,
    '전체 리뷰 개수': reviewData?.reviews?.length || 0,
  });

  return (
    <div css={S.productDetailStyle}>
      {/* 1. 헤더 */}
      <Header
        showBackButton={true}
        showTitle={true}
        title={productTitle}
        showSearchIcon={true}
        showCartIcon={true}
        showHomeIcon={true}
      />

      {/* 2. 이미지 캐러셀 - API productImages.main 배열 사용 */}
      <ImageCarousel
        images={mainImages}
        height="50rem"
        showSnsHotBadge={true}
      />

      {/* 3. 상품 정보 */}
      <ProductPageInfo
        brandName={productData?.brandName}
        productName={productData?.productName}
        price={productData?.price}
        ratingAvg={productData?.ratingAvg}
        reviewCount={productData?.reviewCount}
      />

      {/* 4. 리뷰 캐러셀 - API 리뷰 이미지들 사용 */}
      <ReviewCarousel
        isLoading={isLoading}
        imageUrls={reviewImages}
        onMoreClick={() => console.log('리뷰 더보기 클릭')}
      />

      <Divider />

      {/* 5. 픽업 정보 */}
      <PickupInfo />

      <Divider />

      {/* 6. 혜택 정보 */}
      <PerkInfo />

      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 7. 상품 카드 (수직형) - 인기 상품 API 데이터 사용 */}
      {popularProductsData?.pages && popularProductsData.pages.length > 0 && (
        <div css={S.recommendedProductsStyle}>
          <SectionTitle
            title1="다른 고객이 함께 본 상품"
            onClickAll={() =>
              console.log('다른 고객이 함께 본 상품 전체보기 클릭')
            }
          />
          <div css={S.productsHorizontalStyle}>
            {popularProductsData.pages[0]
              ?.slice(0, 5)
              .map((product) => (
                <ProductCardVertical
                  key={product.productId}
                  id={product.productId}
                  size="96"
                  name={product.productName}
                  totalPrice={product.price.toLocaleString()}
                  imageUrl={product.mainImage}
                  tags={[{ label: '인기', bg: '#FF5C5C', color: '#FFFFFF' }]}
                />
              ))}
            {popularProductsData.pages[1]
              ?.slice(0, 3)
              .map((product) => (
                <ProductCardVertical
                  key={product.productId}
                  id={product.productId}
                  size="96"
                  name={product.productName}
                  totalPrice={product.price.toLocaleString()}
                  imageUrl={product.mainImage}
                  tags={[{ label: '인기', bg: '#FF5C5C', color: '#FFFFFF' }]}
                />
              ))}
          </div>
        </div>
      )}

      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 8. 이미지 캐러셀 (두번째) */}
      <BottomCarousel />

      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 9. 네비게이션 바 */}
      {isNavBarSticky && (
        <div css={S.stickyNavBarStyle}>
          <NavBar
            onTabClick={handleNavTabClick}
            reviewCount={reviewData?.reviews?.length}
          />
        </div>
      )}
      <div ref={navBarRef}>
        <NavBar
          onTabClick={handleNavTabClick}
          reviewCount={reviewData?.reviews?.length}
        />
      </div>

      <Divider />

      {/* 10. 브랜드 정보 */}
      <div ref={brandInfoRef}>
        <BrandInfo
          brandName="VT"
          brandDescription="유행을 창조하는 Stylish와 시간에 구애받지 않는 Timeless 효과로 당신의 매일을 함께하는 VT의 스페셜 홈케어! 리들샷의 따끔한 미세자극으로 건강한 피부를 가꿔보세요."
          brandImageUrl="/VT.png"
        />
      </div>

      {/* 11. 이미지 영역 - API productImages.detail 배열의 첫 번째 이미지 사용 */}
      {detailImages.length > 0 && (
        <div
          css={[
            S.imageContainerStyle,
            isImageExpanded ? S.expandedImageStyle : S.collapsedImageStyle,
          ]}
        >
          <img
            src={detailImages[0]}
            alt="상품 상세 이미지"
            style={{ width: '100%', objectFit: 'cover' }}
          />

          {/* 12. 네비게이션 버튼 */}
          {!isImageExpanded && (
            <div css={S.viewMoreButtonWrapper}>
              <ViewMoreButton
                buttonText="상품 상세 정보"
                onExpand={handleExpandImage}
              >
                <div>상품 상세 정보 내용</div>
              </ViewMoreButton>
            </div>
          )}
        </div>
      )}

      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 13 추천 상품 - 브랜드별 상품 API 데이터 사용 */}
      {brandProductsData?.products && brandProductsData.products.length > 0 && (
        <div css={S.recommendedProductsStyle}>
          <SectionTitle
            title1="VT"
            title2="브랜드 상품 모아보기"
            title1Color={theme.colors['gray-03']}
            onClickAll={() => console.log('브랜드 상품 모아보기 클릭')}
            image={
              <img
                src="/VT.png"
                alt="VT 브랜드"
                style={{
                  width: '3.2rem',
                  height: '3.2rem',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            }
          />
          <div css={S.productsHorizontalStyle}>
            {brandProductsData.products.slice(0, 5).map((product, index) => {
              // 다양한 임시 이미지 URL 배열
              const tempImages = [
                '/brand1.png',
                '/brand2.png',
                '/brand3.png',
                '/brand4.png',
                '/brand5.png',
              ];

              return (
                <ProductCardVertical
                  key={product.productId}
                  id={product.productId}
                  size="96"
                  name={product.productName}
                  totalPrice={product.price.toLocaleString()}
                  imageUrl={tempImages[index % tempImages.length]}
                  tags={product.tags.map((tag) => ({
                    label: tag,
                    bg: theme.colors['gray-05'],
                    color: theme.colors['primary'],
                  }))}
                />
              );
            })}
          </div>
        </div>
      )}

      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 14. 관련 상품 추천 */}
      {categoryProductsData?.products &&
        categoryProductsData.products.length > 0 && (
          <div css={S.recommendedProductsStyle}>
            <SectionTitle
              title1="이런 기초스킨케어 상품은 어때요?"
              onClickAll={() =>
                console.log('이런 기초스킨케어 상품은 어때요? 전체보기 클릭')
              }
            />
            <div css={S.productsHorizontalStyle}>
              {categoryProductsData.products.slice(0, 5).map((product) => (
                <ProductCardVertical
                  key={product.productId}
                  id={product.productId}
                  size="96"
                  name={product.productName}
                  totalPrice={product.price.toLocaleString()}
                  imageUrl={product.mainImage}
                  tags={product.tags.map((tag) => ({
                    label: tag,
                    bg: theme.colors['primary'],
                    color: theme.colors['gray-05'],
                  }))}
                />
              ))}
            </div>
          </div>
        )}

      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 15. 오늘의 발견 */}
      <TodayDiscovery />
      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 16. 하단 캐러셀 */}
      <BottomCarousel />
      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 17. 리뷰 */}
      <div ref={reviewRef}>
        <Review
          reviewData={reviewData}
          productData={productData}
          reviewImages={reviewImages}
        />
      </div>
      <Divider height="8px" color={theme.colors['gray-06']} />

      {/* 18. 기타 정보 */}
      <Accordion />
      <div ref={buyBarRef}>
        <BuyBar />
      </div>
    </div>
  );
};

export default ProductDetailPage;
