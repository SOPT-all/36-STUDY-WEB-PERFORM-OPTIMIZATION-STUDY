import { useNavigate } from 'react-router-dom';
import { SmallArrowRightIcon } from '@assets/svgs';
import * as S from './NavigationButton.style';

interface NavigationButtonProps {
  text: string; // 버튼 텍스트
  count?: number; // 카운트 (선택적)
  to: string; // 이동할 경로
  variant?: 'white' | 'gray'; // 버튼 배경 색상
  onClick?: () => void; // 클릭 시 실행할 콜백 함수 (선택적)
}

const NavigationButton = ({
  text,
  count,
  to,
  variant = 'white',
  onClick,
}: NavigationButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 페이지 이동
    navigate(to);

    // 추가 콜백 실행
    if (onClick) onClick();
  };

  return (
    <div css={S.buttonContainer}>
      <button
        css={S.buttonStyle(variant)}
        onClick={handleClick}
        aria-label={`${text} 페이지로 이동`}
      >
        <span css={S.textStyle}>{text}</span>

        {count !== undefined && <span css={S.countStyle}>{count}</span>}

        <div css={S.iconContainer}>
          <SmallArrowRightIcon css={S.iconStyle} />
        </div>
      </button>
    </div>
  );
};

export default NavigationButton;
