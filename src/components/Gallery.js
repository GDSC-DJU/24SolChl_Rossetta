import styled from "styled-components";
import { useState } from "react";
import FestivalImage from "../img/11.png";
import FestivalImage2 from "../img/hani.avif";
import FestivalImage3 from "../img/images.jpeg";

const ImageContentWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FestivalMainImage = styled.img`
  width: 800px;
  height: 450px;
  margin-top: 50px;
  border-radius: 30px;
`;

const FestivalMainImageWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  cursor: pointer;
`;

const ButtonIcon = styled.svg`
  cursor: pointer;
  margin-top: 21%;
  margin-left: 30px;
  margin-right: 30px;
`;
const images = [
  /* 이미지 경로를 리스트로 저장 */

  {
    source: FestivalImage,
  },
  {
    source: FestivalImage2,
  },
  {
    source: FestivalImage3,
  },
];

const ImageContent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onClickImage = (index) => {
    setSelectedImageIndex(index);
  };
  const onNextImage = () => {
    /* next버튼을 눌렀을 때 실행되는 함수 */
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }; /* 이미지 Index가 하나 늘어나도록 구현 */

  const onPrevImage = () => {
    /* prev버튼을 눌렀을 때 실행되는 함수 */
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    ); /* 이미지 Index가 하나 줄어들도록 구현 */
  };

  return (
    <ImageContentWrap>
      <FestivalMainImageWrap>
        <ButtonIcon
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          onClick={onPrevImage}
        >
          <path
            d="M25 30L15 20L25 10"
            stroke="#949494"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </ButtonIcon>
        <FestivalMainImage
          src={images[selectedImageIndex].source}
          alt="Festival Image"
        ></FestivalMainImage>
        <ButtonIcon
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          onClick={onNextImage}
        >
          <path
            d="M15 30L25 20L15 10"
            stroke="#949494"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </ButtonIcon>
      </FestivalMainImageWrap>
      {images.map((image, index) => (
        <PreviewImage
          key={index}
          src={image.source}
          alt={`Image ${index}`}
          onClick={() => onClickImage(index)} // 수정된 부분
        />
      ))}
    </ImageContentWrap>
  );
};

export default ImageContent;
