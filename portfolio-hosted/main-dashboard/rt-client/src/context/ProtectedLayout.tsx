

import {Navigate, Outlet} from "react-router-dom";
import {useAuthContext} from "./AuthContext"

// using ReactNode instead of JSX.Element to support multiple children

const ProtectedLayout = () => {

  const { authUser } = useAuthContext();
    // If user is not logged in, redirect to login
    // Outlet renders whatever nested child route matches here.
  return authUser ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedLayout;

