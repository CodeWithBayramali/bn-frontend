'use client';

import Login from "@/components/Login";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

export default function Root({ children }) {
    const {userToken, isLoading} = useContext(AuthContext)

    if(isLoading) return <div className="flex items-center justify-center h-screen text-3xl text-blue-600">Loading...</div>

    return (
      <>
      {
        userToken ? (
          <>
          {children}
          </>
        ): (<Login />)
      }
      </>
    )
}
