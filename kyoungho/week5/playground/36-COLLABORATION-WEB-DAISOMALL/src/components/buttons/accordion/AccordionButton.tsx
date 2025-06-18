import { useRef, useState } from 'react';
import { SmallArrowDownIcon, SmallArrowUpIcon } from '@assets/svgs';
import Divider from '@components/common/divider/Divider';
import * as S from './AccordionButton.style';

interface AccordionButtonProps {
  title: string; // 아코디언 버튼 제목
  children: React.ReactNode; // 아코디언 내부 콘텐츠
  defaultOpen?: boolean; // 초기 상태 (기본값은 닫힘)
}

const AccordionButton = ({
  title,
  children,
  defaultOpen = false,
}: AccordionButtonProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 상태에 따라 렌더링할 아이콘 결정
  const ArrowIcon = isOpen ? SmallArrowUpIcon : SmallArrowDownIcon;

  return (
    <div css={S.accordionContainer}>
      <button
        css={S.buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`${title} ${isOpen ? '닫기' : '열기'}`}
      >
        <span css={S.titleStyle}>{title}</span>
        <span css={S.iconStyle}>
          <ArrowIcon />
        </span>
      </button>

      <div
        css={S.contentWrapper(isOpen)}
        ref={contentRef}
        style={
          isOpen
            ? { maxHeight: contentRef.current?.scrollHeight }
            : { maxHeight: 0 }
        }
      >
        <Divider />
        <div css={S.contentStyle}>{children}</div>
      </div>
    </div>
  );
};

export default AccordionButton;
