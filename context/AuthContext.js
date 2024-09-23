"use client";
import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // jwtDecode doğru import edilmeli
import moment from "moment";
import { useRouter } from "next/navigation";
import { getToken } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    
    const isLoggedIn = async () => {
        try {
            const findToken = localStorage.getItem("access-token");
            if (findToken) {
              var decoded = jwtDecode(findToken);
              if (decoded.exp < moment().unix()) {
                localStorage.removeItem("access-token"); // Remove expired token
                location.reload()
              } else {
                setUserToken(findToken)
              }
            } else {
              setIsLoading(false)
            }
          } catch (err) {
            console.log(`Login error: ${err}`);
          } finally {
            setIsLoading(false);
          }
    };
    
    useEffect(()=> {
        isLoggedIn()
    }, [])

    return (
        <>
                 <AuthContext.Provider value={{isLoading,userToken}}>
                 {children}
             </AuthContext.Provider>
        </>
    );
};