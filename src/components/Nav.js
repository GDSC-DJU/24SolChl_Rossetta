import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from'styled-components'


const Nav = () => {
  const [show, setShow] = useState(false); // handleScroll function

  //이벤트 리스너 리-랜더링 시 재등록 방지
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  //특정 영역만큼 스크롤 내려가면 네비게이션바 영역 보여주도록 구현
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
 
  return (
    <NavWrapper show={show}>
      {/* 로고 삽입 보류.. 안 이쁨 */}
      {/* <Logo>
        <img
          alt="Rossetta Logo" 
          src="./assets/logo.png" //None background 로고
          onClick={() => (window.location.href = "/")} //To main-page
        />
      </Logo> */}
      <NavInside>
        <MenuWrapper>
          <li style={{fontSize: 20, fontFamily: 'Korean-Font'}}>학습</li>
          <li style={{fontSize: 20, fontFamily: 'Korean-Font'}}>소개</li>
          <li style={{fontSize: 20, fontFamily: 'Korean-Font'}}>검사</li>
        </MenuWrapper>
        <TitleWrapper>
          <div className='title-wrapper' 
          style={{fontSize: 36, fontFamily: 'English-Font'}} 
          onClick={() => (window.location.href = "/")}>
            Rossetta
          </div>
        </TitleWrapper>
        <UserMenuWrapper>
          <li style={{fontSize: 12, fontFamily: 'Korean-Font'}}>로그인</li>
          <li style={{fontSize: 12, fontFamily: 'Korean-Font'}}>회원가입</li>
        </UserMenuWrapper>
      </NavInside>
    </NavWrapper>
  )
}
export default Nav


const NavWrapper = styled.nav`
  position: fixed;  //스크롤내려도 고정
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#white" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 4px;
  z-index: 3;
`;

// const Logo = styled.a`
//   padding:0;
//   width: 100px;
//   margin-top: 4px;
//   max-height: 70px;
//   font-size: 0;
//   diplay: inline-block;

//   img {
//     display: block;
//     width: 100%;
//   }
// `;

const NavInside = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 50px;
  color: #212121;
  justify-content: space-between;
  margin: 0px 80px;
`;

const MenuWrapper = styled.div`
  list-style: none;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 500px;
  gap: 150px;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
`;

const UserMenuWrapper = styled.div`
  list-style: none;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 500px;
  height: 100%;
  gap: 50px;
`;
