import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import * as S from './SearchResultTitle.style';
// 정렬 옵션 목록
const SORT_OPTIONS = [
    '최신순',
    '가격 낮은 순',
    '가격 높은 순'
];
const SearchResultTitle = ({ totalCount, initialSortOption = '최신순', onSortChange, showSortOptions = false, className, }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(initialSortOption);
    const handleSortClick = () => {
        setIsFilterOpen((prev) => !prev);
    };
    const handleSortOptionClick = (option) => {
        setSelectedSort(option);
        setIsFilterOpen(false);
        if (onSortChange) {
            onSortChange(option);
        }
    };
    // 정렬 옵션 드롭다운 렌더링
    const renderSortOptions = () => {
        if (!showSortOptions)
            return null;
        return (_jsxs("div", { css: S.sortOptionsContainerStyle, children: [_jsxs("button", { css: S.sortContainerStyle, onClick: handleSortClick, "aria-expanded": isFilterOpen, "aria-label": `${selectedSort} 정렬 옵션 선택하기`, type: "button", children: [_jsx("span", { css: S.sortTextStyle, children: selectedSort }), _jsx("div", { css: S.iconContainerStyle, children: _jsx("img", { src: "/svgs/small-arrow-down-icon.svg", alt: "Arrow Down", css: S.iconStyle }) })] }), isFilterOpen && (_jsx("div", { css: S.dropdownStyle, children: SORT_OPTIONS.map((option) => (_jsx("button", { css: S.optionButtonStyle(option === selectedSort), onClick: () => handleSortOptionClick(option), type: "button", children: option }, option))) }))] }));
    };
    return (_jsxs("div", { css: S.containerStyle, className: className, children: [_jsxs("span", { css: S.countTextStyle, children: ["\uCD1D ", totalCount, "\uAC1C"] }), renderSortOptions()] }));
};
export default SearchResultTitle;
