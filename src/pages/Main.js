import React from 'react'
import MainBanner from '../components/MainBanner'
import styled from 'styled-components'
import SubBanner from '../components/SubBanner'

const Main = () => {
    return (
        <MainContainer>
            <MainBanner/>
            <SubBanner/>
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
    top: 70px;
    z-index: 1;
`;