import { Route, Routes } from "react-router";
import Signin from "../pages/Signin.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h2>Something pore thik korbo </h2>} />
    </Routes>
  );
};

export default AppRouter;
