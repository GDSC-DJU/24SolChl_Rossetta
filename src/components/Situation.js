import React, { useEffect, useState } from 'react'
import SituationQuiz from './SituationQuiz'
import styled from 'styled-components'

const Situation = () => {
  
	return (
		<PageContainer>
			<PageTitle>
				상황 판단 퀴즈 풀어보기
			</PageTitle>
			<SituationQuiz/>
		</PageContainer>
	)
}
export default Situation

const PageContainer = styled.div`
	width: 100vw;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

`;

const PageTitle = styled.h1`
	display: block;
    text-align: center;
    margin-bottom: 50px;
`;