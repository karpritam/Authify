import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { tr } from "framer-motion/client";

const ResetPassword = () => {
	const OTP_LENGTH = 6;
	const inputRef = useRef([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isEmailSent, setisEmailSent] = useState(false);
	const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
	const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
	const [timer, setTimer] = useState(300);
	const { getUserData, isLoggedIn, userData, backendURL } =
		useContext(AppContext);
	useEffect(() => {
		if (timer === 0) return;
		const interval = setInterval(() => setTimer((t) => t - 1), 1000);
		return () => clearInterval(interval);
	}, [timer]);

	/* -------------------- Input Change -------------------- */
	const handleChange = (e, index) => {
		const value = e.target.value.replace(/\D/, "");
		e.target.value = value;

		if (value && index < 5) {
			inputRef.current[index + 1]?.focus();
		}
	};

	/* -------------------- Backspace Handling -------------------- */
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !e.target.value && index > 0) {
			inputRef.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault(); //stop loading entire page
		const paste = e.clipboardData.getData("text").slice(0, 6).split("");
		paste.forEach((digit, i) => {
			if (inputRef.current[i]) {
				inputRef.current[i].value = digit;
			}
		});
		const next = paste.length < 6 ? paste.length : 5;
		inputRef.current[next].focus();
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

	const onSubmitEmail = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				backendURL + "/send-reset-otp?email=" + email,
			);
			if (response.status === 200) {
				toast.success("Password reset OTP sent successfully.");
				setisEmailSent(true);
			} else {
				toast.error("Something went wrong, Please try again.");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleVerify = () => {
		const enteredOtp = inputRef.current
			.map((input) => input.value.trim()) // remove spaces
			.join("");

		if (enteredOtp.length !== 6) {
			toast.error("Please enter all 6 digits of the OTP.");
			return;
		}

		setOtp(enteredOtp);
		setIsOtpSubmitted(true);
	};

	const onSubmitNewPassword = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(backendURL + "/reset-password", {
				email,
				otp,
				newPassword,
			});
			if (response.status === 200) {
				toast.success("Passsword reset successfully.");
				navigate("/login");
			} else {
				toast.error("Something went wrong, please try again.");
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#6a5af9] to-[#8268f9] relative px-4">
			{/* Logo */}
			<Link to="/" className="absolute top-4 left-4 flex items-center gap-2">
				<img src={assets.mark} alt="logo" className="w-8 h-8" />
				<span className="text-lg font-semibold text-white">Authify</span>
			</Link>

			{/* ---------------- Email Card ---------------- */}
			{!isEmailSent && (
				<div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
					<h4 className="mb-2 text-center text-2xl font-bold text-gray-800">
						Reset Password
					</h4>

					<p className="mb-6 text-center text-sm text-gray-500">
						Enter your registered email
					</p>

					<form onSubmit={onSubmitEmail}>
						<div className="mb-4">
							<input
								type="email"
								className="h-[50px] w-full rounded-lg border border-gray-300 px-4 outline-none focus:border-indigo-500"
								placeholder="Enter email address"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
							/>
						</div>

						<button
							disabled={loading}
							type="submit"
							className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700">
							{loading ? "Sending otp..." : "Send OTP"}
						</button>
					</form>
				</div>
			)}

			{/* ---------------- OTP Card ---------------- */}
			{!isOtpSubmitted && isEmailSent && (
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 30 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="w-full max-w-[420px] rounded-2xl bg-white/10 p-6 shadow-xl backdrop-blur-lg">
					<h2 className="mb-2 text-center text-2xl font-bold text-white">
						Verify Email
					</h2>

					<p className="mb-6 text-center text-sm text-white/70">
						Enter the 6-digit OTP sent to your email
					</p>

					{/* OTP Inputs */}
					<div className="mb-6 flex justify-center gap-3">
						{otp.map((value, i) => (
							<input
								key={i}
								ref={(el) => (inputRef.current[i] = el)}
								onChange={(e) => handleChange(e, i)}
								onKeyDown={(e) => handleKeyDown(e, i)}
								onPaste={handlePaste}
								maxLength={1}
								type="tel"
								inputMode="numeric"
								pattern="[0-9]*"
								className="h-12 w-12 rounded-lg border border-white/40 bg-transparent text-center text-xl font-semibold text-white outline-none focus:border-white"
							/>
						))}
					</div>

					{/* Verify Button */}
					<button
						onClick={handleVerify}
						disabled={loading}
						className="w-full rounded-lg bg-white py-2 font-semibold text-indigo-600 transition hover:bg-gray-100 disabled:opacity-60">
						{loading ? "Verifying..." : "Verify OTP"}
					</button>

					{/* Resend */}
					<div className="mt-4 text-center text-sm text-white/70">
						{timer > 0 ? (
							<span>Resend in {formatTime(timer)}</span>
						) : (
							<button
								onClick={handleResend}
								className="font-semibold text-white hover:underline">
								Resend OTP
							</button>
						)}
					</div>
				</motion.div>
			)}
			{/* new pasword form */}
			{isOtpSubmitted && isEmailSent && (
				<div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
					<h4 className="mb-2 text-center text-2xl font-bold text-gray-800">
						New Password
					</h4>

					<p className="mb-6 text-center text-sm text-gray-500">
						Enter your new password below
					</p>

					<form onSubmit={onSubmitNewPassword}>
						{/* Password Input */}
						<div className="mb-4">
							<input
								type="password"
								className="h-[50px] w-full rounded-lg border border-gray-300 px-4 outline-none focus:border-indigo-500"
								placeholder="********"
								onChange={(e) => setNewPassword(e.target.value)}
								value={newPassword}
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							disabled={loading}
							type="submit"
							className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700">
							{loading ? "Submitting..." : "Submit"}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default ResetPassword;
