import { AuthContextType } from "@/types/AuthType";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({});

export default AuthContext;