import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// SVG 컴포넌트를 실제 SVG 파일로 변경
import * as S from './ChatbotButton.style';
const ChatbotButton = () => (_jsx("button", { css: S.buttonStyle, "aria-label": "\uCC57\uBD07 \uC0C1\uB2F4", children: _jsx("img", { src: "/svgs/chatbot-icon.svg", alt: "\uCC57\uBD07", css: S.iconStyle }) }));
export default ChatbotButton;
