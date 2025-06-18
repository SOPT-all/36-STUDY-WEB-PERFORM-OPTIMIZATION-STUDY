import { css } from '@emotion/react';
import theme from '@styles/theme';

export const code = css`
  ${theme.fonts['caption-12R']};
  color: ${theme.colors['gray-03']};
`;

export const rankingWrapper = (hasCode?: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: ${hasCode ? 'flex-start' : 'space-between'};
  width: 100%;
  height: 100%;
  gap: 1.6rem;
`;

export const rankingContent = (hasCode?: boolean) => css`
  display: flex;
  gap: ${hasCode ? '1.6rem' : '1.2rem'};
  flex: 1;
  min-width: 0;
  max-height: 8.8rem;
  width: 100%;
  align-items: flex-start;
`;

export const rankingNumber = css`
  position: relative;
  width: 1.1rem;
  ${theme.fonts['number-18R']}
  color: ${theme.colors['gray-01']};
  width: 1.1rem;
`;

export const rankingImageWrapper = css`
  width: 8.1rem;
  height: 10.8rem;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  max-height: 100%;
  max-height: 8.8rem;
`;

export const rankingImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const rankingInfoArea = (hasCode?: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${hasCode ? '0.4rem' : '0.8rem'};
  padding: 0.4rem 0;
  flex: 1;
`;

export const rankingTextGroup = (hasCode?: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: ${hasCode ? '0.2rem' : '0.4rem'};
`;

export const priceRow = css`
  display: flex;
  align-items: baseline;
`;

export const rankingPrice = css`
  ${theme.fonts['number-18R']};
  color: ${theme.colors['gray-01']};
`;

export const rankingWon = css`
  ${theme.fonts['heading-16B']};
  color: ${theme.colors['gray-01']};
`;

export const rankingName = css`
  ${theme.fonts['body-12R']};
  color: ${theme.colors['gray-01']};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const cartButton = css`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  background: ${theme.colors['gray-06']};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const cartIcon = css`
  width: 2rem;
  height: 2rem;
`;

export const tagList = css`
  display: flex;
  gap: 0.4rem;
  margin-top: 0.4rem;
`;

export const tagStyle = (type: string) => css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.4rem;
  height: 1.6rem;
  border-radius: 2px;
  ${theme.fonts['caption-10SB']};
  color: ${type === '박스배송' ? theme.colors['primary'] : 'white'};
  background-color: ${(() => {
    switch (type) {
      case 'best':
        return theme.colors.primary;
      case '신상':
        return theme.colors['red-01'];
      case '박스배송':
        return theme.colors['gray-05'];
      default:
        return theme.colors['gray-04'];
    }
  })()};
`;
