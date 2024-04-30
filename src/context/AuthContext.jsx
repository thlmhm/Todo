import _ from 'lodash';
import { createContext, useEffect, useState } from 'react';
import authAPI from '~/api/request/auth';
import AntdSwal from '~/custom/AntSwal';
import { getJwtData, setJwtToken } from '~/utils/token';

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

    useEffect(() => {
        const userData = getJwtData();

        if (!_.isEmpty(userData)) {
            setIsLoggedIn(true);
            setUser(userData);
        }
    }, []);

    const login = async (data) => {
        await apiCaller(authAPI.login(data), (resData) => {
            const accessToken = resData?.data?.token;
            setJwtToken(accessToken);
            const userData = getJwtData();

            if (!_.isEmpty(userData)) {
                setIsLoggedIn(true);
                setUser(userData);
                AntdSwal.fire('Thành công', 'Bạn đã đăng nhập thành công', 'Success');
            }
        });
    };

    const logout = async () => {
        removeJwtToken();
        setIsLoggedIn(false);
        setUser({});
    };
    return <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
