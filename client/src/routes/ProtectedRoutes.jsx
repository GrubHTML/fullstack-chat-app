import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
export const ProtectedRoutes = ({ children }) => {
  const { token, isLoading } = useAuth();
  if (isLoading) return null; //or a loader
  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

//eita dekhche user valid kina checking by token ache kina
