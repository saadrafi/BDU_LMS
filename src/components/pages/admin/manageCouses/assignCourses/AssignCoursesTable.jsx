import { Button, FormControl, InputLabel, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import Select from "react-select";
import { set } from "react-hook-form";
import SingleAssignTableRow from "./SingleAssignTableRow";

const AssignCoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [sessionsOptions, setSessionsOptions] = useState([]);
  const [deparmentsOptions, setDepartmentsOptions] = useState([]);
  const [teachersOptions, setTeachersOptions] = useState([]);
  const [courseCodes, setCourseCodes] = useState([]);

  const semestersOptions = [
    { value: "l1t1", label: "Level 1 Term 1" },
    { value: "l1t2", label: "Level 1 Term 2" },
    { value: "l2t1", label: "Level 2 Term 1" },
    { value: "l2t2", label: "Level 2 Term 2" },
    { value: "l3t1", label: "Level 3 Term 1" },
    { value: "l3t2", label: "Level 3 Term 2" },
    { value: "l4t1", label: "Level 4 Term 1" },
    { value: "l4t2", label: "Level 4 Term 2" },
  ];

  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [courseCode, setCourseCode] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  const [assignCourses, setAssignCourses] = useState([]);

  const handleAssignCourse = (data) => {
    fetch("http://localhost:5000/admin/assignCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Course Assigned",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
          setUpdated(!updated);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Course Assignment Failed",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCourseDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/admin/deleteAssignedCourse", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Course Deleted",
                text: data.msg,
                showConfirmButton: false,
                timer: 1000,
              });
              setUpdated(!updated);
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Course Deletion Failed",
                text: data.msg,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        const codes = data.map((course) => {
          return {
            value: course.id,
            label: course.id.toUpperCase(),
          };
        });
        setCourseCodes(codes);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/admin/teachers")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((teacher) => {
          return {
            value: teacher.id,
            label: teacher.name,
          };
        });
        setTeachersOptions(options);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/admin/departments")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((department) => {
          return {
            value: department.id,
            label: department.name,
          };
        });
        setDepartmentsOptions(options);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:5000/admin/sessions")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((session) => {
          return {
            value: session.session,
            label: session.session,
          };
        });
        setSessionsOptions(options);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/admin/assignedCourses")
      .then((res) => res.json())
      .then((data) => {
        setAssignCourses(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updated]);
  return (
    <div>
      <div className="flex justify-end my-5">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon></AddIcon>}
          onClick={() => {
            setOpen(true);
          }}
        >
          Assign Course
        </Button>
      </div>

      <table className="w-full">
        <thead className=" border-b-2 border-blue-400">
          <tr>
            <th className="py-4">S.No</th>
            <th className="py-4">Course Name</th>
            <th className="py-4">Course ID</th>
            <th className="py-4">Credit</th>
            <th className="py-4">Department</th>
            <th className="py-4">Semester</th>
            <th className="py-4">Assigned Teacher</th>
            <th className="py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {assignCourses.map((course, index) => (
            <SingleAssignTableRow
              index={index + 1}
              course={course}
              key={course.id}
              handleCourseDelete={handleCourseDelete}
            />
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div
          className="w-[50%] mx-auto 
        bg-white p-5 mt-10 rounded-md shadow-lg
        flex justify-center items-center
        flex-col
        space-y-2
        
        "
        >
          <h1 className="text-3xl font-semibold text-[#0C61A2]">Assign Course</h1>
          <form className="w-[70%] mx-auto flex flex-col space-y-1">
            <InputLabel htmlFor="outlined-adornment-amount">Course Code</InputLabel>
            <Select
              isClearable
              isSearchable
              options={courseCodes}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (provided) => ({ ...provided, borderRadius: 10 }),
                container: (provided) => ({ ...provided, width: 500, height: 60 }),
              }}
              onChange={(e) => {
                const course = courses.find((course) => course.id === e.value);
                setSelectedCourse(course.name);
                setCourseCode(e.value);
              }}
            />

            {/* show course name automatically */}
            <InputLabel htmlFor="outlined-adornment-amount">Course Name</InputLabel>
            <TextField value={selectedCourse} id="outlined-read-only-input" type="text" label="" />

            <InputLabel htmlFor="outlined-adornment-amount">Teacher</InputLabel>

            <Select
              isClearable
              isSearchable
              options={teachersOptions}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (provided) => ({ ...provided, borderRadius: 10 }),
                container: (provided) => ({ ...provided, width: 500, height: 60 }),
              }}
              onChange={(e) => {
                setSelectedTeacher(e.value);
              }}
            />

            <InputLabel htmlFor="outlined-adornment-amount">Department</InputLabel>
            <Select
              isClearable
              isSearchable
              options={deparmentsOptions}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (provided) => ({ ...provided, borderRadius: 10 }),
                container: (provided) => ({ ...provided, width: 500, height: 60 }),
              }}
              onChange={(e) => {
                setSelectedDepartment(e.value);
              }}
            />

            <InputLabel htmlFor="outlined-adornment-amount">Semester</InputLabel>
            <Select
              isClearable
              isSearchable
              options={semestersOptions}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (provided) => ({ ...provided, borderRadius: 10 }),
                container: (provided) => ({ ...provided, width: 500, height: 60 }),
              }}
              onChange={(e) => {
                setSelectedSemester(e.value);
              }}
            />

            <InputLabel htmlFor="outlined-adornment-amount">Session</InputLabel>
            <Select
              isClearable
              isSearchable
              options={sessionsOptions}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (provided) => ({ ...provided, borderRadius: 10 }),
                container: (provided) => ({ ...provided, width: 500, height: 60 }),
              }}
              onChange={(e) => {
                setSelectedSession(e.value);
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                const data = {
                  courseCode,
                  teacher: selectedTeacher,
                  department: selectedDepartment,
                  semester: selectedSemester,
                  session: selectedSession,
                };
                console.log(data);
                if (
                  courseCode == "" ||
                  selectedTeacher == "" ||
                  selectedDepartment == "" ||
                  selectedSemester == "" ||
                  selectedSession == ""
                ) {
                  console.log("Please fill all the fields");
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Course Assignment Failed",
                    text: "Please fill all the fields",
                  });
                } else {
                  handleAssignCourse(data);
                }
                setCourseCode("");
                setSelectedCourse("");
                setSelectedTeacher("");
                setSelectedDepartment("");
                setSelectedSemester("");
                setSelectedSession("");
                setOpen(false);
              }}
            >
              Assign
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AssignCoursesTable;
