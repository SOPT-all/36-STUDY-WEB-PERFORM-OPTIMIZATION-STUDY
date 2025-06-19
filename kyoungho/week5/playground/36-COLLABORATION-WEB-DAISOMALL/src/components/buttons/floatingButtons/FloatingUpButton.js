import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// SVG 컴포넌트를 실제 SVG 파일로 변경
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
        let timeoutId;
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
    return (_jsx("button", { css: S.buttonStyle(isVisible), onClick: handleScrollToTop, "aria-label": "\uD398\uC774\uC9C0 \uB9E8 \uC704\uB85C \uC2A4\uD06C\uB864", children: _jsx("img", { src: "/svgs/floating-up-icon.svg", alt: "\uC704\uB85C", css: S.iconStyle }) }));
};
export default FloatingUpButton;
