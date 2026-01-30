import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { tr } from "framer-motion/client";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
	const [isCreateAccount, setIsCreateAccount] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
	const navigate = useNavigate();

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		axios.defaults.withCredentials = true;
		setLoading(true);
		try {
			if (isCreateAccount) {
				//register api
				const response = await axios.post(`${backendURL}/register`, {
					name,
					email,
					password,
				});
				if (response.status === 200) {
					navigate("/");
					toast.success("Account created successfully.");
				} else {
					toast.error("Email already exists");
				}
			} else {
				//login api
				const response = await axios.post(`${backendURL}/login`, {
					email,
					password,
				});
				if (response.status === 200) {
					setIsLoggedIn(true);
					getUserData();
					navigate("/");
				} else {
					toast.error("Email/Password Incorrect");
				}
			}
		} catch (err) {
			toast.error(err.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 relative">
			{/* Logo */}
			<Link
				to="/"
				className="absolute top-6 left-8 flex items-center gap-2 text-white font-bold text-xl">
				<img src={assets.mark} alt="logo" className="w-8 h-8" />
				Authify
			</Link>

			{/* Card */}
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">
				<h2 className="text-2xl font-bold text-center mb-6">
					{isCreateAccount ? "Create Account" : "Welcome Back"}
				</h2>

				<form onSubmit={onSubmitHandler} className="space-y-4">
					{isCreateAccount && (
						<input
							type="text"
							placeholder="Full Name"
							className="input"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					)}

					<input
						type="email"
						placeholder="Email address"
						className="input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<input
						type="password"
						placeholder="Password"
						className="input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					{!isCreateAccount && (
						<div className="text-right text-sm">
							<Link
								to="/reset-password"
								className="text-indigo-600 hover:underline">
								Forgot password?
							</Link>
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 rounded-full bg-indigo-600 text-white font-semibold
             hover:bg-indigo-700 transition disabled:opacity-50">
						{loading ? "loading..." : isCreateAccount ? "Sign Up" : "Login"}
					</button>
				</form>

				<p className="text-center text-sm mt-6">
					{isCreateAccount ? (
						<>
							Already have an account?{" "}
							<span
								onClick={() => setIsCreateAccount(false)}
								className="text-indigo-600 cursor-pointer hover:underline">
								Login
							</span>
						</>
					) : (
						<>
							Don’t have an account?{" "}
							<span
								onClick={() => setIsCreateAccount(true)}
								className="text-indigo-600 cursor-pointer hover:underline">
								Sign up
							</span>
						</>
					)}
				</p>
			</div>
		</div>
	);
};

export default Login;
