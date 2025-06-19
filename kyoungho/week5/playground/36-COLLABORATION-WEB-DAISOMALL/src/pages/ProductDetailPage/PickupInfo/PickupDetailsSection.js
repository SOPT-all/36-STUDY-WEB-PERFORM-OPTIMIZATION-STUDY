import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import * as S from './PickupDetailsSection.style';
const TextWithIconComponent = ({ text, icon, additionalIcon }) => {
    return (_jsxs("div", { css: S.TextWithIcon, children: [_jsx("span", { children: text }), icon && icon, additionalIcon && (_jsx("div", { css: S.QuestionCircleContainer, children: additionalIcon }))] }));
};
const PickupInfoComponent = ({ text, icon }) => {
    return (_jsxs("div", { css: S.PickupInfoWrapper, children: [_jsx("span", { css: S.PickupInfoText, children: text }), icon && (_jsx("div", { css: S.QuestionCircleAlignBottom, children: icon }))] }));
};
const PickupDetailsSection = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { css: S.InfoRow, children: [_jsx("span", { css: S.InfoLabel, children: "\uD53D\uC5C5\uC815\uBCF4" }), _jsxs("div", { css: S.InfoContent, children: [_jsx(TextWithIconComponent, { text: "\uB9E4\uC7A5\uD53D\uC5C5 \uB9C8\uAC10, \uC9C0\uAE08 \uACB0\uC81C\uD558\uBA74", icon: _jsx("div", { css: S.PickupTomorrowContainer, children: _jsx("img", { src: "/svgs/pickup-tomorrow.svg", alt: "\uB0B4\uC77C \uD53D\uC5C5 \uAC00\uB2A5" }) }), additionalIcon: _jsx("img", { src: "/svgs/question-circle.svg", alt: "\uBB38\uC758" }) }), _jsx(PickupInfoComponent, { text: "\uACB0\uC81C \uD6C4 \uC0C1\uD488\uC900\uBE44 \uC644\uB8CC \uC54C\uB9BC\uD1A1(\uD53D\uC5C5\uBC14\uCF54\uB4DC)\n24\uC2DC\uAC04 \uC774\uB0B4 \uBC1C\uC1A1, \uCD5C\uB300 2\uC77C\uAE4C\uC9C0 \uD53D\uC5C5 \uAC00\uB2A5", icon: _jsx("img", { src: "/svgs/question-circle.svg", alt: "\uBB38\uC758" }) }), _jsx(TextWithIconComponent, { text: "\uD53D\uC5C5 \uC218\uC218\uB8CC 200\uC6D0", additionalIcon: _jsx("img", { src: "/svgs/question-circle.svg", alt: "\uBB38\uC758" }) })] })] }) }));
};
export default PickupDetailsSection;
