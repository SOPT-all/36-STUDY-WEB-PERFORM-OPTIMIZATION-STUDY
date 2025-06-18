import { css } from '@emotion/react';
import theme from '@styles/theme';

export const buttonContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const buttonStyle = (variant: 'white' | 'gray') => css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${variant === 'white' ? '0.4rem' : '0.8rem'};

  width: 100%;
  
  height: 4.8rem;
  padding: 1.5rem 11.5rem;

  background-color: ${variant === 'white'
    ? theme.colors.white
    : theme.colors['gray-06']};
  border: ${variant === 'white'
    ? `1px solid ${theme.colors['gray-04']}`
    : 'none'};
  border-radius: 4px;

  cursor: pointer;
`;

export const textStyle = css`
  color: ${theme.colors['gray-01']};
  ${theme.fonts['button-14B']}
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const countStyle = css`
  color: ${theme.colors.primary};
  ${theme.fonts['button-14B']}
  display: flex;
  align-items: center;
`;

export const iconContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;

export const iconStyle = css`
  flex-shrink: 0;
`;
