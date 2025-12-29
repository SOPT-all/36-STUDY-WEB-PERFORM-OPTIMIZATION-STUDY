import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { showModal, setBgColor } from '../redux/imageModal';
import { getAverageColorOfImage } from '../utils/getAverageColorOfImage';

function PhotoItem({ photo: { urls, alt } }) {
  const dispatch = useDispatch();

  const openModal = (e) => {
    const avgColor = getAverageColorOfImage(e.target);
    dispatch(setBgColor(avgColor));
    dispatch(showModal({ src: urls.full, alt }));
  };

  return (
    <ImageWrap>
      <Image src={urls.small + '&t=' + new Date().getTime()} alt={alt} onClick={openModal} crossOrigin="anonymous" />
    </ImageWrap>
  );
}

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 비율
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export default PhotoItem;
