
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import LoginPage from "../pages/admin/LoginPage";

const RedirectIfAuthenticated = () => {
  const { authUser } = useAuthContext();
  return authUser ? <Navigate to="/cpanel" replace /> : <LoginPage />;
};

export default RedirectIfAuthenticated;