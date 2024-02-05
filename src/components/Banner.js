import React from 'react'
import styled from 'styled-components'
import '../styles/Banner.css'

const Banner = () => {
  return (
    <div className='slider'>
        <div className='slider__arrow' style={{left: "0px"}}>
            <span className='arrow'>
                {"<"}
            </span>
        </div>
        <div className='banner-row'>
            <img className='banner-image' src='assets/snow-drop.jpg' alt="설강화"/>
            <img className='banner-image' src='assets/snow-drop.jpg' alt="설강화"/>
            <img className='banner-image' src='assets/snow-drop.jpg' alt="설강화"/>
            <img className='banner-image' src='assets/snow-drop.jpg' alt="설강화"/>
            <img className='banner-image' src='assets/snow-drop.jpg' alt="설강화"/>
        </div>
        <div className='slider__arrow' style={{right: "0px"}}>
            <span className='arrow'>
                {">"}
            </span>
        </div>
    </div>
  )
}

export default Banner







