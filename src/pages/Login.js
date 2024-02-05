import React, { useEffect, useState } from 'react'
import '../styles/Login.css';

const User = {
  email: 'test@example.com',
  pw: 'test2323@@@'
}


const Login = () => {
    const [email, setEmail] = useState(''); //input tag email value
    const [pw, setPw] = useState(''); //input tag pw value

    const [emailValid, setEmailValid] = useState(false); //입력값과 정규표현식 비교 판단 state
    const [pwValid, setPwValid] = useState(false); //입력값과 정규표현식 비교 판단 state
    const [notAllow, setNotAllow] = useState(true); //로그인 버튼 활성화 판단 state


    // Email, Pw 정규표현식 검사 통과 -> 로그인 버튼 활성화
    useEffect(() => {
      if(emailValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
      setEmail(e.target.value);
      const regex = //이메일 정규표현식( {...}@{...}.{...} 형식)
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (regex.test(e.target.value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    };
    const handlePw = (e) => {
      setPw(e.target.value);
      const regex = //패스워드 정규표현식(영문, 숫자, 특수문자 포함 8자 이상으로 설정)
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };
    const onClickConfirmButton = () => {
	//DB 회원정보랑 비교 
    }

    return (
      <div className="page">
        <div className="titleWrap">
          로그인
        </div>
        <div className="contentWrap">
          <div className="inputTitle">이메일 주소</div>
          <div className="inputWrap">
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="(논의)영문, 숫자, 특수문자 포함 8자 이상"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>

        <div className='findWrap'>
          <span>아이디찾기</span>
          <span> | </span>
          <span>비밀번호찾기</span>
        </div>

        <div>
          <button onClick={onClickConfirmButton} disabled={notAllow} className="loginButton">
            로그인
          </button>
          <button className="signUpButton">
            회원가입
          </button>
        </div>
      </div>
    );
}
export default Login;