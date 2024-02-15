import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import '../styles/Login.css'


const ChangeUserInfo = () =>{
    // input tage values
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [name, setName] = useState('');
    const [pwCompare,setPwCompare] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
  
    // 버튼 활성화를 위한 버튼 입력값 판단
    const [pwValid, setPwValid] = useState(false);
    const [pwConfirmValid, setPwConfirmValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [mobileValid, setMobileValid] = useState(false);
    const [birthdateValid, setBirthdateValid] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [pwCompareValid,setPwCompareValid] = useState(true);

    useEffect(()=>{
      axios.get('http://localhost:8000/member/parents/info',{
        headers: {
          "Content-Type":'application/json',
          Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJtaW5zZW9rMDMzOCIsInB3IjoidGpyZGwxNjUxISIsImlhdCI6MTcwNzk2ODgzMCwiZXhwIjoxNzA4NTY4ODMwLCJpc3MiOiJzZXJ2ZXIifQ.3xD5lLzuT4lMsWMwixf6QMqrKm7_sUEbrIRKSacQYiE"
        }
      })
      .then((res)=>{
        console.log(res);
        const data = res.data.response;
        setPwCompare(data.pw);
        setUsername(data.id);
        setName(data.name);
        setEmail(data.email);
        setMobile("0"+data.phoneNum);
        setGender(data.gender);
        setBirthdate(data.birth);
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])
  
    useEffect(() => {
      setFormValid(
        !pwCompareValid && pwValid && pwConfirmValid && mobileValid
      );
      console.log(pwCompare)
    }, [ pw, pwConfirm, pwValid, pwConfirmValid, mobileValid,pwCompareValid]);
    
    useEffect(()=>{
      console.log(formValid)
    },[formValid]);
  
    useEffect(()=>{
      // 비밀번호 확인 유효성 검사 추가
      setPwConfirmValid(pw === pwConfirm);
      setPwCompareValid(pwCompare === pw);
      // 핸드폰 번호 유효성 검사 추가
      setMobileValid(/^\d{11}$/.test(mobile));
      // 생년월일 유효성 검사 추가
      setBirthdateValid(/^\d{8}$/.test(birthdate));
    },[pw,birthdate,pwConfirm])
    
    
    const handlePw = (e) => {
      const value = e.target.value;
      setPw(value);
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      setPwValid(regex.test(value));
    };
  
    const handleEmail = (e) => {
      const value = e.target.value;
      setEmail(value);
      const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      setEmailValid(regex.test(value));
    };
  
    const handleMobile = (e) => {
      const value = e.target.value;
      // 숫자만 입력 허용하고 최대 11자리까지만 허용
      if (/^\d*$/.test(value) && value.length <= 11) {
        setMobile(value);
      }
    };
  
    const handleBirthdate = (e) => {
      const value = e.target.value;
      // 숫자만 입력 허용하고 최대 8자리까지만 허용
      if (/^\d*$/.test(value) && value.length <= 8) {
        setBirthdate(value);
      }
    };
  
    const onClickUpdateButton = () => {
      axios.put('http://localhost:8000/member/parents/update',{
        pw:pw,
        phoneNum:mobile,
      },{
        headers: {
          "Content-Type":'application/json',
          Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOiJtaW5zZW9rMDMzOCIsInB3IjoidGpyZGwxNjUxISIsImlhdCI6MTcwNzk2ODgzMCwiZXhwIjoxNzA4NTY4ODMwLCJpc3MiOiJzZXJ2ZXIifQ.3xD5lLzuT4lMsWMwixf6QMqrKm7_sUEbrIRKSacQYiE"
        }
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    };
  
    return (
      <div className="page" style={{top: "10px"}}>
        <div className="titleWrap">회원 정보 변경</div>
        <div className="contentWrap">
          {/* 아이디 입력 필드 */}
          <div className="inputTitle">아이디</div>
          <div className="inputWrap" style={{backgroundColor:'rgb(250,250,250)'}}>
            <input
              className="input"
              disabled
              style={{backgroundColor:'rgb(250,250,250)'}}
              type="text"
              placeholder="아이디 (영문과 숫자만)"
              value={username}
            />
          </div>
          <div className="errorMessageWrap">
          </div>
  
          {/* 비밀번호 입력 필드 */}
          <div className="inputTitle">비밀번호</div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && <div>비밀번호 조건을 만족해주세요.</div>}
            {!pwCompareValid ? '':<div>이전 비밀번호와 같습니다.</div>}
          </div>
  
          {/* 비밀번호 확인 입력 필드 */}
          <div className="inputTitle">비밀번호 확인</div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="비밀번호 확인"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwConfirmValid && pwConfirm.length > 0 && <div>비밀번호가 일치하지 않습니다.</div>}
          </div>
  
          {/* 이름 입력 필드 */}
          <div className="inputTitle">이름</div>
          <div className="inputWrap" style={{backgroundColor:'rgb(250,250,250)'}}>
            <input
              className="input"
              type="text"
              placeholder="이름"
              disabled
              style={{backgroundColor:'rgb(250,250,250)'}}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          {/* 이메일 입력 필드 */}
          <div className="inputTitle" style={{marginTop: "8px"}}>이메일</div>
          <div className="inputWrap" style={{backgroundColor:'rgb(250,250,250)'}}>
            <input
              className="input"
              type="text"
              placeholder="이메일"
              disabled
              style={{backgroundColor:'rgb(250,250,250)'}}
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            
          </div>
  
          {/* 휴대폰 번호 입력 필드 */}
          <div className="inputTitle">휴대폰 번호</div>
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="숫자만 입력해 주세요"
              value={mobile}
              onChange={handleMobile}
            />
          </div>
  
          {/* 성별 입력 필드 */}
          <div className="inputTitle" style={{marginTop: "8px"}}>성별</div>
          <div className="inputWrap" style={{ flexDirection: 'row', backgroundColor:'rgb(250,250,250)'}}>
            <label>
              <input
                type="radio"
                value="남성"
                checked={gender === '남성'}
                onChange={(e) => setGender(e.target.value)}
                disabled
                style={{backgroundColor:'rgb(250,250,250)'}}
              /> 남성
            </label>
            <label>
              <input
                type="radio"
                value="여성"
                checked={gender === '여성'}
                onChange={(e) => setGender(e.target.value)}
                disabled
                style={{backgroundColor:'rgb(250,250,250)'}}
              /> 여성
            </label>
          </div>
  
          {/* 생년월일 입력 필드 */}
          <div className="inputTitle" style={{marginTop: "8px"}}>생년월일</div>
          <div className="inputWrap" style={{backgroundColor:'rgb(250,250,250)'}}>
            <input
              className="input"
              type="text"
              placeholder="생년월일 (YYYYMMDD)"
              value={birthdate}
              onChange={handleBirthdate}
              disabled
              style={{backgroundColor:'rgb(250,250,250)'}}
            />
          </div>
  
        </div>
        <button onClick={onClickUpdateButton} disabled={!formValid} className="signupButton">
          가입하기
        </button>
      </div>
    );
}
  
export default ChangeUserInfo;