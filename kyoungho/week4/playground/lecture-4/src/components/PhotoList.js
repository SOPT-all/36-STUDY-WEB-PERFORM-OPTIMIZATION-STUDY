import React from 'react';
import PhotoItem from './PhotoItem';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

function PhotoList({ photos }) {
  return (
    <PhotoListWrap>
      {photos.map((photo, i) => {
        return (
          <LazyLoad key={i} height={200} offset={1000} once>
            <PhotoItem photo={photo} />
          </LazyLoad>
        );
      })}
    </PhotoListWrap>
  );
}

const PhotoListWrap = styled.div`
  margin: 20px auto;
  width: 70%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export default PhotoList;
