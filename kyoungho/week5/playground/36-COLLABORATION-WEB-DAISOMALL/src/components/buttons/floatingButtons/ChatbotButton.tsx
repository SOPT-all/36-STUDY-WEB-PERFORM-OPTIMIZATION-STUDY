// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from './ChatbotButton.style';

const ChatbotButton = () => (
  <button css={S.buttonStyle} aria-label="챗봇 상담">
    <img src="/svgs/chatbot-icon.svg" alt="챗봇" css={S.iconStyle} />
  </button>
);

export default ChatbotButton;
