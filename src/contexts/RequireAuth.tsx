import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import Authpage from "../pages/Authpage";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
      return <Authpage />
    }
    

    return children;
}