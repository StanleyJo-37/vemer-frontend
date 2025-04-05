"use client";

import ProfileAPI from "@/api/ProfileAPI";
import AuthContext from "@/context/AuthContext";
import { User } from "@/types/AuthType";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode,
}) {
    const [user, setUser] = useState<User>();
    const [loading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        ProfileAPI.me()
                    .then(res => {
                        setUser(res.data as User);
                    })
                    .catch(err => {
                        if (err instanceof AxiosError) {
                            if (err.status === 403)
                            setUser(undefined);
                        }
                    })
                    .finally(() => setIsLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}