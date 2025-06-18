import { css } from '@emotion/react';
import theme from '@styles/theme';

export const containerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 34.3rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const countTextStyle = css`
  ${theme.fonts['heading-14B']}
  
  color: ${theme.colors.black};
`;

export const sortContainerStyle = css`
  display: flex;
  align-items: center;
  
  background: none;
  border: none;
  padding: 0;
  
  cursor: pointer;
`;

export const sortTextStyle = css`
  ${theme.fonts['button-14R']}
  
  color: ${theme.colors['gray-01']};
`;

export const iconContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 24px;
  height: 24px;
  padding: 0px 7px;
`;

export const iconStyle = css``;

export const sortOptionsContainerStyle = css`
  position: relative;
`;

export const dropdownStyle = css`
  position: absolute;
  top: 100%;
  right: 0;
  
  margin-top: 8px;
  width: 120px;
  
  background-color: ${theme.colors.white};
  border-radius: 4px;
  
  overflow: hidden;
  z-index: 10;
`;

export const optionButtonStyle = (isSelected: boolean) => css`
  width: 100%;
  padding: 12px 16px;
  
  text-align: left;
  background: none;
  border: none;
  
  ${theme.fonts['body-14R']}
  color: ${isSelected ? theme.colors.primary : theme.colors['gray-01']};
  
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors['gray-06']};
  }
`;