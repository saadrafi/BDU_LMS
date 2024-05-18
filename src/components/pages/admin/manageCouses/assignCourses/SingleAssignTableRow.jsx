import { Button } from "@mui/material";
import React from "react";

const SingleAssignTableRow = ({ index, course, handleCourseDelete }) => {
  return (
    <tr className=" border-b-2">
      <td className=" py-4">{index}</td>
      <td className="py-4">{course.courseName}</td>
      <td className="py-4">{course.courseCode.toUpperCase()}</td>
      <td className="py-4">{course.credit}</td>
      <td className="py-4">{course.department}</td>
      <td className="py-4">{course.semester}</td>
      <td className="py-4">{course.teacherName}</td>
      <td className="py-4">
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            handleCourseDelete(course.id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default SingleAssignTableRow;
