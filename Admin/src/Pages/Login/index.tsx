import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide email and password");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Logging in...");

    try {
      // POST /api/user/login  →  loginController
      const res = await postData("/api/user/login", { email, password });

      if (res?.success) {
        // Store tokens returned by loginController
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // Optionally persist basic user info
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            avatar: res.data.avatar,
          }),
        );

        toast.success(res?.message || "Login successful!", {
          id: loadingToastId,
        });
        navigate("/");
      } else {
        toast.error(res?.message || "Login failed. Please try again.", {
          id: loadingToastId,
        });
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(
        axiosError?.response?.data?.message ||
          "Login failed. Please check your credentials.",
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
          <Link to="/login">
            <Button
              startIcon={<HiOutlineLogin className="!text-[16px]" />}
              className="!bg-gray-100 !text-gray-800 !capitalize !rounded-full !px-5 !py-1.5 !text-[13px] !font-semibold hover:!bg-gray-200"
            >
              Login
            </Button>
          </Link>

          <Link to="/sign-up">
            <Box className="flex items-center gap-1.5 text-gray-800 cursor-pointer">
              <HiOutlineUser className="text-[16px]" />
              <Typography className="!text-[13px] !font-semibold">
                Sign Up
              </Typography>
            </Box>
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
          Welcome Back!
        </Typography>
        <Typography
          variant="h6"
          className="!font-extrabold !text-gray-900 !text-center !mb-6"
        >
          Sign in with your credentials.
        </Typography>

        {/* Social sign-in buttons */}
        <Box className="flex w-full gap-3 mb-6">
          <Button
            fullWidth
            variant="outlined"
            endIcon={<FcGoogle className="!text-[18px]" />}
            className="!border-blue-100 !text-gray-600 !capitalize !text-[13px] !font-medium !py-2.5 !rounded-md hover:!border-blue-200 hover:!bg-blue-50/40"
          >
            Signin With Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            endIcon={<FaFacebook className="!text-[18px] !text-[#1877F2]" />}
            className="!border-blue-100 !text-gray-600 !capitalize !text-[13px] !font-medium !py-2.5 !rounded-md hover:!border-blue-200 hover:!bg-blue-50/40"
          >
            Signin With Facebook
          </Button>
        </Box>

        {/* Divider */}
        <Box className="flex items-center w-full mb-6">
          <Box className="flex-1 h-px bg-gray-300" />
          <Typography className="!px-4 !text-[13px] !text-gray-500 !whitespace-nowrap">
            Or, Sign in with your email
          </Typography>
          <Box className="flex-1 h-px bg-gray-300" />
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} className="w-full">
          <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">
            Email
          </Typography>
          <TextField
            fullWidth
            type="email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="!mb-4"
            slotProps={{
              input: {
                className: "!rounded-md !bg-white",
              },
            }}
          />

          <Typography className="!text-[13px] !font-medium !text-gray-700 !mb-1.5">
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!mb-4"
            slotProps={{
              input: {
                className: "!rounded-md !bg-white",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
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

          <Box className="flex items-center justify-between mb-5">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  className="!text-blue-600"
                  sx={{
                    color: "#d1d5db",
                    "&.Mui-checked": { color: "#2563eb" },
                  }}
                />
              }
              label={
                <Typography className="!text-[13px] !text-gray-700">
                  Remember Me
                </Typography>
              }
            />
            <Link
              to="/forgot-password"
              className="!text-[13px] !font-medium !text-blue-600"
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            className="!bg-blue-600 !capitalize !text-[14px] !font-semibold !py-3 !rounded-md !shadow-none hover:!bg-blue-700 disabled:!opacity-70"
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>

          <Typography className="!text-center !text-[13px] !text-gray-500 !mt-4">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
