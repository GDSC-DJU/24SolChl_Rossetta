import React,{ useState, useRef, useEffect,useCallback} from 'react';
import '../styles/Pronunciation.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';

const Pronunciation = () =>{
  const cookies = new Cookies();

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [recordedData,setRecordedData] = useState('');
  const [score, setScore] = useState(0.0);
  const [result,setResult] = useState(true);
  const [text, setText] = useState('');
  const [sentence,setSentence] = useState([]);
  let { level } = useParams();



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
    const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: {sampleRate : 16000} });
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
    setResult(false);

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
    // const resampledAudioBuffer = await downsampleAudioBuffer(audioBuffer, 16000);
    const pcmData = audioBuffer.getChannelData(0);
    const pcmArrayBuffer = pcmData.buffer;
    
    const base64 = bufferToBase64(pcmArrayBuffer);
    setWait(false);

    setRecordedData(base64);
    } else {
      console.log('no audio');
    }
    setResult(true)
  }, [audioUrl]);

  
  useEffect(()=>{
    if(audioUrl){
      setUrl(URL.createObjectURL(audioUrl));
    }
  },[audioUrl])

  const [wait,setWait] = useState(true);

  // 문장 api

  useEffect(()=>{
    axios.get('http://localhost:8000/pronunciation/info/1',{
      headers: {
        "Content-Type":'application/json',
        Authorization: cookies.get('token')
      }
  })
  .then((res)=>{
    console.log(res);
    setSentence(res.data.response);
  })
  .catch((err)=>{
    console.log(err);
  })
  },[])


  useEffect(()=>{
    if(recordedData){
      console.log(text);
      axios.post('http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor', 
      {
        argument: {
          language_code: 'korean',
          script: text,
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
        setTimeout(()=>{
          setWait(true);

        },1000)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },[recordedData])

  const levelClick = () =>{
    let num = Math.floor(Math.random() * 5);
    console.log(num)
    setText(sentence[num].sentence);
  }
  useEffect(()=>{
    if(score !== 0.0){
      axios.post('http://localhost:8000/pronunciation/insert/score', 
      {
        sentence:text,
        level:level,
        score:score
      },{
        headers: {
          // "Content-Type":'application/json',
          Authorization: cookies.get('token')
      }},)
      .then((res)=>{
        console.log(res);
        setScore(res.data.return_object.score);
        setTimeout(()=>{
          setWait(true);

        },1000)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  },[score])

  return (
    <PageLayout name="발음교정훈련">
    <div className='pronunciation-page-container'>
      <div className='pronunciation-container'>
        {/* <div className='level-container'>
          <button onClick={()=>{setLevel(1); setText('')}} className='level-button'>
            1
          </button>
          <button onClick={()=>{setLevel(2); setText('')}} className='level-button'>
            2
          </button>
          <button onClick={()=>{setLevel(3); setText('')}} className='level-button'>
            3
          </button>
        </div> */}
        <div className='level-container'>
            LEVEL {level}
        </div>
        <div className='pronunciation-funtion-container'>

      
          <div className='audio-container'>
            <audio src={url} controls/>
          </div>
          <div className='example-text'>
            <div>
              {text !== '' ? text : '따라 말해보세요!'}
            </div>
          </div>
          <div className='score'>
            <div>
              점수 : 
            </div>
            <div> {wait ? score*20+'점' : '잠시만 기다려 주세요!'}</div>
          </div>
          <div className='pronunciation-button-container'>
            <button onClick={levelClick}> 랜덤 문장</button>
            <button className='pronunciation-record-button' onClick={onRec ? onRecAudio : offRecAudio} >{onRec ? '녹음' : '중지'}</button>
            <button className='pronunciation-evaluation-button' onClick={onSubmitAudioFile} disabled={result}>결과 확인</button>
          </div>

        </div>
      </div>
      
    </div>
    </PageLayout>
  );
}

export default Pronunciation;