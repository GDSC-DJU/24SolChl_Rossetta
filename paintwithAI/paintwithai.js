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
        await hands.send({image: videoElement});
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
