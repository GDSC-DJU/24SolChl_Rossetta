import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import  '../styles/Cards.css';
import '../styles/Button.css'


function CardItem(props) {

  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='container'>
            <Link to={props.path} state={{level: 1}}>
            <button className='btn-hover color-5'>LV.1</button>
            </Link>
            <Link to={props.path} state={{level: 2}}>
            <button className='btn-hover color-5'>LV.2</button>
            </Link>
            <Link to={props.path} state={{level: 3}}>
            <button className='btn-hover color-5'>LV.3</button>
            </Link>
          </div>
          <div className='cards__item__info'>
            <p className='cards__item__text'>{props.text}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;