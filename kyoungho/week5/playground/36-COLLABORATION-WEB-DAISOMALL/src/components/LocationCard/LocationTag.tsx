/** @jsxImportSource @emotion/react */
import { tagStyle } from './LocationCard.style';

interface LocationTagProps {
  label: string;
  color?: 'gray' | 'red';
}

const LocationTag = ({ label, color = 'red' }: LocationTagProps) => (
  <span css={tagStyle(color)}>{label}</span>
);

export default LocationTag;
