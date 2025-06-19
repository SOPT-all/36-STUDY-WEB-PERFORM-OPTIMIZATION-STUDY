import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Container = css`
  display: flex;
`;

export const Label = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2.2rem;
  gap: 1rem;
  margin-right: 1.6rem;

  border-radius: 4px;
  background-color: ${theme.colors['red-02']};

  ${theme.fonts['caption-12B']}
  color: ${theme.colors.primary};
`;

export const Content = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-right: 0.4rem;
  flex: 1;
`;

export const Description = css`
  ${theme.fonts['heading-14B']}
  color: ${theme.colors['gray-01']};
`;

export const Line = css`
  flex: 1;
  height: 1px;
  border-top: 1px dashed ${theme.colors['gray-04']};
`;

export const Percent = css`
  ${theme.fonts['heading-14B']}
  color: ${theme.colors.primary};
`;

export const ArrowIcon = css`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.7rem;
`;
