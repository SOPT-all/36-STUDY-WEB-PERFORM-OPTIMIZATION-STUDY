import SearchBar from '@components/SearchBar/SearchBar';
import * as S from '../../PopularProductsSection.style';

export const LoadingState = ({ placeholder }: { placeholder: string }) => (
  <div css={S.PopularWrapper}>
    <SearchBar placeholder={placeholder} />
    <div css={S.ResultWrapper}>
      <h2 css={S.Title}>지금 많이 찾는 상품</h2>
      <div>로딩 중...</div>
    </div>
  </div>
);

export const ErrorState = ({ placeholder }: { placeholder: string }) => (
  <div css={S.PopularWrapper}>
    <SearchBar placeholder={placeholder} />
    <div css={S.ResultWrapper}>
      <h2 css={S.Title}>지금 많이 찾는 상품</h2>
      <div>데이터를 불러올 수 없습니다.</div>
    </div>
  </div>
);

export const EmptyState = ({ placeholder }: { placeholder: string }) => (
  <div css={S.PopularWrapper}>
    <SearchBar placeholder={placeholder} />
    <div css={S.ResultWrapper}>
      <h2 css={S.Title}>지금 많이 찾는 상품</h2>
      <div>상품이 없습니다.</div>
    </div>
  </div>
);
