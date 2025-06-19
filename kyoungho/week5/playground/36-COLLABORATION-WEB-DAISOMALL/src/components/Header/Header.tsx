// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from './Header.style';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showHeader?: boolean;
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  showTitle?: boolean;
  showSearchIcon?: boolean;
  showHomeIcon?: boolean;
  showCartIcon?: boolean;
  onBackClick?: () => void;
}

const Header = ({
  showHeader = false,
  title,
  showLogo = false,
  showBackButton = false,
  showTitle = false,
  showSearchIcon = false,
  showHomeIcon = false,
  showCartIcon = false,
  onBackClick,
}: HeaderProps) => {
  const navigate = useNavigate();
  const wrapperStyle = showHeader ? S.AnimatedWrapper(true) : S.Wrapper;

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div css={wrapperStyle}>
      <div css={S.LeftContainer}>
        {showLogo && <img src="/svgs/logo.svg" alt="Logo" width={73} />}
        {showBackButton && (
          <img
            src="/svgs/back-icon.svg"
            alt="Back"
            width={24}
            onClick={handleBackClick}
            style={{ cursor: 'pointer' }}
          />
        )}
        {showTitle && <p css={S.Title}>{title}</p>}
      </div>
      <div css={S.RightContainer}>
        {showSearchIcon && <img src="/svgs/search-icon.svg" alt="Search" css={S.NavIcons} />}
        {showHomeIcon && <img src="/svgs/tohome-icon.svg" alt="Home" css={S.NavIcons} />}
        {showCartIcon && <img src="/svgs/cart-icon.svg" alt="Cart" css={S.NavIcons} />}
      </div>
    </div>
  );
};

export default Header;
