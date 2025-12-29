import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

export const Tag = (bgColor: string, hasIcon: boolean = false) => css`
  display: flex;
  align-items: center;
  justify-content: ${hasIcon ? 'flex-start' : 'center'};
  gap: ${hasIcon ? '0.3rem' : '0rem'};
  padding: 0.05rem 0.4rem;
  background-color: ${bgColor};
  border-radius: 2px;
  overflow: hidden;

  & > svg {
    width: 0.9rem;
    height: 0.9rem;
    margin-bottom: 0.1rem;
  }
`;

export const Text = (textColor: string) => css`
  color: ${textColor};
  ${theme.fonts['caption-10SB']};
  white-space: nowrap;
  text-align: center;
`;
