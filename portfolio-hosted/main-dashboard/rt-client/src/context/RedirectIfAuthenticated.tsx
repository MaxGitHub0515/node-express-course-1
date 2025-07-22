
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import LoginPage from "../pages/admin/LoginPage";

const RedirectIfAuthenticated = () => {
  const { authUser } = useAuthContext();
//if logged in - redirect to dash
// Otherwise, show login page
  return authUser ? <Navigate to="/cpanel" replace /> : <LoginPage />;
};

export default RedirectIfAuthenticated;