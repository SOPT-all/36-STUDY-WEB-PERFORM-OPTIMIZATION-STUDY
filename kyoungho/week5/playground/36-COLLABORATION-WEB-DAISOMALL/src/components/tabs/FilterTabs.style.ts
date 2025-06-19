import { css } from '@emotion/react';
import theme from '@styles/theme';
export const filterTabsContainer = css`
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
`;

export const filterTab = css`
  padding: 0.6rem 1.2rem;
  background: ${theme.colors.white};
  border-radius: 30px;
  outline: 1px ${theme.colors['gray-04']} solid;
  outline-offset: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const selectedFilterTab = css`
  background: ${theme.colors['gray-01']};
  outline: 1px ${theme.colors['gray-01']} solid;
  padding-right: 0.8rem;
`;

export const filterTabText = css`
  text-align: center;
  color: ${theme.colors['gray-01']};
  ${theme.fonts['button-14R']};
  white-space: nowrap;
`;

export const selectedFilterTabText = css`
  color: ${theme.colors.white};
  ${theme.fonts['button-14B']};
`;

export const iconWrapper = css`
  display: flex;
  align-items: center;
  margin-left: 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
`;
