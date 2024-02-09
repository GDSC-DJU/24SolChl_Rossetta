import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./components/Nav";
// import Main from "./components/Main";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Situation from "./components/Situation";
import Pronunciation from "./components/Pronunciation";

function App() {
  return (
    <>
		<Nav />
      	<Routes>
			<Route path="/" element={<Main/>}/>
			<Route path="situation-quiz" element={<Situation/>}/>
			<Route path="login" element={<Login/>}/>
      		<Route path="pronunciation" element={<Pronunciation/>}/>
		</Routes>
    </>

  );
}

export default App;


