import { useState, useEffect } from 'react';
import * as S from './FilterTabs.style';
import { css } from '@emotion/react';
// SVG 컴포넌트를 실제 SVG 파일로 변경

export type FilterOption =
  | 'like-store'
  | 'pickup-able'
  | 'no-soldout'
  | 'no-store';

interface FilterOptions {
  key: FilterOption;
  label: string;
}

interface FilterTabsProps {
  onChange?: (selectedOptions: FilterOption[]) => void;
  selectedTab?: string | null;
}

const FilterTabs = ({ onChange, selectedTab }: FilterTabsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<FilterOption[]>([]);

  // selectedTab이 변경되면 selectedOptions 업데이트
  useEffect(() => {
    if (selectedTab) {
      setSelectedOptions([selectedTab as FilterOption]);
    } else {
      setSelectedOptions([]);
    }
  }, [selectedTab]);

  const filterOptions: FilterOptions[] = [
    { key: 'like-store', label: '관심 매장' },
    { key: 'pickup-able', label: '픽업 가능 매장' },
    { key: 'no-soldout', label: '일시품절 제외' },
    { key: 'no-store', label: '가맹/유통점 제외' },
  ];

  const handleFilterClick = (option: FilterOption) => {
    let newSelectedOptions: FilterOption[];

    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const isSelected = (option: FilterOption) => selectedOptions.includes(option);

  return (
    <div css={S.filterTabsContainer}>
      {filterOptions.map(({ key, label }) => (
        <div
          key={key}
          data-option={key}
          data-selected={isSelected(key)}
          css={css`
            ${S.filterTab}
            ${isSelected(key) && S.selectedFilterTab}
          `}
          onClick={() => handleFilterClick(key)}
        >
          <div
            css={css`
              ${S.filterTabText}
              ${isSelected(key) && S.selectedFilterTabText}
            `}
          >
            {label}
          </div>
          {isSelected(key) && (
            <div css={S.iconWrapper}>
                                <img src="/svgs/x-icon.svg" alt="삭제" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterTabs;
