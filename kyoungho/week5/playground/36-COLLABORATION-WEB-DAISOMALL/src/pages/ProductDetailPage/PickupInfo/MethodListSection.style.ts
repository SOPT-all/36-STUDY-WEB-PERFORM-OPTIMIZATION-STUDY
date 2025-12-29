import { css } from '@emotion/react';
import theme from '@styles/theme';

export const MethodList = css`
  list-style-type: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;

  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
  padding: 0 1.6rem 2rem 1.6rem;
  overflow-x: auto;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MethodItem = css`
  background: ${theme.colors['gray-06']};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;
  
  height: 10rem;
  margin: 0;
  padding: 0;
`;

export const StoreMethodItem = css`
  background: ${theme.colors['gray-01']};
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
  color: ${theme.colors.white};

  .method-name {
    color: ${theme.colors.white};
  }
  .method-date {
    color: ${theme.colors['gray-05']};
  }
`;

export const MethodItemContent = css`
  display: flex;
  padding: 1.3rem 2.55rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 0.4rem;
`;

export const IconWrapper = css`
  width: 2rem;
  height: 2rem;
  position: relative;
`;

export const MethodName = css`
  ${theme.fonts['button-14B']};
  color: ${theme.colors['gray-01']};
  word-break: keep-all;
`;

export const MethodDate = css`
  ${theme.fonts['caption-12R']};
  color: ${theme.colors['gray-03']};
  word-break: keep-all;
`;

export const BetaIconStyle = css`
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  width: 2.1rem;
  height: 0.7rem;
`; 