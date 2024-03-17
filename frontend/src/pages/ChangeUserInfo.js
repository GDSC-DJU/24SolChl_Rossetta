import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import '../styles/Login.css'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
const ChangeUserInfo = () =>{
  //쿠키 사용
  const cookies = new Cookies();
    // input tage values
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [name, setName] = useState('');
    const [pwCompare,setPwCompare] = useState();
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [wchslerData1, setWechslerData1] = useState('');
    const [wchslerData2, setWechslerData2] = useState('');
    const [wchslerData3, setWechslerData3] = useState('');
    const [wchslerData4, setWechslerData4] = useState('');
    const [wchslerData5, setWechslerData5] = useState('');
    const [wchslerNum,setWchslerNum] = useState('');
    // 버튼 활성화를 위한 버튼 입력값 판단
    const [pwValid, setPwValid] = useState(false);
    const [pwConfirmValid, setPwConfirmValid] = useState(false);
    const [mobileValid, setMobileValid] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [pwCompareValid,setPwCompareValid] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

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
    // 모달 열기
    const openModalHandler = () => {
      setIsModalOpen(true);
    };
  
    // 모달 닫기
    const closeModalHandler = () => {
      setIsModalOpen(false);
    };

    //회원 정보 받아오기
    useEffect(()=>{
      axios.get('http://35.216.81.26:8000/member/parents/info',{
        headers: {
          "Content-Type":'application/json',
          Authorization: cookies.get('token')
        }
      })
      .then((res)=>{
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
      axios.get('http://35.216.81.26:8000/wechsler/info',{
        headers: {
          "Content-Type":'application/json',
          Authorization: cookies.get('token')
        }
      })
      .then((res)=>{
        const wchslerInfo = res.data.response;
        if(res.data.response !== undefined){
          setWechslerData1(wchslerInfo.lang);
          setWechslerData2(wchslerInfo.pr);
          setWechslerData3(wchslerInfo.wm);
          setWechslerData4(wchslerInfo.ps);
          setWechslerData5(wchslerInfo.iq);
          setWchslerNum(wchslerInfo.num);
        }
        
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])

    

  
    useEffect(() => {
      setFormValid(
        !pwCompareValid && pw === '' ? true : pwValid && pw === '' ? true : pwConfirmValid && mobileValid
      );
    }, [ pw, pwConfirm, pwValid, pwConfirmValid, mobileValid,pwCompareValid]);
    

  
    useEffect(()=>{
      // 비밀번호 확인 유효성 검사 추가

      setPwConfirmValid(pw === pwConfirm);
      setPwCompareValid(pwCompare === pw);
      // 핸드폰 번호 유효성 검사 추가
      setMobileValid(/^\d{11}$/.test(mobile));
    },[pw,pwConfirm])
    
    
    const handlePw = (e) => {
      const value = e.target.value;
      setPw(value);
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      setPwValid(regex.test(value));
    };
  
    const handleEmail = (e) => {
      const value = e.target.value;
      setEmail(value);
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
    //회원 정보 수정 버튼
    const onClickUpdateButton = async() => {
      await axios.put('http://35.216.81.26:8000/member/parents/update',{
        pw:pw !== '' ? pw : pwCompare,
        phoneNum:mobile,
      },{
        headers: {
          "Content-Type":'application/json',
          Authorization: cookies.get('token')
        }
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })

      if(wchslerNum === ''){
        await axios.post('http://35.216.81.26:8000/wechsler/sign-up/wechsler',{
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
      }else{
        console.log(wchslerNum)
        await axios.put(`http:/35.216.81.26:8000/wechsler/update/${wchslerNum}`,{
          lang:wchslerData1,
          pr:wchslerData2,
          wm:wchslerData3,
          ps:wchslerData4,
          iq:wchslerData5
        },{
          headers: {
            "Content-Type":'application/json',
            Authorization: cookies.get('token')
          }
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      // navigate(-1);
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
          <div className='wecsler'>
          <button className="btn-hover gallery" onClick={openModalHandler}> 웩슬러 지능 검사 점수 입력 </button>
          <div style={{marginTop: "10px", fontSize: "16px", fontWeight: "bold", color: "red"  }}>웩슬러 지능 검사 점수 입력은 필수 입력이 아닙니다 :)</div>
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
                  onChange={(e)=>setWechslerData1(e.target.value)}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>지각 추론</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="지각 추론 점수"
                  value={wchslerData2}
                  onChange={(e)=>setWechslerData2(e.target.value)}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>작업 기억</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="작업 기억 점수"
                  value={wchslerData3}
                  onChange={(e)=>setWechslerData3(e.target.value)}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>처리 속도</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="처리 속도 점수"
                  value={wchslerData4}
                  onChange={(e)=>setWechslerData4(e.target.value)}
                />
              </div>
              <div className="inputTitle" style={{ marginTop: "8px" }}>IQ</div>
              <div className="inputWrap">
                <input
                  className="input"
                  type="number"
                  placeholder="IQ 점수"
                  value={wchslerData5}
                  onChange={(e)=>setWechslerData5(e.target.value)}
                />
              </div>
              <div className='wecsler'>
                <button className="btn-hover gallery" onClick={closeModalHandler}>닫기</button>
              </div>
            </Modal>
          </>
        )}
        </div>
        <button onClick={onClickUpdateButton} disabled={!formValid} className="signupButton">
          수정하기
        </button>
      </div>
    );
}
  
export default ChangeUserInfo;