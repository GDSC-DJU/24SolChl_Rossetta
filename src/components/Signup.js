import React, { useState, useEffect } from 'react';
import './styles/Signup.css';

const Signup = () => {
    // input tage values
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');

  // 버튼 활성화를 위한 버튼 입력값 판단
  const [usernameValid, setUsernameValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [mobileValid, setMobileValid] = useState(false);
  const [birthdateValid, setBirthdateValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {


    setFormValid(
      usernameValid && pwValid && pwConfirmValid && emailValid && mobileValid && birthdateValid && name !== '' && gender !== ''
    );
  }, [usernameValid, pw, pwConfirm, pwValid, pwConfirmValid, emailValid, mobileValid, birthdateValid, name, gender]);
  useEffect(()=>{
    console.log(formValid)
  },[formValid]);

  useEffect(()=>{
    // 비밀번호 확인 유효성 검사 추가
    setPwConfirmValid(pw === pwConfirm);
    // 핸드폰 번호 유효성 검사 추가
    setMobileValid(/^\d{11}$/.test(mobile));
    // 생년월일 유효성 검사 추가
    setBirthdateValid(/^\d{8}$/.test(birthdate));
  },[pw,birthdate,pwConfirm])
  
  const handleUsername = (e) => {
    
    const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
    setUsername(value);
    const regex = /^[a-z0-9]+$/; // 영어 소문자와 숫자만
    setUsernameValid(regex.test(value));
  };
  

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

  const onClickRegisterButton = () => {
    // 여기에 회원가입 로직을 추가합니다.
  };

  return (
    <div className="page">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        {/* 아이디 입력 필드 */}
        <div className="inputTitle">아이디</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="아이디 (영문과 숫자만)"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="errorMessageWrap">
          {!usernameValid && username.length > 0 && <div>아이디는 영문 소문자와 숫자만 사용할 수 있습니다.</div>}
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
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* 이메일 입력 필드 */}
        <div className="inputTitle">이메일</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}
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
        <div className="inputTitle">성별</div>
        <div className="inputWrap" style={{ flexDirection: 'row' }}>
          <label>
            <input
              type="radio"
              value="남성"
              checked={gender === '남성'}
              onChange={(e) => setGender(e.target.value)}
            /> 남성
          </label>
          <label>
            <input
              type="radio"
              value="여성"
              checked={gender === '여성'}
              onChange={(e) => setGender(e.target.value)}
            /> 여성
          </label>
        </div>

        {/* 생년월일 입력 필드 */}
        <div className="inputTitle">생년월일</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="생년월일 (YYYYMMDD)"
            value={birthdate}
            onChange={handleBirthdate}
          />
        </div>

      </div>
      <button onClick={onClickRegisterButton} disabled={!formValid} className="bottomButton">
        가입하기
      </button>
    </div>
  );
};

export default Signup;
