import { useCallback, useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Hands, Results } from "@mediapipe/hands";
// import { drawCanvas } from "./utils/drawCanvas";
import '../styles/style.css'

// const videoElement = document.getElementById('video');
// const canvasElement = document.getElementById('canvas');
// const canvasCtx = canvasElement.getContext('2d');

let xp = 0, yp = 0;
let drawColor = 'rgb(255, 0, 0)'; // 빨간색



const PaintWithAi = () =>{
  
  const videoRef = useRef();
  const canvasRef = useRef();
  let canvasCtx;
  let thickness = 20;
  const eraserIndicator = useRef();
  const fingerLine = useRef();
  const [display,setDisplay] = useState(false);
  const [fingerLineStlye,setFingerLineStlye] = useState([])

  useEffect(()=>{
    console.log(videoRef.current.width);
    videoRef.current.width = 800;
    videoRef.current.height = 450;
    canvasRef.current.width = 800;
    canvasRef.current.height = 450;
    console.log(canvasRef.current)
    canvasCtx = canvasRef.current.getContext("2d");
  },[])
  // videoElement.width = 800;
  // videoElement.height = 450;
  // canvasElement.width = 800;
  // canvasElement.height = 450;
  
  const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });
  
  hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
  });
  
  useEffect(()=>{
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
          await hands.send({ image: videoRef.current });
      },
      width: 1280,
      height: 720
  });
  
  camera.start();
  },[])

  
  function areFingersUp(landmarks) {
      const tipIds = [4, 8, 12, 16, 20];
      let fingersUp = [0, 0, 0, 0, 0];
  
      // 엄지 손가락은 x 좌표를 비교하여 판단
      if (landmarks[tipIds[0]].x > landmarks[tipIds[0] - 1].x) {
          fingersUp[0] = 1; // 엄지손가락이 올라와 있음
      }
  
      // 나머지 손가락들은 y 좌표를 비교하여 판단
      for (let i = 1; i < tipIds.length; i++) {
          if (landmarks[tipIds[i]].y < landmarks[tipIds[i] - 2].y) {
              fingersUp[i] = 1; // 해당 손가락이 올라와 있음
          }
      }
  
      return fingersUp;
  }
  
  
  const onResults = ((results) => {

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const landmarks = results.multiHandLandmarks[0];
          const fingersUp = areFingersUp(landmarks);
  
  
          // 대기 모드 판단 (검지와 새끼손가락만 올라가 있어야 함)
          const nonStand = [0, 2, 3]; // 엄지, 중지, 약지
          const isStandbyMode = fingersUp[1] === 1 && fingersUp[4] === 1 && nonStand.every(index => fingersUp[index] === 0);
  
          if (isStandbyMode) {
              const indexFingerTip = {
                  x: landmarks[8].x,
                  y: landmarks[8].y
              };
              const pinkyFingerTip = {
                  x: landmarks[20].x,
                  y: landmarks[20].y
              };
              updateFingerLine(indexFingerTip, pinkyFingerTip, canvasRef);
          } else {
            fingerLine.current.display = 'none';
          }
  
          // 선택 모드 판단 (검지와 중지만 올라가 있어야 함)
          const nonSel = [0, 3, 4]; // 엄지, 약지, 새끼손가락
          const isSelectionMode = fingersUp[1] === 1 && fingersUp[2] === 1 && nonSel.every(index => fingersUp[index] === 0);
  
          if (isSelectionMode) {
              // 선택 모드 시각화: 검지와 중지 손가락 사이에 선을 그림
  
          }
          const nonEarse = [2, 3, 4];
          const nonDraw = [0, 2, 3, 4];
          const isDrawMode = fingersUp[1] === 1 && fingersUp.every((val, i) => i === 1 || val === 0);
          const isEraserMode = fingersUp[0] === 1 && fingersUp[1] === 1 && nonEarse.every(index => fingersUp[index] === 0);
          // 검지손가락만 올라가 있고, 나머지 손가락들은 접혀있는지 확인
          if (fingersUp[1] === 1 && fingersUp.every((val, i) => i === 1 || val === 0)) {
              const indexFingerTipX = canvasRef.current.width - (landmarks[8].x * canvasRef.current.width);
              const indexFingerTipY = landmarks[8].y * canvasRef.current.height;
  
              if (xp !== 0 && yp !== 0) {
                  drawLine(xp, yp, indexFingerTipX, indexFingerTipY);
              }
  
              xp = indexFingerTipX;
              yp = indexFingerTipY;
          }else if (isEraserMode) {
            const indexFingerTipX = canvasRef.current.width - (landmarks[8].x * canvasRef.current.width);
            const indexFingerTipY = landmarks[8].y * canvasRef.current.height;
            showEraserIndicator(landmarks, canvasRef, thickness);
            console.log("hello")
            // 이전 위치가 있을 경우에만 선을 그림
            if (xp !== 0 && yp !== 0) {
                canvasCtx.globalCompositeOperation = 'destination-out'; // 지우개 모드 설정
                earseLine(xp, yp, indexFingerTipX, indexFingerTipY);
            }
    
            xp = indexFingerTipX;
            yp = indexFingerTipY;
    
        }else {
              xp = 0;
              yp = 0;
          }
          
          // 주먹쥐면 캔버스 초기화
          const isClearMode = fingersUp.every(finger => finger === 0);
          if (isClearMode) {
              // 캔버스 초기화
              canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
      }
       else {
          xp = 0;
          yp = 0;
          setFingerLineStlye({display:'none'})
      }
  })
  hands.onResults(onResults);
  
  function drawLine(x1, y1, x2, y2) {
    // setFingerLineStlye({display:'none'})
    
      canvasCtx.beginPath();
      canvasCtx.moveTo(x1, y1);
      canvasCtx.lineTo(x2, y2);
      canvasCtx.strokeStyle = drawColor;
      canvasCtx.lineWidth = thickness;
      canvasCtx.lineCap = 'round';
      canvasCtx.globalCompositeOperation = 'source-over';
      canvasCtx.stroke();
  }
  // 선 지우기
  function earseLine(x1, y1, x2, y2) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(x1, y1);
      canvasCtx.lineTo(x2, y2);
      canvasCtx.lineWidth = thickness * 2;
      // 지우개 모드 설정
      canvasCtx.globalCompositeOperation = 'destination-out';
      canvasCtx.lineCap = 'round';
      canvasCtx.stroke();

  }
  // 지우개 모드시 검지에 지우개 크기 표시
  function showEraserIndicator(landmarks, canvasRef, thickness) {
    // const eraserIndicator = document.getElementById('eraserIndicator');
    if (!eraserIndicator) return; // eraserIndicator가 없으면 함수 종료
    // setFingerLineStlye({display:'none'})
    const indexFingerTip = landmarks[8]; // 검지손가락 끝 landmark
    const indexFingerTipX = canvasRef.current.width - (indexFingerTip.x * canvasRef.current.width);
    const indexFingerTipY = indexFingerTip.y * canvasRef.current.height;
    const radius = thickness;
    const diameter = radius * 2;

    eraserIndicator.current.width = diameter;
    eraserIndicator.current.height = diameter;
    eraserIndicator.current.left = indexFingerTipX - radius;
    eraserIndicator.current.top = indexFingerTipY - radius;
    eraserIndicator.current.display = 'block';
  }

  // 손가락 사이 선 긋기
  function updateFingerLine(indexFingerTip, pinkyFingerTip, canvasElement) {
      // const fingerLine = document.getElementById('fingerLine');
      console.log(canvasRef.current.width);
      // 좌우 반전된 좌표를 화면에 맞게 조정
      const indexFingerTipX = canvasRef.current.width - (indexFingerTip.x * canvasRef.current.width);
      const indexFingerTipY = indexFingerTip.y * canvasRef.current.height;
      const pinkyFingerTipX = canvasRef.current.width - (pinkyFingerTip.x * canvasRef.current.width);
      const pinkyFingerTipY = pinkyFingerTip.y * canvasRef.current.height;
  
      // 선의 시작점과 끝점 계산
      const startX = Math.min(indexFingerTipX, pinkyFingerTipX);
      const startY = Math.min(indexFingerTipY, pinkyFingerTipY);
      const endX = Math.max(indexFingerTipX, pinkyFingerTipX);
      const endY = Math.max(indexFingerTipY, pinkyFingerTipY);
  
      // 선의 길이와 각도 계산
      const length = Math.hypot(endX - startX, endY - startY);
      const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  
      // 선의 위치 조정
      
      fingerLine.current.left = startX;
      fingerLine.current.top = startY - fingerLine.current.offsetHeight / 2; // 높이의 절반만큼 올리기
      console.log(fingerLine.current.offsetHeight);
      // 선의 스타일 설정
      fingerLine.current.width = length;
      // console.log(length)
      fingerLine.current.transform = `rotate(${angle}deg)`;
      fingerLine.current.transformOrigin = '0 0'; // 회전의 기준점을 선의 시작점으로 설정
      setFingerLineStlye({
        left:`${startX}px`,
        top:`${startY - fingerLine.current.offsetHeight / 2}px`,
        width:`${length}px`,
        transform:`rotate(${angle}deg)`,
        transformOrigin:'0 0',
        display:'block'
        
      })
      // 선을 보이게 함
      // fingerLine.current.display = 'block';
      setDisplay(true);
      console.log(fingerLine.current)  
  }
  
  return (
    <div className='paint-with-ai-page-container'>
      <div id="container" >
          <video ref={videoRef} id="video" ></video>
          <canvas ref={canvasRef} id="canvas"></canvas>
          <div id="fingerLine" ref={fingerLine} style={fingerLineStlye}></div>
          <div id="eraserIndicator" ref={eraserIndicator} 
          //  style={"position: absolute; display: none; border-radius: 50%; background: rgba(0,0,0,0.2);"}
           ></div>
      </div>
      <div id="toolPanel">
          <label htmlFor="colorPicker">색상 선택:</label>
          <input type="color" id="colorPicker" name="colorPicker"/>
          
          <label htmlFor="lineWidth">선 두께:</label>
          <input type="range" id="lineWidth" name="lineWidth" min="1" max="10" value={"1"}/>
      </div>   
    
    </div>
  );
}
  
export default PaintWithAi;