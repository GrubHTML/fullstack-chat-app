import React from "react";
import { useAuth } from "../hooks/useAuth.js";
const Dashboard = () => {
  const { user, token } = useAuth();
  return (
    <div>
      {token} <br />
      <h2 className="text-2xl">{user?.id}</h2> <br />
      <h2 className="text-2xl">{user?.username}</h2> <br />
      <h2 className="text-2xl">{user?.email}</h2>
    </div>
  );
};

export default Dashboard;
