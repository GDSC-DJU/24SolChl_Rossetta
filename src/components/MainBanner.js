import React from 'react'
import styled from 'styled-components';

const MainBanner = () => {
    return (
        <MainBannerWrapper>
            <img 
                alt="매인배너이미지"
                // src="./assets/rossetta-banner.png"
                src="./assets/main-banner2.png"
                style={{top: "100px", width: "100%"}}
            />
        </MainBannerWrapper>
    )
}

export default MainBanner;


const MainBannerWrapper = styled.div `
    position: relative;
`;
