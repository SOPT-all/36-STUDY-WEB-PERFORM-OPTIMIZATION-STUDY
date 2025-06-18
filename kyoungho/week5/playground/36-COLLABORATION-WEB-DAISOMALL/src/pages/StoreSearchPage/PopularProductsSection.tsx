import * as S from './PopularProductsSection.style';
import SearchBar from '@components/SearchBar/SearchBar';
import ProductCardRanking from '@components/ProductCard/ProductCardRanking/ProductCardRanking';
import Pagination from '@components/pagination/Pagination';
import { useSwipeNavigation } from '@hooks/useSwipeNavigation';
import { usePopularProducts } from '@hooks/queries/usePopularProducts';
import { usePaginationWithPreload } from '@hooks/usePaginationWithPreload';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from './components/storeSearch/StoreSearchStates';

const PAGE_SIZE = 5;

interface PopularProductsSectionProps {
  id?: string;
  onSearch?: (keyword: string) => void;
  onProductSelect?: (productId: number) => void;
}

const PopularProductsSection = ({
  id,
  onSearch,
  onProductSelect,
}: PopularProductsSectionProps) => {
  const { data, isLoading, error } = usePopularProducts();

  const allProducts = data?.pages ? data.pages.flat() : [];

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    pagedItems: pagedProducts,
    swipeHandlers,
  } = usePaginationWithPreload(
    allProducts,
    PAGE_SIZE,
    (product) => product.mainImage,
    data,
    useSwipeNavigation,
  );

  const handleSearch = (keyword: string) => {
    if (onSearch) onSearch(keyword);
  };

  if (isLoading) {
    return <LoadingState placeholder="상품명, 품번, 브랜드" />;
  }
  if (error) {
    return <ErrorState placeholder="상품명, 품번, 브랜드" />;
  }
  if (!data || allProducts.length === 0) {
    return <EmptyState placeholder="상품명, 품번, 브랜드" />;
  }

  return (
    <div css={S.PopularWrapper} {...swipeHandlers} id={id}>
      <SearchBar placeholder="상품명, 품번, 브랜드" onSearch={handleSearch} />
      <div css={S.ResultWrapper}>
        <h2 css={S.Title}>지금 많이 찾는 상품</h2>
        {pagedProducts.map((product, idx) => (
          <div css={S.ProductRow} key={product.productId}>
            <ProductCardRanking
              rank={(currentPage - 1) * PAGE_SIZE + idx + 1}
              imageUrl={product.mainImage}
              name={product.productName}
              price={product.price.toLocaleString()}
              code={product.productCode}
              showCartIcon={false}
              onClick={() => onProductSelect?.(product.productId)}
            />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isActive={true}
          isHome={false}
        />
      )}
    </div>
  );
};

export default PopularProductsSection;
