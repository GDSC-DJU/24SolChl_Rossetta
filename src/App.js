import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./components/Nav";
// import Main from "./components/Main";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Situation from "./components/Situation";
import Pronunciation from "./components/Pronunciation";
import Signup from "./pages/Signup";
import Learning from "./pages/Learning";

function App() {
  return (
    <>
		<Nav />
      	<Routes>
			<Route path="/" element={<Main/>}/>
			<Route path="learning/situation-quiz" element={<Situation/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="signup" element={<Signup/>}/>
      		<Route path="pronunciation" element={<Pronunciation/>}/>
			<Route path="learning" element={<Learning/>}/>
		</Routes>
    </>

  );
}

export default App;


