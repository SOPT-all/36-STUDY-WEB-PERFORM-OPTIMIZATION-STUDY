import { css } from '@emotion/react';
import theme from '@styles/theme';

export const container = css`
  width: 100%;
  height: 4.4rem;
  position: relative;
  background: white;
  display: flex;
  flex-direction: row;
`;

export const tabItem = css`
  width: 100%;
  height: 4.2rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  appearance: none;
  background-color: transparent;
`;

export const tabText = (isActive: boolean) => css`
  text-align: center;
  color: ${theme.colors['gray-01']};
  ${isActive ? theme.fonts['heading-14B'] : theme.fonts['body-14R']};
  word-wrap: break-word;
  transition: all 0.3s ease;
`;

export const activeBarContainer = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  overflow: hidden;
`;

export const activeBar = css`
  width: 100%;
  height: 0.2rem;
  background: ${theme.colors['gray-01']};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: transform 0.3s ease;
`;
