import { css } from '@emotion/react';
import theme from '@styles/theme';

export const Wrapper = css`
  width: 100%;
  padding-bottom: 3.2rem;
  padding-top: 3.2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
`;

export const Title = css`
  ${theme.fonts['heading-14B']};
  color: ${theme.colors['gray-01']};
  text-align: left;
  padding: 0 1.6rem;
  padding-bottom: 2rem;
`;

export const MethodList = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;
  
`;

export const MethodItem = css`
  width: 100%; // 기본 너비
  height: 100px;
  padding: 1.3rem 2.5rem;
  background: ${theme.colors['gray-06']};
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  position: relative;

  &[data-selected='true'] {
    background: ${theme.colors['gray-01']};
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.25);
    color: ${theme.colors.white};
  }

  &[data-width-wide='true'] {
    width: 100px; // 매장픽업 옵션처럼 넓은 경우
  }
`;

export const IconWrapper = css`
  width: 20px;
  height: 20px;
  position: relative; // 피그마 코드에서는 img가 absolute였으나, 여기서는 wrapper로 감싸서 중앙정렬
  margin-bottom: 4px; // 아이콘과 텍스트 사이 간격
`;

export const MethodName = css`
  ${theme.fonts['heading-14B']};
  color: ${theme.colors['gray-01']};
  line-height: 20.3px; // theme 값과 약간 다름
  // width: 49px; // 고정 너비 제거
  flex: 1 1 0%; // 삭제 또는 조정 필요. 텍스트 길이에 따라 유동적이어야 함

  ${MethodItem}[data-selected='true'] & {
    color: ${theme.colors.white};
  }
`;

export const MethodDate = css`
  ${theme.fonts['body-12R']};
  color: ${theme.colors['gray-03']};

  ${MethodItem}[data-selected='true'] & {
    color: ${theme.colors['gray-05']};
  }
`;

export const BetaTag = css`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem; 
  background-color: ${theme.colors.primary}; // 임시 색상, theme에 BETA 색상 추가 필요
  color: ${theme.colors.white};
  padding: 2px 4px;
  border-radius: 2px;
  ${theme.fonts['caption-10SB']}; // 가장 작은 폰트 사용
  line-height: 1; // BETA 태그는 줄바꿈이 없으므로
`;

export const InfoSection = css`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

export const InfoRow = css`
  display: flex;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  gap: 1rem; // 레이블과 컨텐츠 사이 간격
`;

export const InfoLabel = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-03']};
  width: 7rem;
`;

export const InfoContent = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  

  & > div, & > span { // InfoContent 직계 자식들에게 적용
    ${theme.fonts['body-14R']};
    color: ${theme.colors['gray-01']};
  }
`;

export const LoginLink = css`
  ${theme.fonts['body-14M']}; // fontWeight 500
  color: ${theme.colors['gray-01']};
  text-decoration: underline;
  cursor: pointer;
`;

export const HighlightBackground = css`
  display: inline-flex; // span처럼 동작하도록
  align-items: center;
  background-color: ${theme.colors['gray-05']};
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
  height: 2.2rem;
  width: 7.4rem;

  // 내부 아이콘/텍스트 스타일은 별도 정의 또는 상속
  & > svg { // 아이콘이 있다면
    margin-right: 0.4rem;
  }
`;

export const TextWithIcon = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// 임시 아이콘 스타일. 실제 SVG 아이콘으로 대체 필요
export const TempIcon = css`
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid ${theme.colors['gray-03']}; // 임시 Question 마크 테두리
  border-radius: 2px; // Question 마크 테두리 둥글게
  position: relative;

  // 물음표 모양 (임시)
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: ${theme.colors['gray-01']}; // 내부 색상
  }
  // 물음표의 ? 부분 (간단화)
  &::before {
    width: 4.48px;
    height: 7.92px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PickupInfoText = css`
  ${theme.fonts['body-14R']};
  color: ${theme.colors['gray-01']};
  line-height: 1.45; /* 20.30px / 14px */
  
  /* 여러 줄 텍스트의 줄바꿈 처리를 위해 white-space 추가 */
  white-space: pre-line; 
`;

export const ButtonContainer = css`
  padding: 0 1.6rem;
`;