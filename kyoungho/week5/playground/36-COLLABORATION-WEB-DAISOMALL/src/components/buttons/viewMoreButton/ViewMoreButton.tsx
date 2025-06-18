import { useState } from 'react';
import { SmallArrowDownIcon } from '@assets/svgs';
import * as S from './ViewMoreButton.style';

interface ViewMoreButtonProps {
  buttonText?: string; // 버튼에 표시될 텍스트
  children: React.ReactNode; // 펼쳐질 콘텐츠
  initialExpanded?: boolean; // 초기 펼침 상태 (기본값은 false)
  onExpand?: () => void; // 확장 시 실행될 콜백 함수
}

const ViewMoreButton = ({
  buttonText = '',
  children,
  initialExpanded = false,
  onExpand,
}: ViewMoreButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const handleExpandClick = () => {
    setIsExpanded(true);

    // 콜백 함수가 있으면 실행
    if (onExpand) {
      onExpand();
    }
  };

  return (
    <div>
      {/* 버튼 (펼쳐지지 않았을 때만 표시) */}
      {!isExpanded && (
        <div css={S.viewMoreContainer}>
          <button
            css={S.buttonStyle}
            onClick={handleExpandClick}
            aria-expanded={isExpanded}
            aria-label={`${buttonText} 버튼`}
          >
            <span css={S.textStyle}>{buttonText}</span>
            <div css={S.iconWrapperStyle}>
              <SmallArrowDownIcon css={S.iconStyle} />
            </div>
          </button>
        </div>
      )}

      {/* 콘텐츠 (펼쳐졌을 때만 표시) */}
      {isExpanded && (
        <div css={S.contentStyle} aria-live="polite">
          {children}
        </div>
      )}
    </div>
  );
};

export default ViewMoreButton;
