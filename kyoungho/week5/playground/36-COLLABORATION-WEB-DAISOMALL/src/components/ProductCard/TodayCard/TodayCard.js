import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
import * as T from './TodayCard.style';
const TodayCard = ({ imageUrl, profileImage, username, title, views, }) => {
    const [bookmarked, setBookmarked] = useState(false);
    const toggleBookmark = () => setBookmarked((prev) => !prev);
    return (_jsxs("div", { css: T.wrapper, children: [_jsx("img", { src: imageUrl, alt: "\uB300\uD45C \uC774\uBBF8\uC9C0", css: T.mainImage }), _jsxs("div", { css: T.contentArea, children: [_jsxs("div", { css: T.infoGroup, children: [_jsxs("div", { css: T.topRow, children: [_jsxs("div", { css: T.profileArea, children: [_jsx("img", { src: profileImage, alt: username, css: T.profileImage }), _jsx("span", { css: T.username, children: username })] }), _jsx("button", { onClick: toggleBookmark, css: [
                                            T.bookmarkButton,
                                            bookmarked ? T.bookmarkIconActive : T.bookmarkIcon,
                                        ], "aria-label": "\uBD81\uB9C8\uD06C", children: _jsx("img", { src: "/svgs/bookmark-icon.svg", alt: "\uBD81\uB9C8\uD06C", width: 20, height: 20 }) })] }), _jsx("p", { css: T.title, children: title })] }), _jsxs("div", { css: T.viewRow, children: [_jsxs("span", { css: T.viewCount, children: [views.toLocaleString(), "\uBA85"] }), _jsx("span", { css: T.viewText, children: "\uBD24\uC5B4\uC694" })] })] })] }));
};
export default TodayCard;
