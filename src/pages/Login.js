import React, { useEffect, useState } from 'react'
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const User = {
  email: 'test@example.com',
  pw: 'test2323@@@'
}


const Login = () => {
    const [username, setUsername] = useState(''); //input tag id value
    const [pw, setPw] = useState(''); //input tag pw value

    const [usernameValid, setUsernameValid] = useState(false);
    const [pwValid, setPwValid] = useState(false); //입력값과 정규표현식 비교 판단 state
    const [notAllow, setNotAllow] = useState(true); //로그인 버튼 활성화 판단 state
    const cookies = new Cookies();

    const signupNavigate = useNavigate();

    // Email, Pw 정규표현식 검사 통과 -> 로그인 버튼 활성화
    useEffect(() => {
      if(usernameValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [usernameValid, pwValid]);

    const handleUsername = (e) => {
      const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
      setUsername(value);
      const regex = /^[a-z0-9]+$/; // 영어 소문자와 숫자만
      setUsernameValid(regex.test(value));
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
    const onClickConfirmButton = async() => {
      await axios.post('http://localhost:8000/member/sign-in',{
        id:username,
        pw:pw
      })
      .then((res)=>{
        console.log(res);
        cookies.set('token',res.data.token);
      })
      .catch((err)=>{
        console.log(err);
      })
      if(cookies.get('token') !== undefined){
        signupNavigate(-1);

      }
    }

    return (
      <div className="page">
        <div className="titleWrap">
          로그인
        </div>
        <div className="contentWrap">
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
            {!usernameValid && usernameValid.length > 0 && (
              <div>올바른 아이디를 입력해주세요.</div>
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
          <button onClick={() => signupNavigate(`/signup`)} className="toSignUpButton">
            회원가입
          </button>
        </div>
      </div>
    );
}
export default Login;