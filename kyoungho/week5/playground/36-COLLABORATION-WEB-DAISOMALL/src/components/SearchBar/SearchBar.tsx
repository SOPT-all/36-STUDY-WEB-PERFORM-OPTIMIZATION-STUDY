import { useState, useEffect } from 'react';
import * as S from './searchBar.style';
import { SearchIcon, BarcodeIcon, CancelIcon } from '@assets/svgs';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (keyword: string) => void;
  onClear?: () => void;
  value?: string;
}

const SearchBar = ({
  placeholder = '상품명, 품번, 브랜드',
  onSearch,
  onClear,
  value: externalValue,
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState(externalValue || '');

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  const handleClear = () => {
    setInternalValue('');
    onClear?.();
  };

  const handleSearch = () => {
    if (internalValue.trim()) onSearch?.(internalValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div css={S.wrapper}>
      <input
        css={S.input}
        type="text"
        aria-label="검색창"
        value={internalValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      <div css={S.iconWrapper(internalValue !== '')}>
        {internalValue === '' ? (
          <>
            <BarcodeIcon width={24} />
            <div css={S.divider} />
          </>
        ) : (
          <button
            type="button"
            onClick={handleClear}
            css={S.clearButton}
            aria-label="입력 초기화"
          >
            <CancelIcon width={14} />
          </button>
        )}

        <button
          type="button"
          onClick={handleSearch}
          css={S.searchButton}
          aria-label="검색"
        >
          <SearchIcon width={24} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
