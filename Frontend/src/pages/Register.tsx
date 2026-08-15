import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] p-4 font-bold">
            Create an Account
          </h3>
          <form className="w-full">
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="fullName"
                label="Full Name *"
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email ID *"
                variant="outlined"
                className="w-full"
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword ? "text" : "password"}
                id="password"
                label="Password *"
                variant="outlined"
                className="w-full"
              />
              <Button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                label="Confirm Password *"
                variant="outlined"
                className="w-full"
              />
              <Button
                type="button"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
              >
                {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org btn-lg w-full !bg-[#ff5252] font-bold !text-white">
                Sign Up
              </Button>
            </div>

            <p className="text-center py-2">
              Already have an account?{" "}
              <Link className="link text-[14px] font-[600]" to="/login">
                Login
              </Link>
            </p>

            <p className="text-center font-[500] py-2">
              Or continue with social account
            </p>

            <Button className="flex gap-3 w-full text-[20px] !bg-[#f1f1f1] btn-lg !text-black !font-bold">
              <FcGoogle className="text-[20px]" />
              Sign Up with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;