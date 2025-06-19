import * as S from './Pagination.style';
import { useRef } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isActive?: boolean;
  isHome?: boolean;
}

const SWIPE_THRESHOLD = 50;

// 스와이프 훅 (외부에서 사용 가능)
export const useSwipeNavigation = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  enabled: boolean = true,
) => {
  const startX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enabled) return;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enabled || startX.current === null) return;
    const diffX = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX > 0) {
        // 왼쪽으로 스와이프 (다음 페이지)
        onPageChange(currentPage === totalPages ? 1 : currentPage + 1);
      } else {
        // 오른쪽으로 스와이프 (이전 페이지)
        onPageChange(currentPage === 1 ? totalPages : currentPage - 1);
      }
    }
    startX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enabled) return;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!enabled || startX.current === null) return;
    const diffX = startX.current - e.clientX;
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX > 0) {
        onPageChange(currentPage === totalPages ? 1 : currentPage + 1);
      } else {
        onPageChange(currentPage === 1 ? totalPages : currentPage - 1);
      }
    }
    startX.current = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  isActive = false,
  isHome = false,
}: PaginationProps) {
  // Pagination 자체의 스와이프는 비활성화 (외부에서 useSwipeNavigation 훅 사용)
  const swipeHandlers = useSwipeNavigation(
    currentPage,
    totalPages,
    onPageChange,
    false,
  );

  // 바 렌더링
  const renderBars = () =>
    Array.from({ length: totalPages }, (_, index) => (
      <div
        key={index}
        css={S.paginationBarStyle(
          isHome ? index === 0 : currentPage === index + 1, // 홈에서는 항상 첫 번째 바만 활성화
          isActive && !isHome, // 홈에서는 클릭 기능 비활성화
        )}
        onClick={() => isActive && !isHome && onPageChange(index + 1)} // 홈에서는 클릭 불가
        role={isActive && !isHome ? 'button' : undefined}
        aria-label={
          isActive && !isHome ? `페이지 ${index + 1}로 이동` : undefined
        }
        tabIndex={isActive && !isHome ? 0 : -1}
        style={{ pointerEvents: isHome ? 'none' : 'auto' }} // 홈에서는 포인터 이벤트 차단
      />
    ));

  return (
    <div
      css={S.paginationWrapperStyle}
      {...swipeHandlers} // 현재는 비활성화되어 있음
    >
      <div css={S.paginationBarsContainer}>{renderBars()}</div>
    </div>
  );
}

export default Pagination;
