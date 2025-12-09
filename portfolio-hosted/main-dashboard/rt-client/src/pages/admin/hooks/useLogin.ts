


import type {FormikHelpers} from "formik"
import { useNavigate } from "react-router-dom";

import {toast} from "react-hot-toast"
import { useAuthContext } from "../../../context/AuthContext";
import type { AuthFormValues } from "../../../types";

export default function useLogin() {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
  const { setAuthUser } = useAuthContext();

  const login = async (values: AuthFormValues, { resetForm }: FormikHelpers<AuthFormValues>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }
    // redirect to cpanel if logged in successfully
    // using navigate hook - won't reload the page when manages the redirect
      setAuthUser(data);
      toast.success("Admin logged in yeahh");
      resetForm();
      navigate("/cpanel");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Login failed");
    }
     // logout logic here!!!
  };

  return { login };
}
