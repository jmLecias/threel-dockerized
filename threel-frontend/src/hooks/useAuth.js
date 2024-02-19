import { createContext, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthenticationService from '../services/AuthenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = new AuthenticationService();
    const navigate = useNavigate();

    const user = auth.getUser();

    useEffect(() => {
        const token = auth.getToken();
        auth.setAuthorizationHeader(token);
    }, []);

    // call this function when you want to authenticate the user
    const login = async (credentials) => {
        return auth.login(credentials)
    };

    const register = async (credentials) => {
        return auth.register(credentials)
    };

    // call this function to sign out logged in user
    const logout = () => {
        auth.logout().then(isLoggedOut => {
            if (isLoggedOut) {
                toast.success("Logout successful", {
                    autoClose:  1000,
                    pauseOnHover: true,
                    onOpen: () => navigate("/login", { replace: true })
                });
            }
        }).catch(error => {
            alert("Error logging out: " + error);
        });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            register,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};