/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import * as S from './SearchResultTitle.style';
import type { SortOptionType } from '@app-types/apiResponseType';

// 정렬 옵션 타입을 SortOptionType으로 통일y
type SortOption = SortOptionType;

// 정렬 옵션 목록
const SORT_OPTIONS: SortOption[] = [
  '최신순',
  '가격 낮은 순',
  '가격 높은 순'
];

interface SearchResultTitleProps {
  totalCount: number;
  initialSortOption?: SortOption;
  onSortChange?: (option: SortOption) => void;
  showSortOptions?: boolean;
  className?: string;
}

const SearchResultTitle = ({
  totalCount,
  initialSortOption = '최신순',
  onSortChange,
  showSortOptions = false,
  className,
}: SearchResultTitleProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>(initialSortOption);

  const handleSortClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleSortOptionClick = (option: SortOption) => {
    setSelectedSort(option);
    setIsFilterOpen(false);

    if (onSortChange) {
      onSortChange(option);
    }
  };

  // 정렬 옵션 드롭다운 렌더링
  const renderSortOptions = () => {
    if (!showSortOptions) return null;

    return (
      <div css={S.sortOptionsContainerStyle}>
        <button 
          css={S.sortContainerStyle} 
          onClick={handleSortClick}
          aria-expanded={isFilterOpen}
          aria-label={`${selectedSort} 정렬 옵션 선택하기`}
          type="button"
        >
          <span css={S.sortTextStyle}>{selectedSort}</span>
          <div css={S.iconWrapper}>
            <img src="/svgs/small-arrow-down-icon.svg" alt="Arrow Down" css={S.iconStyle} />
          </div>
        </button>

        {isFilterOpen && (
          <div css={S.dropdownStyle}>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                css={S.optionButtonStyle(option === selectedSort)}
                onClick={() => handleSortOptionClick(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div css={S.containerStyle} className={className}>
      <span css={S.countTextStyle}>총 {totalCount}개</span>
      {renderSortOptions()}
    </div>
  );
};

export default SearchResultTitle;