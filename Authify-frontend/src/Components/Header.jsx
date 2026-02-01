import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../Context/AppContext";

const Header = () => {
	const { userData } = useContext(AppContext);

	const isLoggedIn = !!userData;

	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
			<motion.img
				key={isLoggedIn ? "user" : "guest"}
				src={isLoggedIn ? assets.header : assets.profile}
				alt="header"
				className="w-28 mb-6 animate-float-rotate"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			/>

			{/* SUB HEADING */}
			<motion.h3
				className="text-gray-500 text-sm mb-2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				{isLoggedIn
					? `Welcome back, ${userData.name} 👋`
					: "Hey Developer 👋 Secure authentication made simple"}
			</motion.h3>

			{/* MAIN HEADING */}
			<motion.h1
				className="text-4xl md:text-5xl font-bold mb-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				{isLoggedIn
					? "Your dashboard is ready"
					: "Authentication, done right."}
			</motion.h1>

			{/* DESCRIPTION */}
			<motion.p
				className="text-gray-500 text-lg max-w-xl mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
			>
				{isLoggedIn
					? "Manage your account, security, and sessions from one place."
					: "Set up secure login, OTP, and user management in minutes."}
			</motion.p>

			{/* CTA */}
			<motion.button
				className="px-6 py-2 rounded-full border border-gray-900 hover:bg-gray-900 hover:text-white"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{isLoggedIn ? "Go to Dashboard" : "Get Started"}
			</motion.button>
		</div>
	);
};

export default Header;
