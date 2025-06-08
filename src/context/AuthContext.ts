import { AuthContextType } from "@/types/AuthType";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({
  setIsAuth: (newAuth: boolean) => {},
  logout: async () => {},
});

export default AuthContext;
