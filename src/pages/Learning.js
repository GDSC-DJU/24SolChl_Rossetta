import React from 'react'
import CardItem from '../components/CardItem';

function Cards() {
    return (
        <div className='cards'>
            <h1>학습 페이지</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                         src = "img/paintwithai.jpg"
                         text = "손가락을 사용하여 그림을 그려보세요!"
                         label = '따라 그리기'
                         path='situation-quiz'
                        />    
                        <CardItem 
                         src = "images/img-2.jpg"
                         text = "패턴 따라 그리기"
                         label = 'Luxury'
                         path='/services'
                        />    
                    </ul>    
                    <ul className='cards__items'>
                        <CardItem
                        src='images/img-3.jpg'
                        text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
                        label='Mystery'
                        path='/services'
                        />
                        <CardItem
                        src='images/img-4.jpg'
                        text='Experience Football on Top of the Himilayan Mountains'
                        label='Adventure'
                        path='/products'
                        />
  
                    </ul>    
                </div>
            </div>            
        </div>
    );
}

export default Cards;