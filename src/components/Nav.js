import React, {useEffect, useState} from 'react'
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
    <Logo>
      <img
        alt="Rossetta Logo" 
        src="./assets/logo.png" //None background 로고
        onClick={() => (window.location.href = "/")} //To main-page
      />
    </Logo>
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
  letter-spacing: 16px;
  z-index: 3;
`;


const Logo = styled.a`
  padding:0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  diplay: inline-block;

  img {
    display: block;
    width: 100%;
  }
`

