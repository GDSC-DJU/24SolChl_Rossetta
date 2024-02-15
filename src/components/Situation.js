import React, { useEffect, useState } from 'react'
import SituationQuiz from './SituationQuiz'
import styled from 'styled-components'
import PageLayout from './PageLayout'

const Situation = () => {
  
	return (
		<PageLayout name="상황판단퀴즈">
			<PageContainer>
				<SituationQuiz/>
			</PageContainer>
		</PageLayout>
	)
}
export default Situation

const PageContainer = styled.div`
	width: 100vw;
    align-items: center;
	padding: 50px 0;
`;

const PageTitle = styled.h1`
	display: block;
    text-align: center;
    margin-bottom: 50px;
`;