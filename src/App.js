import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import "./App.css";
import { Outlet, Routes, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Situation from "./components/Situation";
import Pronunciation from "./components/Pronunciation";
import PaintWithAi from './components/PaintWithAi';
import Signup from "./pages/Signup";
import Learning from "./pages/Learning";
import Pattern from "./components/Pattern";
import styled from "styled-components";
import MyPage from "./components/MyPage"
import ChangeUserInfo from "./pages/ChangeUserInfo";
import Footer from "./components/Footer";

function App() {
  return (
    <Container>
		<Nav />
      	<Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="learning/situation/:level" element={<Situation/>}/>
          <Route path="learning/pronunciation/:level" element={<Pronunciation/>}/>
          <Route path="learning/paintwithai/:level" element={<PaintWithAi />} />
          <Route path="learning/pattern/:level" element={<Pattern/>}/>
		      <Route path="mypage" element={<MyPage/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="learning" element={<Learning />}/>
		      <Route path="mypage/userinfo" element={<ChangeUserInfo/>}/>
		    </Routes>
    <Footer/>
    </Container>

  );
}

export default App;


const Container = styled.div`
	display: block;
	position: relative;
	height: auto;
  min-height: 100vh;
	z-index: 1;
`;


