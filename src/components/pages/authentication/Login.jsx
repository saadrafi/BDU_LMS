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
import Swal from "sweetalert2";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="md:w-[95%] mx-auto flex flex-col md:flex-row my-8 md:my-0 h-full ">
        <div className="flex flex-col space-y-5 md:basis-1/2 items-center md:justify-center text-center">
          <img src="/public/BDU_logo1_out.png" alt="BDU_LOGO" className="w-[50%]" />
          <h1 className="text-7xl font-bold  text-[#3A8DBB]">Welcome Back</h1>
          <p className="text-2xl font-medium bg-clip-text text-transparent  bg-gradient-to-r from-[#552D8D] to-[#0C61A2]">
            Log in to your account to continue
          </p>
        </div>
        {/*Login Form  */}
        <div className="flex items-center justify-center my-4 md:basis-1/2">
          <form
            className="flex flex-col space-y-4 w-[80%] shadow-lg p-8 rounded"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div>
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
              <p className="text-[#3A8DBB] text-sm cursor-pointer text-right">Forgot Password?</p>
            </div>
            <Button variant="outlined" color={"secondary"} type="submit">
              Login
            </Button>
            <Divider>or</Divider>
            <Link to="/register">
              <p className="text-sm text-[#3A8DBB]">
                Don't have an account?{" "}
                <span className="text-[#552D8D] font-medium cursor-pointer">Sign Up</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
