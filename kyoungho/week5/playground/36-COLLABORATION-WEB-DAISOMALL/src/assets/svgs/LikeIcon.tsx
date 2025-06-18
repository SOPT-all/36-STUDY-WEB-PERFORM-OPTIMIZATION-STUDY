import type { SVGProps } from 'react';

interface LikeIconProps extends SVGProps<SVGSVGElement> {
  filled?: boolean;
}

const LikeIcon = ({ filled = false, ...props }: LikeIconProps) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? '#F1352B' : 'none'}
    stroke={filled ? '#F1352B' : '#C5C8CE'}
    {...props}
  >
    <path
      d="M12.2783 6.20696L13.0224 5.4638C14.9749 3.51171 18.1402 3.51178 20.0927 5.4638C22.0453 7.41642 22.0453 10.5825 20.0927 12.5351L12.3154 20.3134L4.4638 12.5351C2.5113 10.5823 2.5113 7.4163 4.4638 5.4638C6.41631 3.5113 9.58245 3.51153 11.5351 5.4638L12.2783 6.20696Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LikeIcon;
