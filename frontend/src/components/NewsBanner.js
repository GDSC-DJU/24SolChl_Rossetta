import React from 'react'
import styled from 'styled-components'

const NewsBanner = () => {
    return (
        <NewsBannerContainer>
            <NewsBannerWrapper>
                <h3>소식 뉴스</h3>
                <NewsBannerContent>
                    <NewsItem onClick={() => window.open('https://www.chemicalnews.co.kr/news/articleView.html?idxno=6027')}>
                        <NewsImageWrapper style={{height: "100%"}}>
                            <NewsImage src='./assets/news4.png' style={{height: "100%"}}>
                            </NewsImage>
                            <NewsTitle>
                                모두를 위한 '경계선지능인'에 대한 관심과 국가 지원 촉구
                            </NewsTitle>
                        </NewsImageWrapper>
                    </NewsItem>
                    <NewsItemSmall onClick={() => window.open('https://www.newsfreezone.co.kr/news/articleView.html?idxno=546390')}>
                        <NewsImageWrapper>
                            <NewsImage src='./assets/news1.jpg'>
                            </NewsImage>
                        </NewsImageWrapper>
                        <span>
                            700만명 육박하는 느린학습자, 지원책커녕 용어조차 없다
                        </span>
                    </NewsItemSmall>
                    <NewsItemSmall onClick={() => window.open('https://m.kmib.co.kr/view.asp?arcid=0924324165&code=11131100&sid1=soc')}>
                        <NewsImageWrapper>
                            <NewsImage src='./assets/news2.jpg'>
                            </NewsImage>
                        </NewsImageWrapper>
                        <span>
                            우리 곁 ‘포레스트 검프’ 700만명… 경계선지능인을 아시나요
                        </span>
                    </NewsItemSmall>
                    <NewsItemSmall onClick={() => window.open('https://theindigo.co.kr/archives/50117')}>
                        <NewsImageWrapper>
                            <NewsImage src='./assets/news3.jpg'>
                            </NewsImage>
                        </NewsImageWrapper>
                        <span>
                            인구의 13.6%, ‘경계성 지능인’ 지원책 ‘전무’…장애등록제 ‘한계’
                        </span>
                    </NewsItemSmall>
                    <NewsItemSmall onClick={() => window.open('https://www.kukinews.com/newsView/kuk202310230221')}>
                        <NewsImageWrapper>
                            <NewsImage src='./assets/news5.png'>
                            </NewsImage>
                        </NewsImageWrapper>
                        <span>
                            학습부진·따돌림 겪는 ‘경계선 지능 아동’…“맞춤형 서비스 필요”
                        </span>
                    </NewsItemSmall>
                </NewsBannerContent>
            </NewsBannerWrapper>
        </NewsBannerContainer>
    )
}

export default NewsBanner

const NewsBannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 80px;
`;

const NewsBannerWrapper = styled.div`
    width: 1220px;
    height: 550px;

    h3 {
        font-size: 36px;
        margin-bottom: 8px; 
        margin-left: 20px;
    }
`;
    
const NewsBannerContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
    padding: 10px;
    overflow: hidden;
`;
    
const NewsItem = styled.div`
    position: relative;
    over-flow: hidden;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
`;

const NewsItemSmall = styled.div`
    position: relative;
    over-flow: hidden;
    width: 100%;
    height: 236px;
`;

const NewsTitle = styled.span`
    position: absolute;
    bottom: 30px;
    left: 20px;
    width: 80%;
    height: auto;
    justify-content: start;
    font-size: 30px;
    color: #F7F7F7;
`;

const NewsImageWrapper = styled.div`
    position: relative;
    overflow: hidden;
`;

const NewsImage = styled.img`
    width: 100%;
    height: 200px;
    cursor: pointer;
    transition: transform 0.3s ease;


    &:hover {
        transform: scale(1.2);
    }
`;