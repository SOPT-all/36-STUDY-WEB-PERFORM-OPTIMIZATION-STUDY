import { css } from '@emotion/react';
import theme from '@styles/theme';

export const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem; 1.6rem;
  background-color: ${theme.colors['gray-06']};
  border-radius: 32px;
`;

export const input = css`
  flex: 1;
  background: transparent;
  outline: none;
  border: none;
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-01']};

  &::placeholder {
    color: ${theme.colors['gray-01']};
  }
`;

export const iconWrapper = (hasValue: boolean) => css`
  display: flex;
  align-items: center;
  gap: ${hasValue ? '1.6rem' : '0.8rem'};
`;

export const divider = css`
  width: 0.1rem;
  height: 1.6rem;
  background-color: ${theme.colors['gray-04']};
`;

export const clearButton = css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.1rem;
`;

export const searchButton = css`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
