import { useState } from 'react';
import * as S from './StoreSearchBar.style';
import { LocationIcon, SearchIcon } from '@assets/svgs';

interface StoreSearchBarProps {
  onSearch?: (keyword: string) => void;
}

const StoreSearchBar = ({ onSearch }: StoreSearchBarProps) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (onSearch) onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div css={S.Wrapper}>
      <div css={S.SearchBar}>
        <div css={S.TopRow}>
          <input
            css={S.InputField}
            type="text"
            placeholder="매장명으로 찾기"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div css={S.IconGroup} onClick={handleSearch}>
            <LocationIcon width={24} height={24} />
            <div css={S.Divider} />
            <SearchIcon width={24} height={24} />
          </div>
        </div>
      </div>
      <div css={S.Explanation}>
        <span css={S.ExplanationText}>
          · 실제 매장 재고와 다를 수 있습니다.
        </span>
        <span css={S.ExplanationText}>
          · 내 위치에서 5km 이내 매장 정보를 제공합니다.
        </span>
      </div>
    </div>
  );
};

export default StoreSearchBar;
