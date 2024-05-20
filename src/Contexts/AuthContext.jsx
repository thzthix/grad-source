import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const isLoggedIn = authToken !== null;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            const verifyUser = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/api/verify-token', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCurrentUser(response.data);
                } catch (error) {
                    console.log(error);
                    logout();
                }
            };

            verifyUser();
        }
    }, []);

    const login = (responseData) => {
        const { user, token } = responseData;
        localStorage.setItem('token', token);
        setCurrentUser(user);
        setAuthToken(token);
    };

    const logout = () => {
        setCurrentUser(null);
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ authToken, currentUser, login, logout,isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
