import { useContext, useDebugValue } from "react";
import AuthContext from "src/context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    //console.log(`>>>>>useAuth  ${JSON.stringify(auth)}`)
    useDebugValue(auth, auth => auth?.isAuthenticated ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;