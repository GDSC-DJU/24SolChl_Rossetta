const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

let xp = 0, yp = 0;
let drawColor = 'rgb(255, 0, 0)'; // 빨간색
let thickness = 20;

videoElement.width = 1280;
videoElement.height = 720;
canvasElement.width = 1280;
canvasElement.height = 720;

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});

camera.start();

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


function onResults(results) {
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
            updateFingerLine(indexFingerTip, pinkyFingerTip, canvasElement);
        } else {
            document.getElementById('fingerLine').style.display = 'none';
        }

        // 선택 모드 판단 (검지와 중지만 올라가 있어야 함)
        const nonSel = [0, 3, 4]; // 엄지, 약지, 새끼손가락
        const isSelectionMode = fingersUp[1] === 1 && fingersUp[2] === 1 && nonSel.every(index => fingersUp[index] === 0);

        if (isSelectionMode) {
            // 선택 모드 시각화: 검지와 중지 손가락 사이에 선을 그림

        }

        const nonDraw = [0, 2, 3, 4];
        const isDrawMode = fingersUp[1] === 1 && fingersUp.every((val, i) => i === 1 || val === 0);
        // 검지손가락만 올라가 있고, 나머지 손가락들은 접혀있는지 확인
        if (fingersUp[1] === 1 && fingersUp.every((val, i) => i === 1 || val === 0)) {
            const indexFingerTipX = canvasElement.width - (landmarks[8].x * canvasElement.width);
            const indexFingerTipY = landmarks[8].y * canvasElement.height;

            if (xp !== 0 && yp !== 0) {
                drawLine(xp, yp, indexFingerTipX, indexFingerTipY);
            }

            xp = indexFingerTipX;
            yp = indexFingerTipY;
        } else {
            xp = 0;
            yp = 0;
        }
        
        // 주먹쥐면 캔버스 초기화
        const isClearMode = fingersUp.every(finger => finger === 0);
        if (isClearMode) {
            // 캔버스 초기화
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
    } else {
        xp = 0;
        yp = 0;
    }
}

function drawLine(x1, y1, x2, y2) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(x1, y1);
    canvasCtx.lineTo(x2, y2);
    canvasCtx.strokeStyle = drawColor;
    canvasCtx.lineWidth = thickness;
    canvasCtx.lineCap = 'round';
    canvasCtx.stroke();
}

// 손가락 사이 선 긋기
function updateFingerLine(indexFingerTip, pinkyFingerTip, canvasElement) {
    const fingerLine = document.getElementById('fingerLine');

    // 좌우 반전된 좌표를 화면에 맞게 조정
    const indexFingerTipX = canvasElement.width - (indexFingerTip.x * canvasElement.width);
    const indexFingerTipY = indexFingerTip.y * canvasElement.height;
    const pinkyFingerTipX = canvasElement.width - (pinkyFingerTip.x * canvasElement.width);
    const pinkyFingerTipY = pinkyFingerTip.y * canvasElement.height;

    // 선의 시작점과 끝점 계산
    const startX = Math.min(indexFingerTipX, pinkyFingerTipX);
    const startY = Math.min(indexFingerTipY, pinkyFingerTipY);
    const endX = Math.max(indexFingerTipX, pinkyFingerTipX);
    const endY = Math.max(indexFingerTipY, pinkyFingerTipY);

    // 선의 길이와 각도 계산
    const length = Math.hypot(endX - startX, endY - startY);
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    // 선의 위치 조정
    fingerLine.style.left = `${startX}px`;
    fingerLine.style.top = `${startY - fingerLine.offsetHeight / 2}px`; // 높이의 절반만큼 올리기

    // 선의 스타일 설정
    fingerLine.style.width = `${length}px`;
    fingerLine.style.transform = `rotate(${angle}deg)`;
    fingerLine.style.transformOrigin = '0 0'; // 회전의 기준점을 선의 시작점으로 설정

    // 선을 보이게 함
    fingerLine.style.display = 'block';
}

