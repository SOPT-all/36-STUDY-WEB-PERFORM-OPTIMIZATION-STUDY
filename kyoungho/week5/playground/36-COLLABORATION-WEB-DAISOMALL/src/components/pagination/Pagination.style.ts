import { css } from '@emotion/react';
import theme from '@styles/theme';

// 페이지네이션 바 관련 스타일
export const paginationWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

export const paginationBarsContainer = css`
  display: flex;
  align-items: center;
`;

export const paginationBarStyle = (
  isActive: boolean,
  isClickable?: boolean,
) => css`
  width: 2.8rem;
  height: 0.2rem;
  background-color: ${isActive
    ? theme.colors['gray-01']
    : theme.colors['gray-05']};
  border-radius: 0.1rem;
  cursor: ${isClickable ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;
`;
