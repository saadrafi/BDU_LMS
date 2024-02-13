import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-full md:w-[95%] mx-auto flex flex-col md:flex-row my-8 md:my-0 ">
      <div className="flex flex-col space-y-4 md:basis-1/2 items-center md:justify-center text-center">
        <img src="/public/BDU_logo1_out.png" alt="BDU_LOGO" className="w-[50%]" />
        <h1 className="text-7xl font-bold  text-[#3A8DBB]">Welcome</h1>
        <p className="text-2xl font-medium bg-clip-text text-transparent  bg-gradient-to-r from-[#552D8D] to-[#0C61A2]">
          Register now to continue
        </p>
      </div>
      {/*Login Form  */}
      <div className=" flex items-center justify-center  md:basis-1/2">
        <form
          className="flex flex-col space-y-4 w-[80%] shadow-lg p-8 rounded bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" flex md:flex-row md:space-y-0 md:space-x-2 flex-col space-y-4 justify-between">
            <div className="flex flex-col gap-1">
              <TextField
              
                label="First Name"
                variant="outlined"
                fullWidth
                {...register("firstName", { required: "First Name is required" })}
              />
              {errors.firstName && (
                <p className="text-sm text-red-700">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && <p className="text-sm text-red-700">{errors.lastName.message}</p>}
            </div>
          </div>

          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
            <Controller
              name="id"
              control={control}
              rules={{
                required: "ID is required",
                maxLength: {
                  value: 10,
                  message: "Invalid ID",
                },
              }}
              render={({ field }) => (
                <OutlinedInput placeholder="2011111" id="outlined-adornment-id" type="text" label="ID" {...field} />
              )}
            ></Controller>
            {errors.id?.type == "required" && (
              <p className="text-sm text-red-700">{errors.id.message}</p>
            )}
            {errors.id?.type === "maxLength" && (
              <p className="text-sm text-red-700">{errors.id.message}</p>
            )}
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
                <OutlinedInput placeholder="01333333333" id="outlined-adornment-phone" type="text" label="Phone" {...field} />
              )}
            ></Controller>
            {errors.phone?.type == "required" && (
              <p className="text-sm text-red-700">{errors.phone.message}</p>
            )}
            {errors.phone?.type === "maxLength" && (
              <p className="text-sm text-red-700">{errors.phone.message}</p>
            )}
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
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
              }}
              render={({ field }) => {
                return (
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                );
              }}
            ></Controller>
            {errors.password?.type === "required" && (
              <p className="text-sm text-red-700">{errors.password.message}</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className=" text-sm text-red-700">{errors.password.message}</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-sm text-red-700">
                Password must contain at least one upper case letter and one special character
              </p>
            )}
          </FormControl>
          <Button variant="outlined" color={"secondary"} type="submit">
            Register
          </Button>
          <Divider>or</Divider>
          <Link to="/login">
            <p className="text-sm text-[#3A8DBB]">
              Already have an account?{" "}
              <span className="text-[#552D8D] font-medium cursor-pointer">Log In</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
