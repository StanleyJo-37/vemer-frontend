"use client";

import AuthContext from "@/context/AuthContext";
import { User } from "@/types/AuthType";
import React, { useState } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode,
}) {
    const [user, setUser] = useState<User>();
    const token = localStorage.getItem("token") ?? undefined;

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            token,
        }}>
            {children}
        </AuthContext.Provider>
    );
}