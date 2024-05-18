import { Button, FormControl, InputLabel, Modal, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SingleCourseRow from "./SingleCourseRow";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";

const AllCoursesTable = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      id: "",
      credit: "",
    },
  });
  const [courses, setCourses] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCourseAdd = (data) => {
    console.log(data);
    fetch("http://localhost:5000/admin/addCourse", {
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
            title: "Course Added",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
          reset();
          setUpdated(!updated);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Course Addition Failed",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCourseEdit = (course) => {
    console.log(course);
    fetch("http://localhost:5000/admin/updateCourse", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Course Edited",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
          setUpdated(!updated);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Course Edition Failed",
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
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/admin/deleteCourse", {
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
    fetch("http://localhost:5000/admin/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
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
          Add Course
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th># </th>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Credit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {courses.map((course, index) => (
            <SingleCourseRow
              index={index + 1}
              course={course}
              key={course.id}
              handleCourseEdit={handleCourseEdit}
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
        <div className="w-[50%] mx-auto bg-white p-5 mt-10 rounded-md shadow-lg flex justify-center items-center flex-col space-y-4">
          <h1 className="text-3xl font-semibold text-[#0C61A2]">Add Course</h1>
          <form
            className="w-[70%] mx-auto"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              handleCourseAdd(data);
              setOpen(false);
            })}
          >
            <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-text">Course Code</InputLabel>
              <Controller
                name="id"
                control={control}
                rules={{ required: "Course Code is required" }}
                render={({ field }) => (
                  <OutlinedInput
                    id="outlined-adornment-text"
                    type="text"
                    label="Course Code"
                    {...field}
                  />
                )}
              ></Controller>
              {errors.id && <p className="text-sm text-red-700">{errors.id.message}</p>}
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-text">Course Name</InputLabel>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Course Name is required" }}
                render={({ field }) => (
                  <OutlinedInput
                    id="outlined-adornment-text"
                    type="text"
                    label="Course Name"
                    {...field}
                  />
                )}
              ></Controller>
              {errors.name && <p className="text-sm text-red-700">{errors.name.message}</p>}
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-text">Credit</InputLabel>
              <Controller
                name="credit"
                control={control}
                rules={{ required: "Credit is required" }}
                render={({ field }) => (
                  <OutlinedInput
                    id="outlined-adornment-text"
                    type="text"
                    label="Credit"
                    {...field}
                  />
                )}
              ></Controller>
              {errors.credit && <p className="text-sm text-red-700">{errors.credit.message}</p>}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", float: "right" }}
            >
              Add Course
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setOpen(false);
              }}
              style={{ marginTop: "20px", float: "left" }}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AllCoursesTable;
