import React, { useEffect, useState } from 'react';
import quizData from './SituationQuizData';
import '../styles/Situation.css';
import '../styles/Button.css';
import PageLayout from './PageLayout';

const Situation = () => {
    const [currentQuiz, setCurrentQuiz] = useState({});             // 현재 문제 번호
    const [userAnswer, setUserAnswer] = useState('X');               // 유저가 선택한 선지
    const [totalAnswer, setTotalAnswer] = useState([]);             // 전체 문제 오답 체크
    const [count, setCount] = useState(0);                          // 푼 문제 카운트
    const [checkedAnswer, setCheckedAnswer] = useState(false);      // 선지 선택 유무
    const [finish, setFinish] = useState(false);                    // 모든 문제 풀이 완료
    const [quiz, setQuiz] = useState(quizData);                     // 남아있는 문제
    
    useEffect(() => {
        if(count === 3){
            setFinish(true);
        }
        else{
            setCurrentQuiz(quiz[RandomIndex(quiz.length)]);                                  // setCurrentQuiz // 현재 문제 번호
            setCount((pre) => pre + 1);                              // setCount       // 푼 문제 카운트
            setCheckedAnswer(false);
        }
    }, [totalAnswer])

    const RandomIndex = (length) =>                                      // 들어온 문제리스트 중 랜덤 선택
        Math.floor(Math.random() * length);                           // 올림하여 1부터 끝까지
    

    const ChoiceSelected = (answer) => {
        if(!checkedAnswer) setCheckedAnswer(true);
        if(answer !== userAnswer) setUserAnswer(answer);
    };
    
    const NextQuiz = () => {      
        if(userAnswer === currentQuiz.answer){            // 정답,오답 기록
            setTotalAnswer([...totalAnswer, 'O']);
        }
        else{
            setTotalAnswer([...totalAnswer, 'X']);
        }
        if(count < 3){
            let remainingQuiz = JSON.parse(JSON.stringify(quiz));
            let filteredQuiz= remainingQuiz.filter(qz => qz.index !== currentQuiz.index);
            setQuiz(filteredQuiz);
        }

        const radioButtons = document.getElementsByName('choice');
        radioButtons.forEach(button => {button.checked = false;});
    };

    // 결과화면 반환
    const resultCal = () => {
        let resultScreen = [];
        for (let i = 1; i <= count; i++) {
            resultScreen.push(
                <p key={i} style={{margin: "30px"}}>
                    {i}번 문제: {totalAnswer[i-1]}
                </p>
            );
        }
        return resultScreen;
    };

    if(!finish){
        return (
            <PageLayout name="상황판단퀴즈">
                <div className='page-wrap'>
                    <div className='quiz-wrapper'>
                        <img className='quiz-image' src={Object.keys(currentQuiz).length > 0 ? currentQuiz.image : 'X'} alt='상황 이미지'/>
                    </div>
                    <div className='answer-wrapper'>
                        
                        <p className='quiz-title'>&#40;{count}번&#41; {Object.keys(currentQuiz).length > 0 ? currentQuiz.question : 'X'}</p>
                        <p className='choice-wrapper'>
                            <label htmlFor="choice1">
                                <input type="radio" id="choice" name="choice" value="1"
                                onChange={() => ChoiceSelected('1')}/>
                                <span>
                                    {Object.keys(currentQuiz).length > 0 ? currentQuiz.choices[0] : 'X'}
                                </span>
                            </label>
                        </p>
                        <p className='choice-wrapper'>
                            <label htmlFor="choice2">
                                <input type="radio" id="choice" name="choice" value="2"
                                onChange={() => ChoiceSelected('2')}/>
                                <span>
                                    {Object.keys(currentQuiz).length > 0 ? currentQuiz.choices[1] : 'X'}
                                </span>
                            </label>
                        </p>
                        <p className='choice-wrapper'>
                            <label htmlFor="choice3">
                                <input type="radio" id="choice" name="choice" value="3"
                                onChange={() => ChoiceSelected('3')}/>
                                <span>
                                    {Object.keys(currentQuiz).length > 0 ? currentQuiz.choices[2] : 'X'}
                                </span>
                        </label>
                        </p>
                        <p className='choice-wrapper'>
                            <label htmlFor="choice4">
                                <input type="radio" id="choice" name="choice" value="4"
                                onChange={() => ChoiceSelected('4')}/>
                                <span>
                                    {Object.keys(currentQuiz).length > 0 ? currentQuiz.choices[3] : 'X'}
                                </span>
                            </label>
                        </p>
                        <div class="button-wrapper">
                            {checkedAnswer ? 
                            <button class="btnFloat" onClick={NextQuiz}>다음 문제</button>
                            : <button class="btnFloat" >정답을 고르세요</button> }
                        </div>
                        <div class="quiz-desc"></div>
                    </div>
                </div>
            </PageLayout>
        )
    }
    else{
        return(
            <PageLayout name="상황판단퀴즈">
                <div className='result-screen'>
                    {resultCal()}
                </div>
            </PageLayout>
        )
    }
}
export default Situation