import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	let fallbackJson = '{ "user": "null" }';
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || fallbackJson);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};