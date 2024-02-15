// ColorPicker.js
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import '../styles/PaintWithAi.css'
import '../styles/button.css'


const ColorPicker = ({ color, onChangeComplete }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    return (
      <div className="color-picker-container">
      <button className="btn-hover color-5" onClick={handleClick}>색상 선택</button>
      {displayColorPicker ? (
          <div className="color-picker-dropdown">
              <SketchPicker color={color} onChangeComplete={onChangeComplete} />
          </div>
      ) : null}
  </div>
  
    );
};

export default ColorPicker;
