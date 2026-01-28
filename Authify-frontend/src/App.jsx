import React from "react";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import EmailVerify from "./Pages/EmailVerify";
import ResetPassword from "./Pages/ResetPassword";

const App = () => {
	return (
		<div>
			<div>
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/email-verify" element={<EmailVerify />} />
					<Route path="/reset-password" element={<ResetPassword />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
