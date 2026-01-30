import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../Context/AppContext";

const Header = () => {
	const { userData } = useContext(AppContext);
	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
			<motion.img
				src={assets.header}
				alt="header"
				className="w-28 mb-6 animate-float-rotate"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			/>

			<motion.h3
				className="text-gray-500 text-mb mb-2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}>
				Hey {userData ? userData.name : "Developer"} 👋
			</motion.h3>

			<motion.h1
				className="text-4xl md:text-5xl font-bold mb-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}>
				Authentication, done right.
			</motion.h1>

			<motion.p
				className="text-gray-500 text-lg max-w-xl mb-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}>
				Set up secure login, OTP, and user management in minutes.
			</motion.p>

			<motion.button
				className="px-6 py-2 rounded-full border border-gray-900 hover:bg-gray-900 hover:text-white"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}>
				Get Started
			</motion.button>
		</div>
	);
};

export default Header;
