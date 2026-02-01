import { createContext, useEffect, useState } from "react";
import { AppConstants } from "../Util/constants";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const backendURL = AppConstants.BACKEND_URL;

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState(null);

	const getUserData = async () => {
		try {
			const response = await axios.get(backendURL + "/profile");
			if (response.status === 200) {
				setUserData(response.data);
			} else {
				toast.error("Unable to retrieve profile");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const getAuthState = async () => {
		try {
			const response = await axios.get(backendURL + "/is-authenticated");

			if (response.status === 200 && response.data) {
				setIsLoggedIn(true);
				await getUserData();
			} else {
				setIsLoggedIn(false);
				setUserData(null);
			}
		} catch (error) {
			setIsLoggedIn(false);
			setUserData(null);
		}
	};

	useEffect(() => {
		getAuthState();
	}, []);

	const contextValue = {
		backendURL,
		isLoggedIn,
		setIsLoggedIn,
		userData,
		setUserData,
		getUserData,
		getAuthState,
	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};
