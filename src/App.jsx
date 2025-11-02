/** @format */
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../src/components/loginPage.jsx";
import Stlog from "../src/components/stlog.jsx";
import "./App.css";
import Adminlogin from "./components/adminlogin.jsx";
import { Routes, Route } from "react-router-dom";
import StudentPage from "./components/studentpage.jsx";
import AdminPage from "./components/adminpage.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/stlog' element={<Stlog />} />
				<Route path='/student-page' element={<StudentPage />} />
				<Route path='/adminlogin' element={<Adminlogin />} />
				<Route path='/admin-page' element={<AdminPage />} />
			</Routes>
		</>
	);
}

export default App;
