import type { SVGProps } from 'react';
const SvgQuestionCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#QuestionCircle_svg__a)">
      <path fill="#fff" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path
        stroke="#646F7C"
        d="M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
      />
      <path
        fill="#28323C"
        d="M8.255 9.711v-.045a1.74 1.74 0 0 1 .924-1.749 2.03 2.03 0 0 0 1.06-1.832 2.03 2.03 0 0 0-2.212-2.042 2.11 2.11 0 0 0-2.263 2.049h.977a1.234 1.234 0 0 1 1.286-1.241 1.19 1.19 0 0 1 1.272 1.192 1.49 1.49 0 0 1-.787 1.3 2.24 2.24 0 0 0-1.19 2.322v.045zm-.432 2.248a.69.69 0 0 0 .689-.689.69.69 0 0 0-1.326-.264.69.69 0 0 0 0 .528.69.69 0 0 0 .637.425"
      />
    </g>
    <defs>
      <clipPath id="QuestionCircle_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgQuestionCircle;
