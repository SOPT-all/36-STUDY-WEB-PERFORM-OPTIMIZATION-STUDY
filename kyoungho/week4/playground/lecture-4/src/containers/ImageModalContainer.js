import React from 'react';
import { useSelector } from 'react-redux';
import ImageModal from '../components/ImageModal';

function ImageModalContainer() {
  // 방법 1: 개별 원시 값으로 분리하여 불필요한 리렌더링 방지
  const modalVisible = useSelector(state => state.imageModal.modalVisible);
  const bgColor = useSelector(state => state.imageModal.bgColor);
  const src = useSelector(state => state.imageModal.src);
  const alt = useSelector(state => state.imageModal.alt);

  return (
    <ImageModal
      modalVisible={modalVisible}
      bgColor={bgColor}
      src={src}
      alt={alt}
    />
  );
}

export default ImageModalContainer;
