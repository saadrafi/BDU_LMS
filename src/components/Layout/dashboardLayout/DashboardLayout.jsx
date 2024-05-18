import React, { useState } from "react";
import Header from "../../header/Header";
import { Toolbar } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../pages/Navbar/Navbar";

const DashboardLayout = () => {
  const [navbarIsOpen, setNavbarIsOpen] = useState(true);
  // const [isMobile, setIsMobile] = useState(false);

  const handleNavbarIsOpen = () => {
    setNavbarIsOpen(!navbarIsOpen);
  };

  return (
    <div className="flex flex-col h-screen space-y-1">
      <div className="grid grid-cols-5 gap-0 h-fit">
        <div className="h-fit">
          <Link to={"/login"} className="hidden md:inline drop-shadow-md">
            <Toolbar
              sx={{
                backgroundColor: "lightgray",
                backgroundImage: "url('../../../../public/BDU_logo1_out.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </Link>
        </div>
        <div className=" col-span-5 md:col-span-4 h-fit sticky top-0">
          <Header handleNavbarIsOpen={handleNavbarIsOpen} />
        </div>
      </div>

      <div
        className="relative grid grid-cols-5 gap-0 flex-grow"
        onClick={() => {
          setNavbarIsOpen(false);
        }}
      >
        <div
          className={`" absolute md:relative z-10 md:left-0  md:col-span-1 h-full  md:inline bg-neutral-100 transition-all duration-500 ease-in-out"
         ${navbarIsOpen ? "left-0" : "-left-full"}
        `}
        >
          <Navbar />
        </div>
        <div className=" col-span-5 md:col-span-4">
          <div className="p-4">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
