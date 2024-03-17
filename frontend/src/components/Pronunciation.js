import React,{ useState, useRef, useEffect,useCallback} from 'react';
import '../styles/Pronunciation.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Pronunciation = () =>{
  const cookies = new Cookies();
  const navigate = useNavigate();
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

  const getSpeech = () => {
    let voices = [];
  
    //디바이스에 내장된 voice를 가져온다.
    const setVoiceList = () => {
      voices = window.speechSynthesis.getVoices();
    };
  
    setVoiceList();
  
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      //voice list에 변경됐을때, voice를 다시 가져온다.
      window.speechSynthesis.onvoiceschanged = setVoiceList;
    }
  
    const speech = (txt) => {
      const lang = "ko-KR";
      const utterThis = new SpeechSynthesisUtterance(txt);
  
      utterThis.lang = lang;
  
      /* 한국어 vocie 찾기
         디바이스 별로 한국어는 ko-KR 또는 ko_KR로 voice가 정의되어 있다.
      */
      const kor_voice = voices.find(
        (elem) => elem.lang === lang || elem.lang === lang.replace("-", "_")
      );
  
      //힌국어 voice가 있다면 ? utterance에 목소리를 설정한다 : 리턴하여 목소리가 나오지 않도록 한다.
      if (kor_voice) {
        utterThis.voice = kor_voice;
      } else {
        return;
      }
  
      //utterance를 재생(speak)한다.
      window.speechSynthesis.speak(utterThis);
    };
  
    speech(text);
  };

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



  const onSubmitAudioFile = useCallback(async () => {

  let base64;
    if (audioUrl) {

      const arrayBuffer = await audioUrl.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
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
    if(cookies.get('token') === undefined){
      navigate('/login');
    }
    axios.get(`http://35.216.81.26:8000/pronunciation/info/${level}`,{
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
          Authorization:'3e97461b-2a86-4b24-ab12-982318d1eced'
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
    let num = Math.floor(Math.random() * sentence.length);
    console.log(num)
    setText(sentence[num].sentence);
  }
  useEffect(()=>{
    if(score !== 0.0){
      axios.post('http://35.216.81.26:8000/pronunciation/insert/score', 
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
            <div> {wait ? Math.ceil(score*20)+'점' : '잠시만 기다려 주세요!'}</div>
          </div>
          <div className='pronunciation-button-container'>
            <button onClick={levelClick}> 랜덤 문장</button>
            <button onClick={getSpeech}>발음 듣기</button>
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