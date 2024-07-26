import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        // Initialize authUser from localStorage on mount
        const storedUser = localStorage.getItem('chat-user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setAuthUser(parsedUser);
            } catch (e) {
                console.error('Failed to parse user data from localStorage', e);
                setAuthUser(null);
            }
        }
    }, []);

    useEffect(() => {
        // Sync authUser state with localStorage
        if (authUser) {
            localStorage.setItem('chat-user', JSON.stringify(authUser));
        } else {
            localStorage.removeItem('chat-user');
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
