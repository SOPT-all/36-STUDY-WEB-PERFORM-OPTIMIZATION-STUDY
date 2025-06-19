import { css } from '@emotion/react';
import theme from '@styles/theme';

export const homeWrapper = css`
  position: relative;
  overflow-x: hidden;
  width: 100%;
`;

export const sectionWrapper = (hasBanner: boolean) => css`
  margin: ${hasBanner ? '1.6rem 0rem' : '2rem 0rem'};
  gap: 2.4rem;
`;

export const paddingWrapper = css`
  height: 9rem;
`;

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin: 2rem 1.6rem;
`;

export const cardWrapper = css`
  display: flex;
  overflow-x: auto;
  gap: 1.2rem;
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

export const imageWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const dynamicBanner = (imageUrl: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 14.4rem;
  padding: 3.8rem 10.6rem 3.8rem 1.7rem;
  border-radius: 8px;
  background: url(${imageUrl}) no-repeat center/cover;
`;

export const textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: ${theme.colors['black']};
`;

export const title = css`
  ${theme.fonts['display-18SB']};
  white-space: pre-line;
`;

export const subtitle = css`
  ${theme.fonts['display-12M']};
  word-wrap: break-word;
`;

export const image = css`
  width: 100%;
`;

export const dividerStyle = css`
  width: 100%;
  height: 0.8rem;
  background-color: ${theme.colors['gray-06']};
  border: none;
`;
