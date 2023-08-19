import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthenticationContext = React.createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthentication() {

    return useContext(AuthenticationContext);
}

function AuthenticationProvider({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState<object>(() => ({ username: '', password: '' }));
    const [isLoading, setIsLoading] = useState<boolean>(() => false);

    const login = async (e) => {

        e.preventDefault();

        setIsLoading(() => true);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', loginInfo, {
                withCredentials: true
            });

            if (response.status >= 200) {
                setIsLoading(() => false);
                navigate('/chats', { replace: true });
            }
        }
        catch (err) {
            setIsLoading(() => false);
            console.log(err);
        }
    }

    return (
        <AuthenticationContext.Provider value={{ login, loginInfo, setLoginInfo, isLoading }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider;