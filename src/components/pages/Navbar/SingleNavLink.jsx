import React from "react";
import { NavLink } from "react-router-dom";

const SingleNavLink = ({ to, title }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        ` text-gray-700  px-3 py-2 rounded-l-md text-sm font-medium ${
          isActive ? "bg-gray-300 text-[#0C61A2]" : " hover:bg-gray-300"
        }`
      }
    >
      {title}
    </NavLink>
  );
};

export default SingleNavLink;
