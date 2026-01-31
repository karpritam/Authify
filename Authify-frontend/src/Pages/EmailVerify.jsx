import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const OTP_LENGTH = 6;
const RESEND_TIME = 300; //5min

const EmailVerify = () => {
	const inputRef = useRef([]);
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
	const [loading, setLoading] = useState(false);
	const [timer, setTimer] = useState(RESEND_TIME);

	const { getUserData } = useContext(AppContext);
	const navigate = useNavigate();

	/* -------------------- Auto Timer -------------------- */
	useEffect(() => {
		if (timer === 0) return;
		const interval = setInterval(() => setTimer((t) => t - 1), 1000);
		return () => clearInterval(interval);
	}, [timer]);

	/* -------------------- Input Change -------------------- */
	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/, "");
		if (!value) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (index < OTP_LENGTH - 1) {
			inputRef.current[index + 1]?.focus();
		}
	};

	/* -------------------- Backspace Handling -------------------- */
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			const newOtp = [...otp];
			if (otp[index]) {
				newOtp[index] = "";
				setOtp(newOtp);
			} else if (index > 0) {
				inputRef.current[index - 1]?.focus();
			}
		}
	};

	/* -------------------- Verify OTP -------------------- */
	const handleVerify = async () => {
		const finalOtp = otp.join("");
		if (finalOtp.length < OTP_LENGTH) return;

		setLoading(true);
		try {
			// API call here
			await new Promise((res) => setTimeout(res, 1500));
			getUserData();
			navigate("/");
		} finally {
			setLoading(false);
		}
	};

	/* -------------------- Resend OTP -------------------- */
	const handleResend = () => {
		setTimer(RESEND_TIME);
		setOtp(Array(OTP_LENGTH).fill(""));
		inputRef.current[0]?.focus();
		// resend API here
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500">
			{/* Logo */}
			<Link
				to="/"
				className="absolute top-0 left-0 flex items-center gap-2 p-4">
				<img src={assets.mark} alt="logo" className="h-8 w-8" />
				<span className="text-xl font-semibold text-white">Authify</span>
			</Link>

			{/* Animated Card */}
			<motion.div
				initial={{ opacity: 0, scale: 0.9, y: 30 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="w-[400px] rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
				<h2 className="mb-2 text-center text-xl font-bold text-white">
					Verify Email
				</h2>

				<p className="mb-4 text-center text-sm text-white/70">
					Enter the 6-digit OTP sent to your email
				</p>

				{/* OTP Inputs */}
				<div className="mb-4 flex justify-between gap-2">
					{otp.map((value, i) => (
						<input
							key={i}
							ref={(el) => (inputRef.current[i] = el)}
							value={value}
							onChange={(e) => handleChange(e, i)}
							onKeyDown={(e) => handleKeyDown(e, i)}
							maxLength={1}
							type="text"
							className="h-12 w-12 rounded-lg border border-white/30 bg-transparent text-center text-xl text-white outline-none focus:border-white"
						/>
					))}
				</div>

				{/* Verify Button */}
				<button
					onClick={handleVerify}
					disabled={loading}
					className="w-full rounded-lg bg-white py-2 font-semibold text-indigo-600 transition hover:bg-gray-100 disabled:opacity-60">
					{loading ? "Verifying..." : "Verify Email"}
				</button>

				{/* Resend OTP */}
				<div className="mt-4 text-center text-sm text-white/70">
					{timer > 0 ? (
						<span>Resend OTP in {formatTime(timer)}</span>
					) : (
						<button
							onClick={handleResend}
							className="font-semibold text-white hover:underline">
							Resend OTP
						</button>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default EmailVerify;
