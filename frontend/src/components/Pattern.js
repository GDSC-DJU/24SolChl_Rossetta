import React, { useState, useEffect } from 'react';
import '../styles/Pattern.css';
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const generateRandomPattern = (size) => {
  const pattern = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(Math.random() > 0.5);
    }
    pattern.push(row);
  }
  return pattern;
};

const Pattern = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  //const { patternId } = useParams();
  const [gridSize, setGridSize] = useState(10);
  const [gridPattern, setGridPattern] = useState(generateRandomPattern(10));
  const [userPattern, setUserPattern] = useState(Array(10).fill(0).map(() => Array(10).fill(false)));
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerID, setTimerID] = useState(null);
  const [isPatternMatching, setIsPatternMatching] = useState(false);
  const [level, setLevel] = useState(useParams().level);
  const [time, setTime] = useState(useParams().time); 

  useEffect(() => {
    document.documentElement.style.setProperty('--grid-size', gridSize);
  }, [gridSize]);

  useEffect(() => {
    let size;
    switch (level) {
      case '1':
        size = 3;
        break;
      case '2':
        size = 5;
        break;
      default:
        size = 10;
    }
    setGridSize(size);
    setGridPattern(generateRandomPattern(size));
    setUserPattern(Array(size).fill(0).map(() => Array(size).fill(false)));
  }, [level]);

  useEffect(() => {
    const grid = document.querySelector('.pattern-grid');
    const canvas = document.getElementById('gridCanvas');
    grid.style.width = `${canvas.width}px`;
    grid.style.height = `${canvas.height}px`;
  
    const cells = document.querySelectorAll('.grid-cell');
    const cellSize = `${canvas.width/gridSize}px`;
    cells.forEach(cell => {
      cell.style.width = cellSize;
      cell.style.height = cellSize;
    });
  }, [gridPattern, gridSize]);

  const handleCellClick = (row, col) => {
    const newPattern = userPattern.map((arr, rIndex) =>
      rIndex === row ? arr.map((val, cIndex) => (cIndex === col ? !val : val)) : arr
    );
    setUserPattern(newPattern);

    // 셀을 클릭하면 시간 카운트 시작
    if (!timerID) {
      const id = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
      setTimerID(id);
    }
  };

  const handleSubmit = () => {
    clearInterval(timerID);
    setTimerID(null);
    setTime(time);
    setLevel(level);


    const isMatching = checkPatternMatching();
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0];
    setIsPatternMatching(isMatching);

    axios.post(`http://localhost:8000/pattern/`, {
      level: level,
      time: time,
      date: date,
    }, {
      headers: {
        "Content-Type": 'application/json',
        Authorization: cookies.get('token')
      }
    })
    .then((res) => {
      console.log(res);
      //setLevel(res.data.level);
      //setTime(res.data.time);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const nextPattern = () => {
    setGridPattern(generateRandomPattern(gridSize));
    setUserPattern(Array(gridSize).fill(0).map(() => Array(gridSize).fill(false)));
    setTimeElapsed(0);
    clearInterval(timerID);
    setTimerID(null);
    setIsPatternMatching(false);
  };

  const checkPatternMatching = () => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (gridPattern[i][j] !== userPattern[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (gridPattern[i][j]) {
          ctx.fillRect(j * (canvas.width/gridSize), i * (canvas.height/gridSize), (canvas.width/gridSize), (canvas.height/gridSize));
        }
      }
    }
  
    // 그리드 라인 그리기
    ctx.strokeStyle = '#D3D3D3';  // 밝은 회색
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * (canvas.width/gridSize), 0);
      ctx.lineTo(i * (canvas.width/gridSize), canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * (canvas.height/gridSize));
      ctx.lineTo(canvas.width, i * (canvas.height/gridSize));
      ctx.stroke();
    }
  }, [gridPattern, gridSize]);

  useEffect(()=>{
    //로그인 안하면 로그임 페이지로 넘어가기
    if(cookies.get('token') === undefined){
      navigate('/login');
    }  
  },[])
  
  return (
    <PageLayout name ="패턴따라 그리기">
    <div className="all-pattern-container">
      <div className="pattern-grid-container">
        <div className="pattern-canvas-container">
          <canvas
            id="gridCanvas"
            className="grid-c"
            width={400}
            height={400}
          />
        </div>
        <div className="pattern-container">
        <div className={`pattern-grid pattern-grid-${gridSize}`}>
            {userPattern.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`grid-cell ${cell ? 'active' : ''}`}
                    onClick={() => handleCellClick(rowIndex, cellIndex)}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="pattern-button-container">
        <button className="pattern-submit-button" onClick={handleSubmit}>
          제출
        </button>
        <button className="pattern-next-button" onClick={nextPattern}>
          다음 문제
        </button>
      </div>
      <p>{isPatternMatching ? "잘했습니다." : "패턴이 일치하지 않습니다."}</p>
      <p>경과 시간: {timeElapsed}초</p>
    </div>
    </PageLayout>
  );
};

export default Pattern;
