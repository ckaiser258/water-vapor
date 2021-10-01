import { Session } from "next-auth";
import React from "react";

const User: React.FC<{ user: Session }> = ({ user }) => {
  return (
    <div>
      {user?.name}
      {user?.email}
      {user?.image}
    </div>
  );
};

export default User;
