import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Menubar = () => {
	const navigate = useNavigate();

	return (
		<nav className="bg-white px-5 py-4 flex justify-between items-center shadow">
			<div className="flex items-center gap-2">
				<img src={assets.logo} alt="Logo" className="w-8 h-8" />
				<span className="font-bold text-xl text-gray-800">Authify</span>
			</div>

			<button
				onClick={() => navigate("/login")}
				className="border border-gray-800 rounded-full px-4 py-1 hover:bg-gray-800 hover:text-white transition">
				Login →
			</button>
		</nav>
	);
};

export default Menubar;
