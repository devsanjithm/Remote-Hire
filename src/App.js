import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { UserContext } from "./context";
import Login from "./Component/login"
import Signup from "./Component/signup";
import Home from "./Component/Home";
import Add from "./Component/Add";
import Hrpage from "./Component/hrpage";
import Admin from "./Component/Admin"
import HrHome from "./Component/hrhome";
import { ContextProvider } from "./context";
import 'react-toastify/dist/ReactToastify.css';
import Approve from "./Component/Approve";

function App() {
	const { user, setloadscreen, loadscreen, userroll, setuseroll } = useContext(UserContext);

	return (
		<ContextProvider>
			<Router>
				<Routes>
					<Route exact path="/" element={<Navigate to="/login" />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route exact path="/hrpage" element={<Hrpage />} />
					<Route exact path="/Home" element={<Home />} />
					<Route exact path="/Add" element={<Add />} />
					<Route exact path="/admin" element={<Admin />} />
					<Route exact path="/Approve" element={<Approve />} />
					<Route exact path="/hrHome" element={<HrHome />} />
				</Routes>
			</Router>
		</ContextProvider>
	);
}

export default App;
