import React from 'react'
import styled from 'styled-components'

const SubBanner = () => {

    const NewsClick = () => {

    }

    return (
        <SubBannerContainer>
            <SubBannerWrapper>
                <h3>소식 뉴스</h3>
                <NewsBanner>
                    <NewsItem onClick={() => window.open('https://www.chemicalnews.co.kr/news/articleView.html?idxno=6027')}>
                        <img src='./assets/news4.png' style={{width: "100%", height: "100%", cursor: "pointer"}}>
                        </img>
                        <NewsTitle>
                            모두를 위한 '경계선지능인'에 대한 관심과 국가 지원 촉구
                        </NewsTitle>
                    </NewsItem>
                    <div onClick={() => window.open('https://www.newsfreezone.co.kr/news/articleView.html?idxno=546390')}>
                        <img src='./assets/news1.jpg' style={{width: "100%", height: "200px", cursor: "pointer"}}>
                        </img>
                        <span>
                            김광명 부산시의원, 경계선지능 청년에 너무 높은 벽, 자립! 성인 느린학습자의 홀로서기 정책지원 강조
                        </span>
                    </div>
                    
                    <div onClick={() => window.open('https://www.hani.co.kr/arti/area/gangwon/1090490.html')}>
                        <img src='./assets/news2.jpg' style={{width: "100%", height: "200px", cursor: "pointer"}}>
                        </img>
                        <span>
                            우리 곁 ‘포레스트 검프’ 700만명… 경계선지능인을 아시나요
                        </span>
                    </div>
                    <div onClick={() => window.open('https://theindigo.co.kr/archives/50117')}>
                        <img src='./assets/news3.jpg' style={{width: "100%", height: "200px", cursor: "pointer"}}>
                        </img>
                        <span>
                            인구의 13.6%, ‘경계성 지능인’ 지원책 ‘전무’…장애등록제 ‘한계’
                        </span>
                    </div>
                    <div onClick={() => window.open('https://www.kukinews.com/newsView/kuk202310230221')}>
                        <img src='./assets/news5.png' style={{width: "100%", height: "200px", cursor: "pointer"}}>
                        </img>
                        <span>
                            학습부진·따돌림 겪는 ‘경계선 지능 아동’…“맞춤형 서비스 필요”
                        </span>
                    </div>
                </NewsBanner>
            </SubBannerWrapper>
        </SubBannerContainer>
    )
}

export default SubBanner

const SubBannerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 80px;
`;

const SubBannerWrapper = styled.div`
    width: 1220px;
    height: 550px;

    h3 {
        font-size: 36px;
        margin-bottom: 8px; 
        margin-left: 20px;
    }
    `;
    
    const NewsBanner = styled.div`
    
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    padding: 10px;
    overflow: hidden;
    `;
    
    const NewsItem = styled.div`
    position: relative;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
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
    