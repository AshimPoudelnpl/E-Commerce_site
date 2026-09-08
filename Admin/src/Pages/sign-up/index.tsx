import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";

import toast from "react-hot-toast";

const SignUp = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.password) {
      toast.error("Please fill all required fields");
      return;
    }
    if (formFields.password !== formFields.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Creating account...");

    try {
      const res = await postData("/api/user/register", {
        name: formFields.name,
        email: formFields.email,
        password: formFields.password,
      });
      if (res?.success) {
        toast.success(res?.message || "Registration successful!", {
          id: loadingToastId,
        });
        navigate("/login");
      } else {
        toast.error(res?.message || "Registration failed", {
          id: loadingToastId,
        });
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(
        axiosError?.response?.data?.message || "Registration failed",
        { id: loadingToastId },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Top navigation */}
      <Box className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Box className="flex items-center gap-2">
          <svg width="44" height="24" viewBox="0 0 44 24" fill="none">
            <path
              d="M4 20C4 12 10 4 16 4C18 4 18 8 14 10C10 12 4 18 4 20Z"
              fill="#111827"
            />
            <path
              d="M18 20C18 12 24 4 30 4C32 4 32 8 28 10C24 12 18 18 18 20Z"
              fill="#111827"
            />
            <circle cx="38" cy="19" r="4" fill="#111827" />
          </svg>
          <Typography className="!font-bold !text-[20px] !text-gray-900">
            isomorphic
          </Typography>
        </Box>

        <Box className="flex items-center gap-6">
          <Box className="flex items-center gap-1.5 text-gray-800 cursor-pointer">
            <HiOutlineUser className="text-[16px]" />
            <Typography className="!text-[13px] !font-semibold">
              Sign Up
            </Typography>
          </Box>
          <Link to="/login">
            <Button
              startIcon={<HiOutlineLogin className="!text-[16px]" />}
              className="!bg-gray-100 !text-gray-800 !capitalize !rounded-full !px-5 !py-1.5 !text-[13px] !font-semibold hover:!bg-gray-200"
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Main content */}
      <Container
        maxWidth="xs"
        className="!flex !flex-col !items-center !pt-2 !pb-16"
      >
        <Typography
          variant="h4"
          className="!font-extrabold !text-gray-900 !text-center !mb-1"
        >
          Create Account
        </Typography>
        <Typography
          variant="h6"
          className="!font-extrabold !text-gray-900 !text-center !mb-6"
        >
          Sign up to get started.
        </Typography>

        {/* Social sign-up buttons */}
        <Box className="flex w-full gap-3 mb-6">
          <Button
            fullWidth
            variant="outlined"
            endIcon={<FcGoogle className="!text-[18px]" />}
            className="!border-blue-100 !text-gray-600 !capitalize !text-[13px] !font-medium !py-2.5 !rounded-md hover:!border-blue-200 hover:!bg-blue-50/40"
          >
            Signup With Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            endIcon={<FaFacebook className="!text-[18px] !text-[#1877F2]" />}
            className="!border-blue-100 !text-gray-600 !capitalize !text-[13px] !font-medium !py-2.5 !rounded-md hover:!border-blue-200 hover:!bg-blue-50/40"
          >
            Signup With Facebook
          </Button>
        </Box>

        {/* Divider */}
        <Box className="flex items-center w-full mb-6">
          <Box className="flex-1 h-px bg-gray-300" />
          <Typography className="!px-4 !text-[13px] !text-gray-500 !whitespace-nowrap">
            Or, Sign up with your email
          </Typography>
          <Box className="flex-1 h-px bg-gray-300" />
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} className="w-full">
          <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">
            Full Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            name="name"
            value={formFields.name}
            onChange={handleChange}
            className="!mb-4"
            slotProps={{ input: { className: "!rounded-md !bg-white" } }}
          />

          <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">
            Email
          </Typography>
          <TextField
            fullWidth
            type="email"
            size="small"
            name="email"
            value={formFields.email}
            onChange={handleChange}
            className="!mb-4"
            slotProps={{ input: { className: "!rounded-md !bg-white" } }}
          />

          <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            size="small"
            name="password"
            value={formFields.password}
            onChange={handleChange}
            className="!mb-4"
            slotProps={{
              input: {
                className: "!rounded-md !bg-white",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((p) => !p)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <IoEyeOffOutline className="text-[18px] text-gray-500" />
                      ) : (
                        <IoEyeOutline className="text-[18px] text-gray-500" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type={showConfirm ? "text" : "password"}
            size="small"
            name="confirmPassword"
            value={formFields.confirmPassword}
            onChange={handleChange}
            className="!mb-6"
            slotProps={{
              input: {
                className: "!rounded-md !bg-white",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((p) => !p)}
                      edge="end"
                      size="small"
                    >
                      {showConfirm ? (
                        <IoEyeOffOutline className="text-[18px] text-gray-500" />
                      ) : (
                        <IoEyeOutline className="text-[18px] text-gray-500" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            className="!bg-blue-600 !capitalize !text-[14px] !font-semibold !py-3 !rounded-md !shadow-none hover:!bg-blue-700"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>

          <Typography className="!text-center !text-[13px] !text-gray-500 !mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
