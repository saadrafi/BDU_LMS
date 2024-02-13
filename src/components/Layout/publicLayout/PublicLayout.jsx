import React from "react";
import Header from "../../header/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0">
        <Header />
      </div>
      <div className="flex-1 grow">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
