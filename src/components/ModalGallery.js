import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios'
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
  const [visibleImages,setVisibleImages] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/paint/mypicpaint/info`, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJtaW5zZW9rMDMzOCIsInB3IjoidGpyZGwxNjUxISIsImlhdCI6MTcwNzk2ODgzMCwiZXhwIjoxNzA4NTY4ODMwLCJpc3MiOiJzZXJ2ZXIifQ.3xD5lLzuT4lMsWMwixf6QMqrKm7_sUEbrIRKSacQYiE"
      }
    }).then((res) => {
        console.log(res.data.response);
        setVisibleImages(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])

  return (
    <ImageContentWrap>
      <FestivalMainImageWrap>
        <FestivalMainImage
          src={visibleImages.length !== 0 ? visibleImages[selectedImageIndex].image : ''}
          alt="Festival Image"
        />
      </FestivalMainImageWrap>
      <ImageContentRow>
        {visibleImages.map((item, index) => (
          <PreviewImage
            key={index}
            src={visibleImages.length !== 0 ? item.image : ''}
            alt={`Preview Image ${index}`}
            onClick={() => onClickImage(index)} // 이미지 클릭 시 해당 이미지로 변경
          />
        ))}
      </ImageContentRow>
    </ImageContentWrap>
  );
};

export default ImageContent;
