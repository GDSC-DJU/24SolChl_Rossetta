// ColorPicker.js
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import '../styles/style.css'


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
      <button onClick={handleClick}>색상 선택</button>
      {displayColorPicker ? (
          <div className="color-picker-dropdown">
              <SketchPicker color={color} onChangeComplete={onChangeComplete} />
          </div>
      ) : null}
  </div>
  
    );
};

export default ColorPicker;
