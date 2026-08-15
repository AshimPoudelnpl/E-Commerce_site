import { Button, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import { MyContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const ForgotPassword = () => {
    const [formFields, setFormFields] = useState({
        email: "",
        password1: "",
        password2: "",
    });
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isPasswordShow2, setIsPasswordShow2] = useState(false);
    const context = useContext(MyContext);
    const histoty = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formFields.email === "") {
            context.error("Please enter your email address!");
            return;
        }
        if (formFields.password1 === "") {
            context.error("Please enter a new password!");
            return;
        }
        if (formFields.password1 !== formFields.password2) {
            context.error("Passwords do not match!");
            return;
        }
        context.success("OTP sent to your email successfully!");
        setTimeout(() => histoty("/verify"), 1500);
    };

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[500px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="flex justify-center mb-2 text-[50px] text-[#ff5252]">
                        <MdOutlineEmail />
                    </div>
                    <h3 className="text-center text-[18px] p-4">
                        Forgot Password
                    </h3>
                    <p className="text-center text-[13px] text-gray-500 mb-5 leading-relaxed">
                        Enter your email and new password below to reset your account.
                    </p>

                    <form className="w-full mt-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="form-group w-full mb-5">
                            <TextField
                                type="email"
                                id="forgot-email"
                                label="Email Id"
                                variant="outlined"
                                className="w-full"
                                name="email"
                                value={formFields.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password 1 Field */}
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                type={isPasswordShow === false ? "password" : "text"}
                                id="password1"
                                label="Password"
                                variant="outlined"
                                className="w-full"
                                name="password1"
                                value={formFields.password1}
                                onChange={handleChange}
                            />
                            <Button
                                onClick={() => setIsPasswordShow(!isPasswordShow)}
                                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                            >
                                {isPasswordShow === false ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>

                        {/* Password 2 Field */}
                        <div className="form-group w-full mb-5 relative">
                            <TextField
                                type={isPasswordShow2 === false ? "password" : "text"}
                                id="password2"
                                label="Confirm Password"
                                variant="outlined"
                                className="w-full"
                                name="password2"
                                value={formFields.password2}
                                onChange={handleChange}
                            />
                            <Button
                                onClick={() => setIsPasswordShow2(!isPasswordShow2)}
                                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
                            >
                                {isPasswordShow2 === false ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </div>

                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button
                                type="submit"
                                className="btn-org btn-1g w-full !bg-[#ff5252] font-bold !text-white"
                            >
                                Send OTP
                            </Button>
                        </div>

                        <p className="text-center py-2">
                            Remember your password?{" "}
                            <Link className="link text-[14px] font-[600]" to="/login">
                                Back to Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
