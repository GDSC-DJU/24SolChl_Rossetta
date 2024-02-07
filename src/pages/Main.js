import React from 'react'
import MainBanner from '../components/MainBanner'
import styled from 'styled-components'

const Main = () => {
    return (
        <MainContainer>
            <MainBanner/>
        </MainContainer>
    )
    }

export default Main

const MainContainer = styled.main`
    position: relative;
    top: 70px;
    z-index: 1;
`;