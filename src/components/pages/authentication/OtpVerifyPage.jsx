import React, { useRef, useState } from "react";
import { useEffect } from "react";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

const OtpVerifyPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email);
  const navigate = useNavigate();
  const [render, setRender] = useState("");

  useEffect(() => {
    console.log(email);
  }, [email]);

  const onsubmit = (data) => {
    setEmail(data.email);
    fetch("http://localhost:5000/auth/sendOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRender(data?.email);
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "OTP Sent",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "OTP Send Failed",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOtpVerify = (e) => {
    console.log(email);
    console.log(otp);
    e.preventDefault();
    fetch("http://localhost:5000/auth/verifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "OTP Verified",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
          if (data.isApproved == false) {
            Swal.fire({
              position: "center",
              icon: "info",
              title: "User not approved",
              text: "Please wait for the admin to approve your account",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate("/login");
          } else if (data.password == false) {
            navigate("/update-password", { state: { email: email } });
          } else {
            setTimeout(() => {
              navigate(`/dashboard/${data.role}`);
            }, 1000);
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "OTP Verification Failed",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resendOtp = () => {
    fetch("http://localhost:5000/auth/resendOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "OTP Resent",
            text: data.msg,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "OTP Resend Failed",
            text: data.msg,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="h-full flex items-center justify-center">
        {email == null ? (
          <div className="w-[90%] md:w-[50%] shadow-lg border-2 border-blue-500 flex flex-col space-x-2 p-5">
            <h1 className="text-3xl text-center my-2">OTP Verification</h1>
            <p className="text-center text-gray-500">Enter your email to receive the OTP</p>
            <FormControl sx={{ mt: 1, mb: 1 }} variant="outlined">
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
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit(onsubmit)}
              className="w-[50%] self-center"
            >
              Send OTP
            </Button>
          </div>
        ) : (
          <div className="w-[90%] md:w-[50%] shadow-lg border-2 border-blue-500 flex flex-col space-x-2">
            <h1 className="text-3xl text-center my-2">OTP Verification</h1>
            <p className="text-center text-gray-500">Enter the OTP sent to your email</p>
            <form className="flex flex-col space-y-4 p-4" onSubmit={handleOtpVerify}>
              <div className="w-full">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputStyle={{
                    width: "100%",
                    height: "3rem",
                    fontSize: "1rem",
                    margin: "0 0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ced4da",
                    textAlign: "center",
                  }}
                  containerStyle={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "1rem 0",
                  }}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>

              <p className="text-center text-gray-500">
                Didn't receive the OTP?{" "}
                <span onClick={resendOtp} className="text-blue-500 cursor-pointer">
                  Resend OTP
                </span>
              </p>

              <button className="bg-blue-500 text-white p-2 rounded-md">Verify</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default OtpVerifyPage;
