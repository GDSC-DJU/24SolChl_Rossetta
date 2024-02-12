import { useEffect, useRef, useState } from "react";
import axios from 'axios';

const ChangeAdrPN = (props) => {
  const [phoneNum,setPhoneNum] = useState('');
  const [address,setAddress] = useState('');
  const [btnDisabled,setBtnDisabled] = useState(true);
  const buttonRef = useRef();
  useEffect(()=>{
    setPhoneNum('0'+props.data.phoneNum);
    setAddress(props.data.address);
  },[props])
  const saveButtonClick = () =>{
    axios.put('http://localhost:8000/member/parents/update',{
      pw:props.data.pw,
      phoneNum:phoneNum.replaceAll('-',''),
      adress:address
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
    if(phoneNum !== '' && address !== ''){
      setBtnDisabled(false)
    }
    console.log(phoneNum)
  },[phoneNum,address])
  //전화번호 하이픈
  const phone = (value) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(value)) {
      setPhoneNum(value);
    }
  }
  useEffect(()=>{
    console.log(phoneNum.length)
    if (phoneNum.length >= 10 && phoneNum.length < 13) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  },[phoneNum])
  return (
    <div className="item-container" style={{display:`${props.display ? '':'none'}`}}>
      <div className="item">
        <label htmlFor="phone-num">전화번호</label>
        <input type="text" id="phone-num" maxlength="13" onChange={(e)=>{phone(e.target.value)}} value={phoneNum}/>
      </div>

      <div className="item">
        <label htmlFor="address">주소</label>
        <input type="text" id="address" onChange={(e)=>{setAddress(e.target.value)}} value={address}/>
      </div>
      <button ref={buttonRef} disabled={btnDisabled} onClick={saveButtonClick} className="save-button">저장</button> 
    </div>
  )
}

export default ChangeAdrPN;