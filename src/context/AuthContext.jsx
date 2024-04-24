import { createContext, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    user: {},
    login: () => {},
    logout: () => {},
    sendCodeToSever: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    return <AuthContext.Provider value={{ isLoggedIn, user }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
