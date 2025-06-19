import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

export const FirstContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BodyTextStyle = css`
  ${theme.fonts['body-14R']}
  color: ${theme.colors['gray-01']};
`;

export const FirstLeftContainer = css`
  display: flex;
  gap: 1rem;
`;

export const ProfileSection = css`
  display: flex;
`;

export const MiddleSection = css`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const CaptionTextStyle = css`
  ${theme.fonts['caption-12R']}
  color: ${theme.colors['gray-03']};
`;

export const SecondContainer = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.1rem 0.8rem;
  height: 3.6rem;

  background-color: ${theme.colors['gray-06']};
`;

export const KeywordsContainer = css`
  display: flex;
  gap: 0.4rem;
`;

export const KeyText = css`
  ${theme.fonts['body-12R']}
  color: ${theme.colors['gray-01']};
`;

export const ValueText = css`
  ${theme.fonts['body-12R']}
  color: ${theme.colors['gray-03']};
`;

export const ThirdContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Review = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  align-self: stretch;
  overflow: hidden;
  text-overflow: ellipsis;
  ${theme.fonts['body-14R-review']}
  color: ${theme.colors['gray-01']};
`;

export const More = css`
  ${theme.fonts['button-14R']}
  color: ${theme.colors['gray-04']};
`;

export const ButtonContainer = css`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 9.5rem;
  height: 3.2rem;
  padding: 0.7rem 1.2rem;

  border-radius: 20px;
  border: 1px solid ${theme.colors['gray-05']};
  background-color: ${theme.colors.white};
`;
export const LeftSection = css`
  display: flex;
`;

export const ButtonText = css`
  ${theme.fonts['button-12R']}
  color: ${theme.colors['gray-03']}
`;

export const RightSection = css`
  display: flex;
`;

export const CaptionTextStyle2 = css`
  ${theme.fonts['caption-12B']}
  color: ${theme.colors['gray-03']};
`;
