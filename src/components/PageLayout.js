import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styled from 'styled-components';

const PageLayout = ({ name, children }) => {
    //Props 양식 => current: 현재 주소 "/learning/situation" / name: 주소 이름 "상황판단"
    const [traceLocation, setTraceLocation] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(location.pathname.includes("learning")){
            setTraceLocation({위치:"/learning", 이름: "학습"});
        }
        else if(location.pathname.includes("introduction")){
            setTraceLocation({위치:"/introduction", 이름: "소개"});
        }
    }, [])
    
    const SubNavigator = () => {
        return(
            <SubNavigatorWrapper>
                <ToHome src="../../assets/home.png" onClick={() => navigate("/")}/>
                <span> &gt; </span>
                {Object.keys(traceLocation).length > 0 ? 
                <>
                <ToPage onClick={() => navigate(Object.values(traceLocation)[0])}>{Object.values(traceLocation)[1]}</ToPage>
                </>
                : null}
                {name ?
                <>
                <span> &gt; </span>
                <ToPage onClick={() => navigate(location.pathname)}>{name}</ToPage>
                </> 
                : null}
            </SubNavigatorWrapper>
        )
    }


    return (
    <PageContainer>
        <PageTitleWrapper>
            {name}
        </PageTitleWrapper>
        <PageWrapper>
            <SubNavigator/>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </PageWrapper>
    </PageContainer>
    )
}
export default PageLayout;

const PageContainer = styled.div`
    position: relative;
    display: block;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: 'Korean-Font-bold';
    z-index: 300;
    width: 100%;    
`;

const PageTitleWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    font-size: 40px;
    color: #474747;
    margin-top: 35px;
`;

const PageWrapper = styled.div`
    postition: relative;
    height: auto;
    min-height: 550px;
    justify-content: center;
    margin: 0 70px;
`;

const SubNavigatorWrapper = styled.nav`
    position: relative;
    display: flex;
    padding-right: 70px;
    width: 100%;
    height: 24px;
    justify-content: flex-end;
    align-items: center;
    font-size: 13px;
    color: #474747;
    margin-bottom: 10px;
`;

const ToHome = styled.img`
    position: relative;
    bottom: 2px;
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-right: 20px;
`;

const ToPage = styled.span`
    cursor: pointer;
    margin: 0 20px;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid #474747;
    min-height: 300px;
`;
