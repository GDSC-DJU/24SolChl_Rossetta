import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const PageLayout = ({current, name}) => {
    //Props 양식 => current: 현재 주소 "/learning/situation" / name: 주소 이름 "상황판단"
    const [location, setLocation] = useState(current);
    const [locationName, setLocationName] = useState(name);
    const [traceLocation, setTraceLocation] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if(current){
            if(current.includes("education")){
                setTraceLocation({위치:"/learning", 이름: "학습"});
            }
            else if(current.includes("introduction")){
                setTraceLocation({위치:"/introduction", 이름: "소개"});
            }
        }
    }, [current, name])
    
    const SubNavigator = () => {
        return(
            <SubNavigatorWrapper>
                <ToHome src="./assets/home.png" onClick={() => navigate("/")}/>
                <span> &gt; </span>
                {Object.keys(traceLocation).length > 0 ? 
                (<ToPage onClick={() => navigate(Object.values(traceLocation)[0])}>{Object.values(traceLocation)[1]}</ToPage>)
                (<span> &gt; </span>)
                : null}
                <ToPage onClick={() => navigate({location})}>{locationName}</ToPage>
            </SubNavigatorWrapper>
        )
    }


    return (
    <PageContainer>
        <PageTitleWrapper>
        
        </PageTitleWrapper>
        <PageWrapper>
            <SubNavigator/>

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
    // padding: 0 294px;
`;

const PageTitleWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
`;

const PageWrapper = styled.div`
    postition: relative;
    width: 100%;
    height: auto;
    min-height: 550px;
`;


const SubNavigatorWrapper = styled.nav`
    position: relative;
    display: flex;
    padding-top: 50px;
    padding-right: 20px;
    width: 100%;
    height: 24px;
    justify-content: flex-end;
    align-items: center;
    font-size: 13px;
    color: #474747;
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
