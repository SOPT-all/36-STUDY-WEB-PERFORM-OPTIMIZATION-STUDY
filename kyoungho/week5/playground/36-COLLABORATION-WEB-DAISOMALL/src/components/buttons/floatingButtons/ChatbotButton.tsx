import { ChatbotIcon } from '@assets/svgs';
import * as S from './ChatbotButton.style';

const ChatbotButton = () => (
  <button css={S.buttonStyle} aria-label="챗봇 상담">
    <ChatbotIcon css={S.iconStyle} />
  </button>
);

export default ChatbotButton;
