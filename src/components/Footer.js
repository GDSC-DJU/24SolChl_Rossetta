import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterCatcher>
            <LogoWrapper>
                <img src='./assets/logo.png' style={{height:"110%"}}></img>
            </LogoWrapper>
            <InfoWrapper>
                <br/>
                <Info>2024 Solution Challenge: Rossetta | GDSC Daejeon Chapter | Daejeon Univ.<br/></Info>
                <Info>Contact@ Email: rlawlsdn9583@gmail.com | Tel: 010-4767-9583</Info>
                <Info>Copyright © Google Developer Student Club Daejeon Chapter</Info>
                
            </InfoWrapper>
            <IconLinkWrapper>
                <IconLink src='./assets/gdsc-icon.jpg' onClick={() => window.open('https://github.com/GDSC-DJU')}></IconLink>
                <IconLink src='./assets/github-icon.jpg' onClick={() => window.open('https://github.com/GDSC-DJU/24SolChl_Rossetta')}></IconLink>
                <IconLink src='./assets/discord-icon.png' onClick={() => window.open('https://discord.com/channels/1068354018939768892/1068354019388571658')}></IconLink>
                <IconLink src='./assets/notion-icon.jpg' onClick={() => window.open('https://www.notion.so/ca7cf28972474b019ebca857149cb35e?pvs=4')}></IconLink>

            </IconLinkWrapper>
        </FooterCatcher>
      </FooterWrapper>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    // height: 170px;
    width: 100%;
    border-top: 1px solid #ebebeb;
    background-color: #f5f6f7;
    margin-top: 150px;
`;

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1220px;
    // height: 100%;
`;

const FooterCatcher = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
    width: 100%;
    font-size: 14px;
`;

const LogoWrapper = styled.div`
    float: left;
    text-align: center;
    margin-right: 30px;
    height: 131px;
    object-fit: cover;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate(174px, 3px);

    height: 131px;
    gap: 10px;
`;

const Info = styled.div`
    postion: relative;
    line-height: 1.5;
`;

const IconLinkWrapper = styled.div`
    display: flex;
    width: 170px;
    height: 42px;
    width: auto;
    object-fit: cover;
    justify-content: flex-end;
`;

const IconLink = styled.img`
    border-radius: 30px;
    cursor: pointer;
    margin-right: 5px;
    border: 1px solid #ddd;
`;
