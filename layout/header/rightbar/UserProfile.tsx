import Link from "next/link";
import React from "react";
import { FileText, LogIn, Menu, User } from "react-feather";
import { useAuth } from "../../../features/auth/contexts/AuthProvider";

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <li className="profile-avatar onhover-dropdown">
      <img src={user?.avatar} alt="" />
      <ul className="profile-dropdown onhover-show-div custom-profiledown">
        {/* <li>
          <Link href="/manage-users/profile">
            <span>Account </span>
            <User />
          </Link>
        </li>
        <li>
          <Link href="/myproperties/propertylist">
            <span>Listing</span>
            <FileText />
          </Link>
        </li> */}
        <li onClick={logout}>
          <a role="button" >
            <span>Log out</span>
            <LogIn />
          </a>
        </li>
      </ul>
    </li>
  );
};

export default UserProfile;
