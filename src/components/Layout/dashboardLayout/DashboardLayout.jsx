import React from "react";
import Header from "../../header/Header";
import { Toolbar } from "@mui/material";

const DashboardLayout = () => {
  return (
    <div className="grid md:grid-cols-5 h-screen">
      <div className="bg-red-400 hidden md:inline-flex h-full  flex-col">
        <Toolbar />
        <div className="bg-yellow-500 flex-1">sidebar</div>
      </div>
      <div className="bg-green-400 col-start-2 col-end-6">
        <div className="sticky top-0">
          <Header />
        </div>
        <div className="">Content</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
