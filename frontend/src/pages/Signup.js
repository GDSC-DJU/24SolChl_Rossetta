import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import styled from 'styled-components';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

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
  const [wchslerData1, setWechslerData1] = useState();
  const [wchslerData2, setWechslerData2] = useState();
  const [wchslerData3, setWechslerData3] = useState();
  const [wchslerData4, setWechslerData4] = useState();
  const [wchslerData5, setWechslerData5] = useState();

  const navigate = useNavigate();


  useEffect(() => {
    setFormValid(
      usernameValid && pwValid && pwConfirmValid && emailValid && mobileValid && birthdateValid && name !== '' && gender !== ''
    );
  }, [usernameValid, pw, pwConfirm, pwValid, pwConfirmValid, emailValid, mobileValid, birthdateValid, name, gender]);

  useEffect(() => {
    console.log(formValid)
  }, [formValid]);

  useEffect(() => {
    // 비밀번호 확인 유효성 검사 추가
    setPwConfirmValid(pw === pwConfirm);
    // 핸드폰 번호 유효성 검사 추가
    setMobileValid(/^\d{11}$/.test(mobile));
    // 생년월일 유효성 검사 추가
    setBirthdateValid(/^\d{8}$/.test(birthdate));
  }, [pw, birthdate, pwConfirm])

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

  const onClickRegisterButton = async() => {
    await axios.post('http://localhost:8000/member/sign-up/parents',{
        id:username,
        pw:pw,
        phoneNum:mobile,
        gender: gender,
        name: name,
        email: email,
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    if(wchslerData1 && wchslerData2 && wchslerData3 && wchslerData4 && wchslerData5){
      await axios.post('http://localhost:8000/wechsler/sign-up/wechsler',{
        id:username,
        lang:wchslerData1,
        pr:wchslerData2,
        wm:wchslerData3,
        ps:wchslerData4,
        iq:wchslerData5
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
    navigate('/login');
  };

  // 간단한 모달 컴포넌트 스타일
  const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
    border-radius: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    `;

  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    `;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="page" style={{ top: "10px" }}>
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
        <div className="inputTitle" style={{ marginTop: "8px" }}>이메일</div>
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
        <div className="inputTitle" style={{ marginTop: "8px" }}>성별</div>
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
        <div className="inputTitle" style={{ marginTop: "8px" }}>생년월일</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="생년월일 (YYYYMMDD)"
            value={birthdate}
            onChange={handleBirthdate}
          />
        </div>
        <div className='wecsler'>
          <button className="btn-hover gallery" onClick={openModalHandler}> 웩슬러 지능 검사 점수 입력 </button>
          <div style={{marginTop: "14px", fontSize: "13px", fontWeight: "bold", color: "red"  }}>웩슬러 점수는 필수 입력이 아닙니다.</div>
        </div>
        {isModalOpen && (
          <>
            <Overlay onClick={closeModalHandler} />
            <Modal>
              <div className="inputTitle" style={{ marginTop: "8px" }}>언어 이해</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="언어 이해 점수"
                  value={wchslerData1}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>지각 추론</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="지각 추론 점수"
                  value={wchslerData2}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>작업 기억</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="작업 기억 점수"
                  value={wchslerData3}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>처리 속도</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="처리 속도 점수"
                  value={wchslerData4}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>IQ</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="IQ 점수"
                  value={wchslerData5}
                />
              </div>
              <div className='wecsler'>
                <button className="btn-hover gallery" onClick={closeModalHandler}>닫기</button>
              </div>
            </Modal>
          </>
        )}
      </div>
      <button onClick={onClickRegisterButton} disabled={!formValid} className="signupButton">
        가입하기
      </button>
    </div>
  );
};

export default Signup;
