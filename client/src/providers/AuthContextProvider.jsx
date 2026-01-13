import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { axiosInstance } from "../api/axiosInstance.js";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user stores logged in user info
  const [token, setToken] = useState(null); // stores access token
  const [isLoading, setIsLoading] = useState(true); //while checking if user is already logged in

  /* login function=> This is called from the SignIn component
    - Updates context with user and token from successful login
    - Makes the data available to all components
  */
  const login = (loginUser, loginToken) => {
    setUser(loginUser);
    setToken(loginToken);
    console.log(loginUser, loginToken);
  };
  /* useEffect=> Runs once when app starts(empty dependency array [])
    - Calls /api/refresh: checks if refresh token in cookies is valid
    - If Successfull: gets new access token, updates state
    - If Failed: User not logged in (error caught silently)
    - Finally: Sets isLoading = false (auth check complete)
  */
  useEffect(() => {
    /* auto-login on app start
    Empty dependency array [] means:
    -  Code runs only during Mount phase (when component first appears)
    -  Does NOT run again on updates/re-renders
    -  Optionally runs cleanup when component unmounts
    */
    const refreshAuth = async () => {
      try {
        const res = await axiosInstance.post("/api/refresh");
        console.log(res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
      } catch (error) {
        // logout later maybe
      } finally {
        setIsLoading(false);
      }
    };
    refreshAuth();
  }, []);

  // Makes all auth data and functions available to child components.
  const value = { login, user, token, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // .Provider means user sends data and the data is within the value
};

// oi faka box a ki ki data pathabo jeno sobai seta access korte pare sei data gulo eikhane theke pathate hoy.
/* 
AuthContextProvider.jsx - PROVIDE data to the context

=>=>=> Full Flow:
- createContext() only creates the container
- useContext() reads what's inside the container
- They are two separate operations - you can't read without creating, and creating without reading is useless

Think of it like:

- createContext = Creating a bank account
- <Provider> = Depositing money in the bank
- useContext = Withdrawing/checking your balance
You need all three steps!
*/
