import { useEffect, useRef, useState } from "react";

import axios from 'axios';
const ChangePassword = (props) => {
  const [newPsw,setNewPsw] = useState('');
  const [confirmPsw,setConfirmPsw] = useState('');
  const [pwValid,setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [comparePsw,setComparePsw] = useState(false);
  const [psw,setPsw] = useState(props.data.pw)
  const buttonRef = useRef();
  const [btnDisabled,setBtnDisabled] = useState(true);
  // 새 비밀번호 유효성 검사

  const saveButtonClick = () =>{
    axios.put('http://localhost:8000/member/parents/update',{
      pw:newPsw,
      phoneNum:props.data.phoneNum,
      adress:props.data.address
    },{
      headers: {
        "Content-Type":'application/json',
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJtaW5zZW9rMDMzOEBuYXZlci5jb20iLCJwdyI6InRqcmRsMTY1MSEiLCJpYXQiOjE3MDc1ODc1NDAsImV4cCI6MTcwODE4NzU0MCwiaXNzIjoic2VydmVyIn0.EfCvTA2T6rxHW-2CSGfN3l7NNWiIZofuPgZ_fnWtkDs"
      }
    })
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    setBtnDisabled(!(pwValid && pwConfirmValid && !comparePsw))
  },[pwValid,pwConfirmValid,comparePsw])
  useEffect(()=>{
    setComparePsw(newPsw === psw)
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(newPsw));
  },[newPsw])

  //비밀번호 확인
  useEffect(()=>{
    console.log(newPsw)
    console.log(confirmPsw)
    setPwConfirmValid(newPsw === confirmPsw);
  },[confirmPsw])
  console.log(props.display)
  return (
    <div className="item-container" style={{display:`${props.display ? '':'none'}`}}>
      <div className="item" >
        <label htmlFor="new-psw">새로운 비밀번호</label>
        <div className="confirm-container">
          <input type="password" id="new-psw" onChange={(e)=>setNewPsw(e.target.value)} placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)" value={newPsw}/>
          {!pwValid && newPsw.length > 0 ? <div className="confirm">비밀번호 조건을 만족해주세요.</div> : comparePsw ? <div className="confirm">이전 비밀번호와 같습니다.</div> : null}
        </div>
      </div>
      <div className="item">
        <label htmlFor="confirm-psw" >비밀번호 확인</label>
        <div className="confirm-container">
          <input type="password" id="confirm-psw" onChange={(e)=>{setConfirmPsw(e.target.value);}} value={confirmPsw}/>
          {!pwConfirmValid && confirmPsw.length > 0 && <div className="confirm">비밀번호가 일치하지 않습니다.</div>} 
        </div>
      </div>
      <button ref={buttonRef}  disabled={btnDisabled} onClick={saveButtonClick}  className="save-button">저장</button> 
    </div>
  )
}

export default ChangePassword;
