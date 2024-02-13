import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Situation from "./components/Situation";
import Pronunciation from "./components/Pronunciation";
import Signup from "./pages/Signup";
import styled from "styled-components";

function App() {
  return (
    <Container>
		<Nav />
      	<Routes>
			<Route path="/" element={<Main/>}/>
			<Route path="situation-quiz" element={<Situation/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="signup" element={<Signup/>}/>
      		<Route path="pronunciation" element={<Pronunciation/>}/>
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


