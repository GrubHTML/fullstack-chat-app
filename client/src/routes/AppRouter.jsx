import { Route, Routes } from "react-router";
import Signin from "../pages/Signin.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import Profile from "../pages/Profile.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<h2>404, Page not found!</h2>} />
    </Routes>
  );
};

export default AppRouter;
