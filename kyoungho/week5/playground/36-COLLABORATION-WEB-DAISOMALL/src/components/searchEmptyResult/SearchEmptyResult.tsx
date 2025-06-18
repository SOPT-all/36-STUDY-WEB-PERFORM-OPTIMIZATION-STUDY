import * as S from './SearchEmptyResult.style';
import { NoResultIcon, Caution2Icon } from '@assets/svgs';

interface SearchEmptyResultProps {
  className?: string;
}

const SearchEmptyResult = ({ className }: SearchEmptyResultProps) => {
  return (
    <div css={S.containerStyle} className={className}>
      {/* 상단 부분: 전체 박스 */}
      <div css={S.upperContainerStyle}>
        {/* 아이콘 + 텍스트 컨테이너 */}
        <div css={S.resultContainerStyle}>
          <NoResultIcon css={S.iconStyle} />
          <p css={S.noResultTextStyle}>검색결과가 없습니다</p>
        </div>
      </div>

      {/* 하단 부분: 안내 섹션 */}
      <div css={S.guideContainerStyle}>
        <div css={S.guideContentContainerStyle}>
          {/* 안내 헤더 */}
          <div css={S.guideHeaderStyle}>
            <Caution2Icon css={S.cautionIconStyle} />
            <p css={S.guideHeaderTextStyle}>확인해 주세요</p>
          </div>

          {/* 안내 목록 */}
          <ul css={S.guideListStyle}>
            <li css={S.guideItemStyle}>단어의 철자가 정확한지 확인해주세요.</li>
            <li css={S.guideItemStyle}>올바른 품번을 입력했는지 확인해주세요.</li>
            <li css={S.guideItemStyle}>보다 일반적인 단어로 다시 검색해보세요.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchEmptyResult;