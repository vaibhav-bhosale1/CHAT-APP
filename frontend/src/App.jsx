import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import { useAuthContext } from './context/authcontext';

function App() {
    const { authUser } = useAuthContext();
    const isLoggedIn = authUser && authUser.user !== null;

    return (
        <div className="p-4 h-screen flex flex-col items-center justify-center">
            <Routes>
                {/* Home route, accessible only if logged in */}
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                
                {/* Login route, should not be accessible if logged in */}
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
                
                {/* Signup route, should not be accessible if logged in */}
                <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
                
                {/* Redirect any unknown paths to the login page */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            
            {/* Place Toaster component outside Routes for consistent UI */}
            <Toaster />
        </div>
    );
}

export default App;
