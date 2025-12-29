import { useRef } from 'react';

export const useSwipeNavigation = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  enabled: boolean = true
) => {
  const startX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enabled) return;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!enabled || startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    // 스와이프 감지 임계값 (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      } else if (diff < 0 && currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    }
    startX.current = null;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
}; 