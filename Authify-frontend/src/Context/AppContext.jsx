import { createContext, useState } from "react";
import { AppConstants } from "../Util/constants";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendURL=AppConstants.BACKEND_URL;
    const [isLoggesIn,setIsLoggedIn]=useState(false);
    const [userData,setUserData]=useState(false);

	const contextValue = {
        backendURL,
        isLoggesIn,setIsLoggedIn,
        userData,setUserData
    };
	return (
		<AppContext.Provider value={contextValue}>
			{props.children}
		</AppContext.Provider>
	);
};
