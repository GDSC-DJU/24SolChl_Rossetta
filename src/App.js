import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./components/Nav";
// import Main from "./components/Main";
import "./App.css";
import { Outlet, Routes, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Situation from "./components/Situation";
import Pronunciation from "./components/Pronunciation";
import Signup from "./pages/Signup";
import Pattern1 from "./patterns/pattern";
import Pattern2 from "./patterns/pattern";
import Pattern3 from "./patterns/pattern";

function App() {
  return (
    <>
		<Nav />
      	<Routes>
			<Route path="/" element={<Main/>}/>
			<Route path="situation-quiz" element={<Situation/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="signup" element={<Signup/>}/>
      		<Route path="pronunciation" element={<Pronunciation/>}/>
			<Route path="pattern1" element={<Pattern1/>}/>
			<Route path="pattern2" element={<Pattern2/>}/>
			<Route path="pattern3" element={<Pattern3/>}/>
		</Routes>
    </>

  );
}

export default App;


