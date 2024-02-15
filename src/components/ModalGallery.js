import { useState } from "react";
import styled from "styled-components";

const ImageContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContentRow = styled.div`
  flex-direction: row;
  margin-left: 40px;
`;

const FestivalMainImage = styled.img`
  width: 100%;
  height: 100%;
  border-style:solid;
  border-width: 2px;
  border-radius: 30px;
`;

const FestivalMainImageWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 50px;
  cursor: pointer;
  border-style:solid;
  border-width: 0.5px;
`;

const ButtonIcon = styled.svg`
  cursor: pointer;
`;

// 이미지 경로를 동적으로 생성
const images = [
  "/myGallery/tree.jpg"
].map((src) => ({ source: src }));

const ImageContent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onClickImage = (index) => {
    setSelectedImageIndex(index);
  };

  const onNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const onPrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 현재 선택된 이미지를 중심으로 전, 후 이미지 배열 생성
  const getVisibleImages = () => {
    const totalImages = images.length;
    const prevIndex = (selectedImageIndex - 1 + totalImages) % totalImages;
    const nextIndex = (selectedImageIndex + 1) % totalImages;

    return [
      images[prevIndex],
      images[selectedImageIndex],
      images[nextIndex],
    ];
  };

  const visibleImages = getVisibleImages();

  return (
    <ImageContentWrap>
      <FestivalMainImageWrap>
        <FestivalMainImage
          src={images[selectedImageIndex].source}
          alt="Festival Image"
        />
      </FestivalMainImageWrap>
      <ImageContentRow>
        {visibleImages.map((image, index) => (
          <PreviewImage
            key={index}
            src={image.source}
            alt={`Preview Image ${index}`}
            onClick={() => onClickImage(images.indexOf(image))} // 이미지 클릭 시 해당 이미지로 변경
          />
        ))}
      </ImageContentRow>
    </ImageContentWrap>
  );
};

export default ImageContent;
