import React from 'react'
import styled from 'styled-components'

const SubBanner = () => {
return (
    <SubBannerContainer>
        <SubBannerWrapper>
            <NewsBanner>
                <NewsItem>
                    <img src='./assets/news4.png'>
                    </img>
                    <span>
                        어쩌구 저쩌구
                    </span>
                    
                </NewsItem>
                <div>
                    <img src='./assets/news1.png' style={{width: "100%"}}>
                    </img>
                </div>
                <div>
                    <img src='./assets/news2.png' style={{width: "100%"}}>
                    </img>
                </div>
                <div>
                    <img src='./assets/news3.png' style={{width: "100%"}}>
                    </img>
                </div>
                <div>
                    <img src='./assets/news5.png' style={{width: "100%"}}>
                    </img>
                </div>
            </NewsBanner>
        </SubBannerWrapper>
    </SubBannerContainer>
)
}

export default SubBanner

const SubBannerContainer = styled.div`
    position: relative;
    margin-top: 80px;
`;

const SubBannerWrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const NewsBanner = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    padding: 10px;
    overflow: hidden;
    border: solid;

    width: 1200px;
    height: 500px;
`;

const NewsItem = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;

    overflow: hidden;
`;
