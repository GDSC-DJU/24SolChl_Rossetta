import React from 'react'
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';

const Introduction = () => {
return (
    <PageLayout>
        <Container>
            <TitleWrapper>
                로제타(Rossetta)는
                <TitleContent>
                    로제타는 느린학습자 아동들을 위한 학습컨텐츠를 제공합니다.<br/>
                    위치적 제약 혹은 장소에 따른 한계로 인한 교육의 불평등 해소하고, <br/> 
                    경계선 지능 미취학 아동들의 진학 여건을 보장하고, <br/>
                    정부의 제도적 지원의 부재로 인한 공백을 채울 것입니다. <br/>
                </TitleContent>
            </TitleWrapper>
            <ContentWrapper>
                <ContentTitle>경계선 지능인</ContentTitle>
                <ContentScript><img src='./assets/borderline-intelligent.png'></img></ContentScript>
                <span style={{fontFamily: "NotoSans", lineHeight: 2.5}}>
                    웩슬러 지능검사 기준으로 지능지수가 70~79점이거나<br/>
                    DSM 기준 71~84점으로 지적장애인과 비 지적장애인<br/>
                    사이의 <span style={{color: '#36BC9B'}}>경계선</span>으로 분류되는 상태
                </span>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>경계선 지능 아동</ContentTitle>
                <ContentScript><img src='./assets/graph1.png' style={{marginLeft: "70px", borderRadius: "50px"}}></img></ContentScript>
                <span style={{fontFamily: "NotoSans", lineHeight: 2.5, paddingLeft: "30px"}}>
                    경계선 지능 판정의 아동들은 학교 입학 후에도<br/> 학급생활의 어려움과 학습부진, 대인관계 등<br/>
                    <span style={{color: '#36BC9B'}}>여러 어려움</span>을 겪고 있습니다.<br/>
                </span>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>목적</ContentTitle>
                <ContentScript>원활한 학습 능력을 갖출 수 있도록 맞춤형 교육을 제공함으로써 <br/>
                                인지, 언어, 지각, 기억 등 다방면의 능력을 함양하며,
                                추후 아이들이 초등교육 학습 진행에 지장 없이 원활히 학습할 수 있는 능력을 키우도록 함입니다.</ContentScript>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>비전</ContentTitle>
                <ContentScript>경계선 지능 아동들의 교육 접근성 확보와 공정성 제고</ContentScript>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>가치</ContentTitle>
                <ContentScript style={{width: "1050px"}}>
                    <ValueGrid>
                        <div>
                            <GridTitle>
                                <TitleIcon src='./assets/balance-icon.png'/>
                                <TitleName>평등</TitleName>
                            </GridTitle>
                            <div>
                                사회적 양극단 교육 수준의 간극을 줄이고,<br/>
                                위치적 제약 혹은 장소에 따른 한계로 인한 교육의 불평등 해소합니다.
                            </div>
                        </div>
                        <div>
                            <GridTitle>
                                <TitleIcon src='./assets/people-icon.png'/>
                                <TitleName>협동</TitleName>
                            </GridTitle>
                            <div>
                                느린학습자와 관련된 일원들의 동일된 상황과 가치관의 사람들이 모여 합리적인 방안을 모색하고,
                                사회적 변화와 인식 개선을 도모합니다.   
                            </div>
                        </div>
                        <div>
                            <GridTitle>
                                <TitleIcon src='./assets/condition-icon.png'/>
                                <TitleName>자립</TitleName>
                            </GridTitle>
                            <div>
                                느린학습자가 타인에게 의지하거나 예속되지 않고, 자기 결정권을 존중받고, 주체적인 삶을 살아갈 수 있는 사회적 자립 실현합니다.
                            </div>
                        </div>
                    </ValueGrid>
                </ContentScript>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>미션</ContentTitle>
                <ContentScript style={{width:"1050px", height: "250px"}}>
                    <MissionGrid>
                        <MissionElement>
                            <MissionElementTitle>접근성 향상</MissionElementTitle>
                            <MissionElementTitleEng>Improving accessibility</MissionElementTitleEng>
                        </MissionElement>
                        <MissionElement>
                            <MissionElementTitle>인식 개선</MissionElementTitle>
                            <MissionElementTitleEng>Improving perception</MissionElementTitleEng>
                        </MissionElement>
                        <MissionElement>
                            <MissionElementTitle>포용 범위 확장</MissionElementTitle>
                            <MissionElementTitleEng>extending embraced scope</MissionElementTitleEng>
                        </MissionElement>
                        <MissionElement>
                            <MissionElementTitle>커뮤니티 구축</MissionElementTitle>
                            <MissionElementTitleEng>community system</MissionElementTitleEng>
                        </MissionElement>
                    </MissionGrid>
                </ContentScript>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>이름</ContentTitle>
                <ContentScript><img src='./assets/RosettaSherwoodHall.png' style={{width:"200px", height:"200px",borderRadius: "30px"}}></img></ContentScript>
                <span style={{fontFamily: "NotoSans", lineHeight: 2.5, margin: "0 0 11px 15px", color: "#666666"}}>
                    <div style={{fontSize: "24px", color:"#000000"}}>로제타 셔우드 홀 (Rosetta Sherwood Hall)</div>
                    : 로제타 셔우드 홀(Losetta Sherwood Hall)은 1890년 한국에 와서 44년간 선교사역을 감당하였 으며, 주로 여성과 장애인을 위한 복지와 교육, 의료사역에 매진하였다. 로제타 홀은 우리나라 에서 최초로 근대화된 특수교육을 시작하였다.
                </span>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>로고</ContentTitle>
                <ContentScript><img src='./assets/logo_bg.png' style={{width:"200px", height:"200px",borderRadius: "30px"}}></img></ContentScript>
                <span style={{fontFamily: "NotoSans", lineHeight: 2.5, margin: "0 0 11px 15px", color: "#666666"}}>
                    <div style={{fontSize: "24px", color:"#000000"}}>설강화 (Snow Drop)</div>
                    :희망, 위안 등의 꽃말 뜻을 가진 설강화<br/>
                    "한파로 얼어붙은 땅을 뚫고 나온 설강화처럼 움츠렸던 몸과 마음을 펴고 모두가 희망의 봄을 맞이하기를 기대한다" 라는 의미를 내포
                </span>
            </ContentWrapper>
            <ContentWrapper>
                <ContentTitle>인사말</ContentTitle>
                <ContentScript style={{fontStyle: "italic", lineHeight: 3, color: "#000000"}}>
                    안녕하세요? <br/>

                    저희 로제타 홈페이지를 방문해 주신 모든 분들에게 감사 인사드립니다.<br/>

                    로제타는 현 대한민국 사회 시점에서 경계선 지능인들을 위한 제도적 부족 상황에서부터 시작하여,<br/>
                    경계선 지능인들을 위한 학습의 필요성의 목소리에 기반하여 출발하게 되었습니다.<br/>

                    우리의 인생은 모두 각기 다른 길을 걷습니다.<br/>
                    
                    그 길이 비록 어렵고 험난한 길이라도 돌아봤을 땐 아름다운 길이였길 바랍니다.<br/>
                    
                    항상 여러분께 용기가 되어 주도록 노력하겠습니다. 이 세상의 빛과 소금의 되는 여러분이 되길 기원합니다.<br/>

                    <span style={{fontFamily:"NotoSansBold", color: '#36BC9B'}}>로제타 개발팀 일동</span>
                </ContentScript>
            </ContentWrapper>
        </Container>
    </PageLayout>        
)
}
export default Introduction

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    min-width: 1000px;
`;

const TitleWrapper = styled.div`
    display: block;
    position: relative;
    align-items: center;
    font-family: 'NotoSansBold';
    color: #000000;
    font-size: 44px;
    margin-top: 40px;
`;

const TitleContent = styled.div`
    font-size: 18px;
    font-family: 'NotoSans';
    margin-top: 20px;
    color: #666666;
    line-height: 1.5;
`;


const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    margin-top: 40px;
    padding-top: 30px;
    border-top: 1px solid #e5e7eb;
`;

const ContentTitle = styled.div`
    font-size: 24px;
    width: 218px;
    flex-basis: 218px;
    font-family: 'NotoSansBold';
    flex-shrink: 0;
`;
const ContentScript = styled.div`
    // flex-grow: 1;
    font-size: 16px;
    font-family: 'NotoSans';
    padding-left: 20px;
    border-left: 1px solid #e5e7eb;
    line-height: 2.0;
    color: #666666;
`;

const ValueGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const GridTitle = styled.div`
    display: flex;
    align-items: center;
`;

const TitleIcon = styled.img`
    width: 32px;
    height: 32px;

`
const TitleName = styled.span`
    font-family: 'NotoSansBold';
    font-size: 24px;
    margin-left: 10px;
    padding-top: 7px;
    color: #000000;
`;

const MissionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-left: 26px;
    border: 1px solid #36BC9B;
    border-radius: 200px;
    padding: 18px 32px;
`;

const MissionElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 220px;
    width: 220px;
    border: 1px solid #white;
    border-radius: 110px;
    background-color: #f4f4f4;
`;

const MissionElementTitle = styled.div`
    font-family: 'NotoSansBold';    
    font-size: 18px;
    color: #36BC9B;
`;
    
    const MissionElementTitleEng = styled.div`
    font-size: 14px;
    color: #28836D;
`;