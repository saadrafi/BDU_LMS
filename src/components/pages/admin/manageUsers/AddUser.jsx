import React, { useState } from "react";
import { Phone, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      id: "",
      role: "",
      firstName: "",
      lastName: "",
      semester: "",
      phone: "",
    },
  });

  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const onSubmit = (data) => {
    fetch("http://localhost:5000/admin/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Added",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "User Addition Failed",
            text: data.msg,
          });
        }
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="text-4xl font-semibold text-[#0C61A2] w-[80%] mx-auto my-3 text-center">
        Add User{" "}
      </h1>

      <div className="flex items-center justify-center my-4 md:basis-1/2">
        <form
          className="flex flex-col space-y-4 w-[80%] shadow-lg p-8 rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-firstName">First Name</InputLabel>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  type="text"
                  label="First Name"
                  {...field}
                />
              )}
            ></Controller>
            {errors.firstName && <p className="text-sm text-red-700">{errors.firstName.message}</p>}
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastName">Last Name</InputLabel>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <OutlinedInput
                  id="outlined-adornment-lastName"
                  type="text"
                  label="Last Name"
                  {...field}
                />
              )}
            ></Controller>
            {errors.lastName && <p className="text-sm text-red-700">{errors.lastName.message}</p>}
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-text">ID</InputLabel>
            <Controller
              name="id"
              control={control}
              rules={{ required: "ID is required" }}
              render={({ field }) => (
                <OutlinedInput id="outlined-adornment-text" type="text" label="id" {...field} />
              )}
            ></Controller>
            {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <Controller
              name="email"
              control={control}
              rules={{ required: "email is required" }}
              render={({ field }) => (
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  label="Email"
                  {...field}
                />
              )}
            ></Controller>
            {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
          </FormControl>

          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-phone">Phone</InputLabel>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone is required",
                maxLength: {
                  value: 13,
                  message: "Invalid Phone",
                },
              }}
              render={({ field }) => (
                <OutlinedInput
                  placeholder="01333333333"
                  id="outlined-adornment-phone"
                  type="text"
                  label="Phone"
                  {...field}
                />
              )}
            ></Controller>
            {errors.phone?.type == "required" && (
              <p className="text-sm text-red-700">{errors.phone.message}</p>
            )}
            {errors.phone?.type === "maxLength" && (
              <p className="text-sm text-red-700">{errors.phone.message}</p>
            )}
          </FormControl>

          {/* select role */}
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-role">Role</InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: "role is required" }}
              render={({ field }) => (
                <Select
                  id="outlined-adornment-role"
                  native
                  label="Role"
                  {...field}
                  inputProps={{
                    name: "role",
                    id: "outlined-adornment-role",
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    setRole(e.target.value);
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"student"}>Student</option>
                  <option value={"teacher"}>Teacher</option>
                  <option value={"admin"}>Admin</option>
                </Select>
              )}
            ></Controller>
            {errors.role && <p className="text-sm text-red-700">{errors.role.message}</p>}
          </FormControl>

          {role === "student" && (
            <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-role">Semester</InputLabel>
              <Controller
                name="semester"
                control={control}
                rules={{ required: "semester is required" }}
                render={({ field }) => (
                  <Select
                    id="outlined-adornment-semester"
                    native
                    label="Semester"
                    {...field}
                    inputProps={{
                      name: "Semester",
                      id: "outlined-adornment-semester",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"l1t1"}>Level 1 Term 1</option>
                    <option value={"l1t2"}>Level 1 Term 2</option>
                    <option value={"l2t1"}>Level 2 Term 1</option>
                    <option value={"l2t2"}>Level 2 Term 2</option>
                    <option value={"l3t1"}>Level 3 Term 1</option>
                    <option value={"l3t2"}>Level 3 Term 2</option>
                    <option value={"l4t1"}>Level 4 Term 1</option>
                    <option value={"l4t2"}>Level 4 Term 2</option>
                  </Select>
                )}
              ></Controller>
              {errors.semester && <p className="text-sm text-red-700">{errors.semester.message}</p>}
            </FormControl>
          )}

          <Button variant="outlined" color={"secondary"} type="submit">
            Add User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
