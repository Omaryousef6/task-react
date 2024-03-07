import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(undefined);
  const [userData, setUserData] = useState(null);

  function getUserDataToken() {
    const userData = jwtDecode(localStorage.getItem("tkn"));
    console.log("userDataToken", userData);
    setUserData(userData)
  }

  useEffect(() => {
    const val = localStorage.getItem("tkn");
    if (val != null) {
      // Handel refrech in mounting phase
      setToken(val);
      getUserDataToken();
    }
  }, []);

  return (
    <>
      <authContext.Provider value={{ token, setToken, userData,  getUserDataToken }}>
        {children}
      </authContext.Provider>
    </>
  );
}
