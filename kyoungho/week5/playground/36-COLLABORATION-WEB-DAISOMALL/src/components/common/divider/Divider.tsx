import { css } from '@emotion/react';
import theme from '@styles/theme';

interface DividerProps {
  height?: string;
  color?: string;
}

const Divider = ({ height = '1px', color }: DividerProps) => {
  const dividerStyle = css`
    width: 100%;
    height: ${height};
    background-color: ${color || theme.colors['gray-05']};
    border: none;
    margin: 0;
  `;

  return <hr css={dividerStyle} />;
};

export default Divider;
