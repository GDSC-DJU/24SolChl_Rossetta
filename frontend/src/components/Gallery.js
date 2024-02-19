import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Cookies } from 'react-cookie';

const ImageContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ImageContentRow = styled.div`
  flex-direction: row;
  margin-left: 40px;
`;

const FestivalMainImage = styled.img`
  width: 300px;
  height: 100%;
  border-radius: 30px;
`;

const FestivalMainImageWrap = styled.div`
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 30px;
  cursor: pointer;
  border-style:solid;
  border-width: 0.5px;
`;

const ButtonIcon = styled.svg`
  cursor: pointer;
  margin-bottom: 20%;
`;





const ImageContent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [level, setLevel] = useState(useParams().level);

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

  const cookies = new Cookies();
  
let images = [];

if (level == 1) {
  // 이미지 경로를 동적으로 생성
  images = [
    "/assets/paintwithai/LV.1/1.webp",
    "/assets/paintwithai/LV.1/2.webp",
    "/assets/paintwithai/LV.1/3.png",
    "/assets/paintwithai/LV.1/4.webp",
  ].map((src) => ({ source: src }));
} else if (level == 2) {
  images = [
    "/assets/paintwithai/LV.2/5.webp",
    "/assets/paintwithai/LV.2/6.webp",
    "/assets/paintwithai/LV.2/7.webp",
    "/assets/paintwithai/LV.2/8.webp",
    "/assets/paintwithai/LV.2/9.webp",
  ].map((src) => ({ source: src }));

} else if (level == 3) {
  images = [
    "/assets/paintwithai/LV.3/10.webp",
    "/assets/paintwithai/LV.3/11.webp",
    "/assets/paintwithai/LV.3/12.webp",
    "/assets/paintwithai/LV.3/13.webp",
    "/assets/paintwithai/LV.3/14.webp",
  ].map((src) => ({ source: src }));
}
useEffect(()=>{
  axios.get(`http://35.208.138.116:8000/paint/paintex/${level}`,{
    headers: {
      "Content-Type": 'application/json',
      Authorization: cookies.get('token')
  
    }
  })  
  .then((res) => {
      console.log(res);
      images = res.data.response;
    })
    .catch((err) =>{
      console.log(err);
    });
  },[])


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
        />
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
