import { css } from '@emotion/react';
import theme from '@styles/theme';

export const productDetailStyle = css`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

export const imageContainerStyle = css`
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const collapsedImageStyle = css`
  height: 20rem;
`;

export const expandedImageStyle = css`
  height: auto;
`;

export const recommendedProductsStyle = css`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const productsHorizontalStyle = css`
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  padding-bottom: 0.8rem;
  
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const recommendedTitleStyle = css`
  ${theme.fonts['heading-14B']}
`;

export const productsGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
`;

export const stickyNavBarStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
`;

export const viewMoreButtonWrapper = css`
  padding: 0 1.6rem 1.9rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 1%,
    rgba(255, 255, 255, 0.1) 2%,
    rgba(255, 255, 255, 0.15) 3%,
    rgba(255, 255, 255, 0.2) 5%, 
    rgba(255, 255, 255, 0.3) 8%,
    rgba(255, 255, 255, 0.4) 12%,
    rgba(255, 255, 255, 0.5) 17%,
    rgba(255, 255, 255, 0.6) 23%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0.8) 38%,
    rgba(255, 255, 255, 0.9) 47%,
    rgba(255, 255, 255, 0.95) 53%,
    rgba(255, 255, 255, 1) 60%
  );
  height: 10rem;
  justify-content: center;
  display: flex;
  align-items: flex-end;
`; 