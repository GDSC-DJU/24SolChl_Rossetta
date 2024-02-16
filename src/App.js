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
import Pattern from "./patterns/pattern";
import styled from "styled-components";
import MyPage from "./components/MyPage"
import Introduction from "./pages/Introduction";
import SituationQuiz from "./components/Situation";

import ChangeUserInfo from "./pages/ChangeUserInfo";

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
		      <Route path="userinfo" element={<ChangeUserInfo/>}/>
		    </Routes>
    </Container>
  );
}

export default App;


const Container = styled.div`
	display: block;
	position: relative;
	height: auto;
  min-height: 100vh
	z-index: 1;
`;


