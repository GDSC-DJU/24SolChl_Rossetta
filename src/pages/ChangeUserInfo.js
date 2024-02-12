import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import '../styles/ChangeUserInfo.css'
import ChangePassword from '../components/ChangePassword'
import ChangeAdrPN from "../components/ChangeAdrPN";


const ChangeUserInfo = () =>{
  const [phoneCpt,setPhoneCpt] = useState(false);
  const [addressCpt,setAddressCpt] = useState(false);
  const [info,setInfo] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8000/member/parents/info',{
      headers: {
        "Content-Type":'application/json',
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJtaW5zZW9rMDMzOEBuYXZlci5jb20iLCJwdyI6InRqcmRsMTY1MSEiLCJpYXQiOjE3MDc1ODc1NDAsImV4cCI6MTcwODE4NzU0MCwiaXNzIjoic2VydmVyIn0.EfCvTA2T6rxHW-2CSGfN3l7NNWiIZofuPgZ_fnWtkDs"
      }
    })
    .then((res)=>{
      console.log(res);
      setInfo(res.data.response);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  
  
  return (
    <div className='user-info-page-container'>
      <div className="user-info-container">
        <div className="user-info-title">회원 정보 수정</div>
        <div className="user-info">
          <button className="change-button" onClick={()=>{setPhoneCpt(true); setAddressCpt(false)}}>비밀번호 변경</button>
          <button className="change-button" onClick={()=>{setPhoneCpt(false); setAddressCpt(true)}}>전화번호 주소 변경</button>
          <ChangePassword display={phoneCpt} data={info}/>
          <ChangeAdrPN display={addressCpt} data={info}/>
 
        </div>
        {/* */}
      </div>
    </div>
  );
}
  
export default ChangeUserInfo;