import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiClient } from "../api/apis";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies, removeCookies] = useCookies();
  const [token, setToken] = useState(cookies.token || null);
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      const user = jwtDecode(token).user;
      setToken(token);
      setUser(user);
    }
    else {
      if (!loggedOut) {
        setToken(null);
        setUser(null);
      }
      else {
        setLoggedOut(false);
      }
    }
    setIsLoading(false);
  }, [cookies.token]);

  const loginUser = async (data) => {
    try {
      const response = await apiClient.post("/users/login", {
        login: data.login,
        password: data.password,
      });
      if (response.data) {
        const token = response.data.token;
        const payload = jwtDecode(token);
        const user = payload.user;

        setCookies("token", token, {
          expires: new Date(payload.exp * 1000),
        });

        setToken(token);
        setUser(user);
        console.log("token and user", token, user);
        return { token, user };
      } else {
        throw new Error("Response data is undefined");
      }
    } catch (error) {
      console.error("Failed to log in:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    removeCookies("token");
    setToken(null);
    setUser(null);
    setLoggedOut(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, token, user, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
