import { css } from '@emotion/react';
import theme from '@styles/theme';

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  
  align-self: stretch;
`;

export const upperContainerStyle = css`
  display: flex;
  width: 34.3rem;
  height: 13.9rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

export const resultContainerStyle = css`
  display: flex;
  width: 11.6rem;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

export const iconContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 5rem;
  height: 5rem;
`;

export const iconStyle = css`
  width: 4.9782rem;
  height: 4.241rem;
  flex-shrink: 0;
`;

export const noResultTextStyle = css`
  ${theme.fonts['body-14R']}
  
  color: ${theme.colors.black};
  text-align: center;
  white-space: nowrap;
`;

export const guideContainerStyle = css`
  display: flex;
  width: 34.3rem;
  padding: 1.6rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 4px;
  background: var(--gray-06, #F7F8F9);
`;

export const guideContentContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  
  align-self: stretch;
`;

export const guideHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const cautionIconStyle = css`
  width: 1.6rem;
  height: 1.6rem;
`;

export const guideHeaderTextStyle = css`
  ${theme.fonts['caption-12B']}
  
  color: ${theme.colors['gray-03']};
  letter-spacing: 0.1px;
`;

export const guideListStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  
  align-self: stretch;
  list-style-type: disc;
  padding-left: 1.6rem;
`;

export const guideItemStyle = css`
  ${theme.fonts['caption-12R']}
  
  color: ${theme.colors['gray-03']};
  width: 23.9rem;
  padding-left: 0.4rem;
`;