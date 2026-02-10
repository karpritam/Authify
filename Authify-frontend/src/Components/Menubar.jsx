import React, { useContext, useRef, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Menubar = () => {
	const navigate = useNavigate();
	const { userData, backendURL, setUserData, setIsLoggedIn } =
		useContext(AppContext);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = async () => {
		try {
			axios.defaults.withCredentials = true;
			const response = await axios.post(backendURL + "/logout");
			if (response.status === 200) {
				setIsLoggedIn(false);
				setUserData(false);
				navigate("/");
				toast.success("Logout Succesfully!");
			}
		} catch (err) {
			toast.error(err.response.data.message);
		}
	};

	const sendVerificationOtp = async () => {
		try {
			axios.defaults.withCredentials = true;
			const response = await axios.post(backendURL + "/send-otp");
			if (response.status === 200) {
				navigate("/email-verify");
				toast.success("OTP has been sent successfully.");
			} else {
				toast.error("Unable to send OTP!");
			}
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<nav className="bg-yellow-400 px-6 py-4 flex justify-between items-center shadow-md">
			{/* Logo */}
			<div
				className="flex items-center gap-2 cursor-pointer"
				onClick={() => navigate("/")}>
				<img src={assets.logo} alt="Logo" className="w-9 h-9" />
				<span className="font-bold text-xl text-gray-800">Authify</span>
			</div>

			{/* Right Section */}
			{userData ? (
				<div className="relative" ref={dropdownRef}>
					{/* Avatar */}
					<div
						onClick={() => setDropdownOpen((prev) => !prev)}
						className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold cursor-pointer select-none hover:bg-gray-700 transition">
						{userData.name?.[0]?.toUpperCase()}
					</div>

					{/* Dropdown */}
					{dropdownOpen && (
						<div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
							{!userData.isAccountVerified && (
								<button
									onClick={sendVerificationOtp}
									className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
									Verify Email
								</button>
							)}

							<button
								className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
								onClick={handleLogout}>
								Logout
							</button>
						</div>
					)}
				</div>
			) : (
				<button
					onClick={() => navigate("/login")}
					className="px-5 py-1.5 border border-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition">
					Login →
				</button>
			)}
		</nav>
	);
};

export default Menubar;
