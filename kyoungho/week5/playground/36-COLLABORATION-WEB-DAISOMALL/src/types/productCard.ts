import type { ProductTagData } from '@components/Tag/tagData';

export interface ProductCardVerticalProps {
  id: number;
  size: '96' | '128';
  name: string;
  totalPrice: string;
  unitPrice?: string;
  imageUrl?: string;
  tags?: ProductTagData[];
  quantityText?: string;
  isSnsHot?: boolean;
  isBoxDelivery?: boolean;
}

export interface ProductCardRankingProps {
  rank?: number;
  imageUrl: string;
  name: string;
  price: string;
  tags?: ProductTagData[];
  code?: string;
  showCartIcon?: boolean;
}
