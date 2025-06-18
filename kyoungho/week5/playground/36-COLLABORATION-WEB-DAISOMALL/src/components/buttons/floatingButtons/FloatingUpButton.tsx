import { FloatingUpIcon } from '@assets/svgs';
import { useEffect, useState, useCallback } from 'react';
import * as S from './FloatingUpButton.style';

const FloatingUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = useCallback(() => {
    const pageHeight = document.documentElement.scrollHeight;
    const isPageTallEnough = pageHeight >= 500;

    const scrollThreshold = 125;
    const hasScrolledEnough = window.scrollY > scrollThreshold;

    setIsVisible(isPageTallEnough && hasScrolledEnough);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const debounceScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkVisibility, 10);
    };

    window.addEventListener('scroll', debounceScroll, { passive: true });
    window.addEventListener('resize', debounceScroll, { passive: true });

    checkVisibility();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', debounceScroll);
      window.removeEventListener('resize', debounceScroll);
    };
  }, [checkVisibility]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      css={S.buttonStyle(isVisible)}
      onClick={handleScrollToTop}
      aria-label="페이지 맨 위로 스크롤"
    >
      <FloatingUpIcon css={S.iconStyle} />
    </button>
  );
};

export default FloatingUpButton;
