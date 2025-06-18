import { css } from '@emotion/react';
import theme from '../../../styles/theme'; // 경로 수정

export const InfoRow = css`
  display: flex;
  padding-left: 1.6rem; 
  padding-right: 1.6rem;
  gap: 0.6rem;
`;

export const InfoLabel = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-03']};
  width: 7rem;
  padding-left: 0.4rem;
`;

export const InfoContent = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & > div,
  & > span {
    ${theme.fonts['body-14R']};
    color: ${theme.colors['gray-01']};
    line-height: 20.3px;
  }
`;

export const LoginLink = css`
  ${theme.fonts['body-14M']};
  color: ${theme.colors['gray-01']};
  text-decoration: underline;
  cursor: pointer;
`; 