import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Divider = css`
  width: 1px;
  height: 1.6rem;
  background-color: ${theme.colors['gray-05']};
`;

export const Explanation = css`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ExplanationText = css`
  ${theme.fonts['body-12R']};
  color: ${theme.colors['gray-03']};
`;

export const Wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const SearchBar = css`
  width: 100%;
  padding: 0.8rem;
  border-bottom: 1px solid ${theme.colors['gray-01']};
  height: 4rem;
`;

export const TopRow = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const IconGroup = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.8rem;
`;

export const InputField = css`
  flex: 1 1 auto;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-01']};

  &::placeholder {
    color: ${theme.colors['gray-01']};
  }
`;
