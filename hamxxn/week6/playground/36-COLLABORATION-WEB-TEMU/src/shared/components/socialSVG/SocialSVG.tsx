import SocialSpriteSVG from '@svg/sprite-sheet.svg';

interface SocialSVGProps {
  id: string;
  width?: string;
  height?: string;
}

export const SocialSVG = ({ id, width, height }: SocialSVGProps) => {
  const style: React.CSSProperties = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <svg style={style} aria-hidden="true">
      <use href={`${SocialSpriteSVG}#${id}`} />
    </svg>
  );
};
