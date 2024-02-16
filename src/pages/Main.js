import React from 'react'
import MainBanner from '../components/MainBanner'
import styled from 'styled-components'
import NewsBanner from '../components/NewsBanner'

const Main = () => {
    return (
        <MainContainer>
            <MainBanner/>
            <NewsBanner/>
        </MainContainer>
        )
    }

export default Main

const MainContainer = styled.main`
    position: relative;
    display: block;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: 'News-Font-bold';
    z-index: 3;
`;