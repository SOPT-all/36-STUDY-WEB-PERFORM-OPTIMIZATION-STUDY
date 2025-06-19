import * as S from './ProductTag.style';
import type { ReactNode } from 'react';

export interface ProductTagProps {
  label: string;
  bg: string;
  color: string;
  icon?: ReactNode;
}

const ProductTag = ({ label, bg, color, icon }: ProductTagProps) => (
  <div css={S.Tag(bg, Boolean(icon))}>
    {icon}
    <span css={S.Text(color)}>{label}</span>
  </div>
);

export default ProductTag;
