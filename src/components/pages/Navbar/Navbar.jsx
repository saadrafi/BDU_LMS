import React from "react";
import { Link } from "react-router-dom";
import SingleNavLink from "./SingleNavLink";
import { Button, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const adminNavbar = (
    <>
      <SingleNavLink to={"/dashboard/admin"} title={"Home"} />
      <SingleNavLink to={"/dashboard/admin/manage-users/"} title={"Manage Users"} />
      <SingleNavLink to={"/dashboard/admin/manage-courses/"} title={"Manage Courses"} />
      <SingleNavLink to={"/dashboard/admin/manage-enrollments/"} title={"Manage Enrollments"} />
    </>
  );
  return (
    <div className="flex flex-col  space-y-4 md:ml-3 font-normal">
      {adminNavbar}
      <Divider />
      <Link to="/" className="md:mr-3 pb-3">
        <Button variant="outlined" fullWidth endIcon={<LogoutIcon />}>
          Log out
        </Button>
      </Link>
    </div>
  );
};

export default Navbar;
