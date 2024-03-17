import React from 'react'
import CardItem from '../components/CardItem';
import '../styles/Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>학습 페이지</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                         src = "assets/Learningimg/paintwithai.jpg"
                         text = "손가락으로 그림을 그려보세요!"
                         label = '그림 그리기'
                         path='paintwithai'
                        />    
                        <CardItem 
                         src = "assets/Learningimg/pronunciation.webp"
                         text = "문장을 읽은 후 발음을 교정해 보세요!"
                         label = '발음 교정'
                         path='pronunciation'
                        />    
                    </ul>    
                    <ul className='cards__items'>
                        <CardItem
                        src='assets/Learningimg/Situation.png'
                        text='그림을 보고 상황을 인지해 보세요!'
                        label='상황 인지'
                        path='situation'
                        />
                        <CardItem
                        src='assets/Learningimg/pattern.PNG'
                        text='패턴을 똑같이 따라 체크해 보세요!'
                        label='패턴 그리기'
                        path='pattern'
                        />
  
                    </ul>    
                </div>
            </div>            
        </div>
    );
}

export default Cards;
