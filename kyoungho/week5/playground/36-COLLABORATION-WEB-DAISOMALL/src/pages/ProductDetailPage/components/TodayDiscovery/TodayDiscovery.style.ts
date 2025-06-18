import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.6rem 0 1.6rem 1.6rem;
`;

export const Title = css`
  ${theme.fonts['heading-14B']}
  color: ${theme.colors['gray-01']};
`;

export const Container = css`
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  scrollbar-width: none; // Firefox 스크롤바 숨기기
  -ms-overflow-style: none; // IE, Edge 스크롤바 숨기기

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari 스크롤바 숨기기
  }

  &::after {
    content: '';
    flex: 0 0 0.9rem; // 오른쪽 끝 여백
  }
`;
