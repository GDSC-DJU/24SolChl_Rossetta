import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from'styled-components'
import '../styles/Nav.css'
import { Cookies, useCookies } from 'react-cookie';


const Nav = () => {
  const [show, setShow] = useState(false); // handleScroll function
  const cookies = new Cookies();
  const [removeCookie] = useCookies(['token']);

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

  const handleLogout = useCallback (() => {
    removeCookie('token');
  }, [cookies]);
 
  if(cookies.get('token') === undefined) {
    return (
      <NavWrapper show={show}>
        <NavInside>
          <MenuWrapper>
            <Link to="introduction" className='link-to'>소개</Link>
            <Link to="learning" className='link-to'>학습</Link>
          </MenuWrapper>
          <TitleWrapper style={{cursor:"pointer"}} onClick={() => (window.location.href = "/")}>
              <img src="../../assets/title-black.png" style={{width: "100%", height:"100%"}} alt="Rossetta title" />
          </TitleWrapper>
          <UserMenuWrapper>
            <Link to="login" className='link-to' id='link-to__login' >로그인</Link>
            <Link to="signup" className='link-to' id='link-to__signup'>회원가입</Link>
          </UserMenuWrapper>
        </NavInside>
      </NavWrapper>
    )
  }
  else{
    return(
      <NavWrapper show={show}>
        <NavInside>
          <MenuWrapper>
            <Link to="introduction" className='link-to'>소개</Link>
            <Link to="learning" className='link-to'>학습</Link>
          </MenuWrapper>
          <TitleWrapper style={{cursor:"pointer"}} onClick={() => (window.location.href = "/")}>
              <img src="../../assets/title-black.png" style={{width: "100%", height:"100%"}}alt="Rossetta title" />
          </TitleWrapper>
          <UserMenuWrapper>
            <Link to="/" className='link-to' id='link-to__logout' onClick={()=> handleLogout}>로그아웃</Link>
            <Link to="mypage" className='link-to' id='link-to__mypage' >마이페이지</Link>
          </UserMenuWrapper>
        </NavInside>
      </NavWrapper>
    )
  }
}
export default Nav


const NavWrapper = styled.nav`
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  width: auto;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 4px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 8px 12px 0px;
  border-bottom: solid 1px #ddd;
  z-index: 4;
`;

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
  justify-content: center;
  align-items: center;
  width: 500px;
  gap: 200px;
  padding-left: 50px;
  height: 100%;
  font-Size: 20px; 
  font-Family:'Korean-Font-bold';
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 65%;
  font-Size: 44px;
  font-Family: 'English-Font'; 
  letter-Spacing: 0px;
`;

const UserMenuWrapper = styled.div`
  list-style: none;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 500px;
  height: 100%;
  gap: 50px;
  font-size: 12px;
  font-Family: 'Korean-Font-bold';
  text-Decoration: "none"
`;