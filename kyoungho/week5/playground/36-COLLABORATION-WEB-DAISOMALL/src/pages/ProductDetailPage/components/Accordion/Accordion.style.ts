import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  margin-bottom: 7.3rem;
`;

export const InfoList = css`
  width: 100%;
`;

export const Info = css`
  display: flex;
  border-bottom: 1px solid ${theme.colors['gray-05']};
`;

export const InfoTitle = css`
  width: 13.2rem;
  padding: 1.6rem;
  background-color: ${theme.colors['gray-06']};
  ${theme.fonts['body-12R']}
  color: ${theme.colors['gray-01']};
`;

export const InfoContent = css`
  flex: 1;
  padding: 1.6rem;
  ${theme.fonts['body-12R']}
  color: ${theme.colors['gray-01']};
`;

export const ContactWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem 1.6rem 2.3rem 1.6rem;
`;

export const ContactSection = css`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
`;

export const ContentSection = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0.4rem 0;
`;

export const ContactTitle = css`
  ${theme.fonts['heading-14B']}
  color: ${theme.colors['gray-01']};
`;

export const ContactContent = css`
  ${theme.fonts['caption-12R']}
  color: ${theme.colors['gray-03']};
`;
