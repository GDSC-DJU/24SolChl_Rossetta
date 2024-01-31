import React,{ useState, useRef, useEffect,useCallback} from 'react';
// import './styles/pronunciation.css';
import { useReactMediaRecorder } from "react-media-recorder";
import axios from 'axios';
// import webmToMp4 from 'webm-to-mp4';

const Pronunciation = () =>{
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [recordedData,setRecordedData] = useState('');
  const [score, setScore] = useState(0.0);

  const onRecAudio = async() => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      
      setSource(source);

      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    
    // 마이크 사용 권한 획득 후 녹음 시작
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.start();
    setStream(mediaStream);
    setMedia(mediaRecorder);
    makeSound(mediaStream);
	// 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
    analyser.onaudioprocess = function (e) {
        setOnRec(false);
    };
    
  };




  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      // audioArray.push(e.data);
      setAudioUrl(e.data);
      setOnRec(true);
    };
    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    
    analyser.disconnect();
    source.disconnect();
  };
  const [url,setUrl] = useState('');
  
const bufferToBase64 = (buffer)=> {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

 const downsampleAudioBuffer = async(audioBuffer, targetSampleRate) =>{
  const numberOfChannels = audioBuffer.numberOfChannels;
  const offlineAudioContext = new OfflineAudioContext(numberOfChannels, audioBuffer.duration * targetSampleRate, targetSampleRate);
  
  // Create buffer and copy data.
  const bufferSource = offlineAudioContext.createBufferSource();
  bufferSource.buffer = audioBuffer;

  // Connect the source to the offline context
  bufferSource.connect(offlineAudioContext.destination);
  bufferSource.start(0);
  
  // Render the audio at the new sample rate.
  const resampledAudioBuffer = await offlineAudioContext.startRendering();

  return resampledAudioBuffer;
}

const onSubmitAudioFile = useCallback(async () => {
  let base64;
    if (audioUrl) {
      const arrayBuffer = await audioUrl.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const resampledAudioBuffer = await downsampleAudioBuffer(audioBuffer, 16000);
    const pcmData = resampledAudioBuffer.getChannelData(0);

    const pcmArrayBuffer = pcmData.buffer;
    
    const base64 = bufferToBase64(pcmArrayBuffer);

    setRecordedData(base64);

    setUrl(URL.createObjectURL(audioUrl));
      
      
    } else {
      console.log('no audio');
    }
  }, [audioUrl]);

  useEffect(()=>{
    if(recordedData){
      axios.post('http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor', 
      {
        argument: {
          language_code: 'korean',
          script: '안녕하세요',
          audio: recordedData
      }
      },{
        headers: {
          // "Content-Type":'application/json',
          Authorization:'5929a343-7541-4e6d-8d50-dd3c89f2bf09'
      }},)
      .then((res)=>{
        console.log(res);
        setScore(res.data.return_object.score);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },[recordedData])

  return (
    <div className='pronunciation-page-container'>
      <div className='level-container'>
        <div className='level-itme'>
          1
        </div>
        <div className='level-itme'>
          2
        </div>
        <div className='level-itme'>
          3
        </div>
      </div>
      <div className='pronunciation-container'>
        <div className='audio-container'>
          <audio src={url} controls/>
        </div>
        <div className='example-text'>
          안녕하세요
        </div>
        <div className='score'>
          점수 : {score}
        </div>
        <button onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? '녹음' : '중지'}</button>
        <button onClick={onSubmitAudioFile}>결과 확인</button>
      </div>
      
      
      <div>
      </div>
    </div>
  );
}

export default Pronunciation;