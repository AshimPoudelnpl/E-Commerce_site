import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const adornmentId = React.useId();
  const textFieldId = React.useId();
  const [isShowPassword, setIsShowPasssword] = useState(false);
  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] p-4 ">
            Login to your account
          </h3>
          <form className="w-full">
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email ID *"
                variant="outlined"
                className="w-full "
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword == false ? `password` : `text`}
                id="password"
                label="Password *"
                variant="outlined"
                className="w-full"
              />
              <Button
                onClick={() => setIsShowPasssword(!isShowPassword)}
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
              >
                {isShowPassword == false ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            <a className="link cursor-pointer text-[14px] font-[600]">
              {" "}
              Forgot Password ?
            </a>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button className="btn-org btn-1g w-full !bg-[#ff5252] font-bold !text-white">
                Login
              </Button>
            </div>

            <p className="text-center py-2  ">
              Not Registered?{" "}
              <Link className="link text-[14px] font-[600]" to="/sign-in">
                Sign Up
              </Link>
            </p>
            <p className="text-center [font-[500] py-2">
              Or continue with social account
            </p>
            <Button className="flex gap-3 w-full text-[20px] !bg-[#f1f1f1] btn-1g !text-black !font-bold">
              <FcGoogle className="text-[20px]" />
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
