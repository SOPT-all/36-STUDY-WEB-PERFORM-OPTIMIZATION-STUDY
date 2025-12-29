import { css } from '@emotion/react';
import theme from '@styles/theme';

export const wrapper = css`
  width: 12.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const mainImage = css`
  height: 17rem;
  object-fit: cover;
`;

export const contentArea = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const infoGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const topRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const profileArea = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const profileImage = css`
  width: 2rem;
  height: 2rem;
  border-radius: 40px;
  object-fit: cover;
`;

export const username = css`
  ${theme.fonts['caption-12R']};
  color: ${theme.colors['gray-01']};
`;

export const bookmarkButton = css`
  all: unset;
  background: none;
  border: none;
  cursor: pointer;
`;

export const bookmarkIcon = css`
  color: ${theme.colors['white']};
  transition: color 0.2s ease;
`;

export const bookmarkIconActive = css`
  color: ${theme.colors['gray-04']};
`;

export const title = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-01']};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const viewRow = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const viewCount = css`
  ${theme.fonts['caption-12B']};
  color: ${theme.colors['gray-04']};
`;

export const viewText = css`
  ${theme.fonts['caption-12R']};
  color: ${theme.colors['gray-04']};
`;
