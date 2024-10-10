import React, { children } from "react";
import Header from "../dashboard/_components/Header";
import SideBar from "./_components/SideBar";

function Dashboardlayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default Dashboardlayout;
