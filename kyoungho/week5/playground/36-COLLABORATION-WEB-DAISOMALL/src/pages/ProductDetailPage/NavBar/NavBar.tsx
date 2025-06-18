/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import * as S from './NavBar.style';

interface TabInfo {
  id: number;
  title: string;
  count?: number;
}

interface NavBarProps {
  onTabClick?: (tabId: number) => void;
  reviewCount?: number;
}

const NavBar = ({ onTabClick, reviewCount }: NavBarProps) => {
  const [activeTab, setActiveTab] = useState(1);
  const [barPosition, setBarPosition] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabs: TabInfo[] = [
    { id: 1, title: '상품설명' },
    { id: 2, title: '리뷰', count: reviewCount || 0 },
    { id: 3, title: '상품정보' }
  ];

  // 활성 탭이 변경되면 바의 위치를 업데이트
  useEffect(() => {
    if (tabRefs.current[activeTab - 1]) {
      const activeTabElement = tabRefs.current[activeTab - 1];
      if (activeTabElement) {
        const containerLeft = activeTabElement.parentElement?.getBoundingClientRect().left || 0;
        const tabLeft = activeTabElement.getBoundingClientRect().left;
        setBarPosition(tabLeft - containerLeft);
      }
    }
  }, [activeTab]);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
    onTabClick?.(tabId);
  };

  return (
    <nav css={S.container} role="navigation" aria-label="상품 상세 탭">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          ref={el => { tabRefs.current[index] = el; }}
          css={S.tabItem}
          onClick={() => handleTabClick(tab.id)}
          aria-selected={tab.id === activeTab}
          role="tab"
          type="button"
        >
          <span css={S.tabText(tab.id === activeTab)}>
            {tab.title}
            {tab.count !== undefined && ` ${tab.count.toLocaleString()}`}
          </span>
        </button>
      ))}
      <div css={S.activeBarContainer}>
        <div 
          css={S.activeBar} 
          style={{ 
            transform: `translateX(${barPosition}px)`,
            width: tabRefs.current[activeTab - 1]?.offsetWidth || '33.33%'
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;