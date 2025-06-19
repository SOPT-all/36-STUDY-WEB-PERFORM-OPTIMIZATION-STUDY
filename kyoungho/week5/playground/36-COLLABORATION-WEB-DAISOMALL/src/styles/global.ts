import { css } from '@emotion/react';
import Reset from './reset';
import theme from './theme';
import './fonts/fonts.css';

const GlobalStyle = css`
  ${Reset}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: ${theme.colors.white};
    font-size: 62.5%;
    overflow-x: hidden;

::-webkit-scrollbar {
  width: 0;
  height: 0;
}
-ms-overflow-style: none;
scrollbar-width: none;
    @  
  }

  #root {
    position: relative;
    min-width: 375px;
    max-width: 425px;
    width: 100%;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
