import { Email } from "@mui/icons-material";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      cnfpassword: "",
      email: location.state?.email,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    if (data.password === data.cnfpassword) {
      fetch("http://localhost:5000/auth/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Password Updated",
              text: data.msg,
              showConfirmButton: false,
              timer: 1000,
            });

            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  return (
    <div>
      <h1 className=" text-center text-3xl my-3 font-semibold text-[#0C61A2]">Update Password</h1>
      <div className="flex items-center justify-center my-4 md:basis-1/2">
        <form className="flex flex-col space-y-4 w-[80%] shadow-lg p-8 rounded">
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
                    type="password"
                    label="Password"
                    {...field}
                  />
                );
              }}
            ></Controller>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-cnfpassword">Confirm Password</InputLabel>

            <Controller
              name="cnfpassword"
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
                    id="outlined-adornment-cnfpassword"
                    type="password"
                    label="Confirm Password"
                    {...field}
                  />
                );
              }}
            ></Controller>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
            Set Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
