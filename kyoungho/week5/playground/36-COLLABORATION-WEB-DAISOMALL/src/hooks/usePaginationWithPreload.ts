import { useState, useEffect } from 'react';

export function usePaginationWithPreload<T>(
  allItems: T[],
  pageSize: number,
  getImageUrl: (item: T) => string,
  data: any, // 필요시 타입 명시
  useSwipeNavigation: (
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void,
    enabled?: boolean
  ) => any
) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allItems.length / pageSize);

  const pagedItems = allItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 이미지 프리로드
  useEffect(() => {
    if (!data?.pages) return;
    if (currentPage < totalPages) {
      const nextPageItems = allItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
      nextPageItems.forEach(item => {
        const img = new window.Image();
        img.src = getImageUrl(item);
      });
    }
  }, [currentPage, data, totalPages, allItems, getImageUrl]);

  const swipeHandlers = useSwipeNavigation(currentPage, totalPages, setCurrentPage, true);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    pagedItems,
    swipeHandlers,
  };
} 