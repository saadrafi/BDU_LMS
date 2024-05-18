import { Button, FormControl, InputLabel, Modal, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const SingleCourseRow = ({ index, course, handleCourseEdit, handleCourseDelete }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: course.name,
      id: course.id,
      credit: course.credit,
    },
  });

  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className=" border-b-2">
        <td className=" py-4">{index}</td>
        <td className=" py-4">{course.name}</td>
        <td className=" py-4">{course.id.toUpperCase()}</td>
        <td className=" py-4">{course.credit}</td>

        <td className=" py-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit
          </Button>
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
        space-y-4
        "
        >
          <h1 className="text-3xl font-semibold text-[#0C61A2]">Edit Course</h1>
          <form
            className="w-[70%] mx-auto"
            onSubmit={handleSubmit((data) => {
              handleCourseEdit(data);
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
                    disabled
                    id="outlined-adornment-text"
                    type="text"
                    label="Course Code"
                    value={course.id.toUpperCase()}
                    
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
              variant="outlined"
              color="primary"
              style={{ marginTop: "20px", float: "right" }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              style={{ marginTop: "20px", float: "left" }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SingleCourseRow;
