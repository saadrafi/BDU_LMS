import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tab, Tabs } from "@mui/material";
import AllCoursesTable from "./allCourses/AllCoursesTable";
import AssignCoursesTable from "./assignCourses/AssignCoursesTable";

const ManageCourses = () => {
  const [value, setValue] = useState(0);
  const [tab, setTab] = useState("ALL COURSES");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTab(event.target.innerText);
  };
  return (
    <div>
      <div className="flex justify-between my-5">
        <h1 className="text-3xl font-semibold text-[#0C61A2]">Manage Courses</h1>
      </div>
      <div>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="All Courses"></Tab>
          <Tab label="Assigned Courses"></Tab>
        </Tabs>
      </div>
      <div>{tab === "ALL COURSES" ? <AllCoursesTable /> : <AssignCoursesTable />}</div>
    </div>
  );
};

export default ManageCourses;
