import React from "react";
import { useAuth } from "../hooks/useAuth.js";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl text-yellow-600">Welcome {user.username}</h1>
    </div>
  );
};

export default Profile;
