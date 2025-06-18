import type { SVGProps } from 'react';

const Caution2Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    width="16" 
    height="17" 
    viewBox="0 0 16 17" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_4056_7047)">
      <path d="M8 16.5C12.4183 16.5 16 12.9183 16 8.5C16 4.08172 12.4183 0.5 8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5Z" fill="#646F7C"/>
      <path d="M9 3.5H7V10.5H9V3.5Z" fill="white"/>
      <path d="M9 11.5H7V13.5H9V11.5Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_4056_7047">
        <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
      </clipPath>
    </defs>
  </svg>
);

export default Caution2Icon;