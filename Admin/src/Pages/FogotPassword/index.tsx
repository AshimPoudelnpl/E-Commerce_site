import { useEffect, useRef, useState } from "react";
import type {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
} from "react";

import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import {
  HiOutlineShieldCheck,
  HiOutlineMailOpen,
} from "react-icons/hi";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

type Step = "email" | "otp" | "reset" | "success";

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>("email");

  // Email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // OTP
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] =
    useState<number>(RESEND_SECONDS);

  // Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const inputRefs =
    useRef<Array<HTMLInputElement | null>>([]);

  // =========================
  // OTP COUNTDOWN
  // =========================

  useEffect(() => {
    if (step !== "otp" || resendTimer === 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) =>
        Math.max(prev - 1, 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [step, resendTimer]);

  // =========================
  // EMAIL SUBMIT
  // =========================

  const handleEmailSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError(
        "Please enter your email address."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setEmailError(
        "Please enter a valid email address."
      );
      return;
    }

    setEmail(trimmedEmail);
    setEmailError("");

    // TODO: Send OTP API
    console.log(
      "Send OTP to:",
      trimmedEmail
    );

    setOtp(Array(OTP_LENGTH).fill(""));
    setOtpError("");
    setResendTimer(RESEND_SECONDS);

    setStep("otp");

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  // =========================
  // OTP CHANGE
  // =========================

  const handleOtpChange = (
    index: number,
    value: string
  ) => {
    const digit = value
      .replace(/[^0-9]/g, "")
      .slice(-1);

    const nextOtp = [...otp];

    nextOtp[index] = digit;

    setOtp(nextOtp);

    if (otpError) {
      setOtpError("");
    }

    if (
      digit &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  // =========================
  // OTP KEY DOWN
  // =========================

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      e.preventDefault();

      inputRefs.current[
        index - 1
      ]?.focus();

      return;
    }

    if (
      e.key === "ArrowLeft" &&
      index > 0
    ) {
      e.preventDefault();

      inputRefs.current[
        index - 1
      ]?.focus();

      return;
    }

    if (
      e.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      e.preventDefault();

      inputRefs.current[
        index + 1
      ]?.focus();

      return;
    }
  };

  // =========================
  // OTP PASTE
  // =========================

  const handleOtpPaste = (
    e: ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) {
      return;
    }

    const nextOtp = Array(
      OTP_LENGTH
    ).fill("");

    for (
      let i = 0;
      i < pasted.length;
      i++
    ) {
      nextOtp[i] = pasted[i];
    }

    setOtp(nextOtp);
    setOtpError("");

    const focusIndex =
      pasted.length < OTP_LENGTH
        ? pasted.length
        : OTP_LENGTH - 1;

    setTimeout(() => {
      inputRefs.current[
        focusIndex
      ]?.focus();
    }, 0);
  };

  // =========================
  // OTP SUBMIT
  // =========================

  const handleOtpSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < OTP_LENGTH) {
      setOtpError(
        "Please enter the full 6-digit code."
      );
      return;
    }

    setOtpError("");

    // TODO: Verify OTP API
    console.log(
      "Verify OTP:",
      code,
      "for:",
      email
    );

    // Open New Password Form
    setStep("reset");
  };

  // =========================
  // RESEND OTP
  // =========================

  const handleResend = () => {
    if (resendTimer > 0) {
      return;
    }

    // TODO: Resend OTP API
    console.log(
      "Resend OTP to:",
      email
    );

    setOtp(Array(OTP_LENGTH).fill(""));
    setOtpError("");
    setResendTimer(RESEND_SECONDS);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  // =========================
  // RESET PASSWORD
  // =========================

  const handleResetPassword = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    let hasError = false;

    // Password validation
    if (!newPassword) {
      setPasswordError(
        "Please enter your new password."
      );

      hasError = true;
    } else if (newPassword.length < 8) {
      setPasswordError(
        "Password must be at least 8 characters."
      );

      hasError = true;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError(
        "Please confirm your password."
      );

      hasError = true;
    } else if (
      newPassword !== confirmPassword
    ) {
      setConfirmPasswordError(
        "Passwords do not match."
      );

      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) {
      return;
    }

    // TODO: Call reset password API
    console.log(
      "Reset password for:",
      email
    );

    console.log(
      "New password:",
      newPassword
    );

    setStep("success");
  };

  // =========================
  // RENDER
  // =========================

  return (
    <Box className="relative min-h-screen w-full overflow-hidden bg-white">

      {/* =========================
          NAVIGATION
      ========================== */}

      <Box className="flex items-center justify-between px-6 py-5 sm:px-10">

        <Box className="flex items-center gap-2">

          <svg
            width="44"
            height="24"
            viewBox="0 0 44 24"
            fill="none"
          >
            <path
              d="M4 20C4 12 10 4 16 4C18 4 18 8 14 10C10 12 4 18 4 20Z"
              fill="#111827"
            />

            <path
              d="M18 20C18 12 24 4 30 4C32 4 32 8 28 10C24 12 18 18 18 20Z"
              fill="#111827"
            />

            <circle
              cx="38"
              cy="19"
              r="4"
              fill="#111827"
            />
          </svg>

          <Typography className="!text-[20px] !font-bold !text-gray-900">
            isomorphic
          </Typography>

        </Box>

        <Box className="flex items-center gap-6">

          <Link
            to="/login"
            className="no-underline"
          >
            <Button
              startIcon={
                <HiOutlineLogin className="!text-[16px]" />
              }
              className="!rounded-full !bg-gray-100 !px-5 !py-1.5 !text-[13px] !font-semibold !capitalize !text-gray-800 hover:!bg-gray-200"
            >
              Login
            </Button>
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-1.5 text-gray-800 no-underline"
          >
            <HiOutlineUser className="text-[16px]" />

            <Typography className="!text-[13px] !font-semibold">
              Sign Up
            </Typography>
          </Link>

        </Box>

      </Box>

      {/* =========================
          MAIN
      ========================== */}

      <Container
        maxWidth="xs"
        className="!flex !flex-col !items-center !pt-8 !pb-16"
      >

        {/* ==================================================
            STEP 1 - EMAIL
        ================================================== */}

        {step === "email" && (
          <>

            <Typography
              variant="h4"
              className="!mb-1 !text-center !font-extrabold !text-gray-900"
            >
              Forgot Password?
            </Typography>

            <Typography className="!mb-8 !text-center !text-[14px] !text-gray-500">
              No worries, enter your email below and
              we'll send you a verification code to
              reset it.
            </Typography>

            <Box
              component="form"
              onSubmit={handleEmailSubmit}
              className="w-full"
            >

              <Typography className="!mb-1.5 !text-[13px] !font-medium !text-gray-700">
                Email
              </Typography>

              <TextField
                fullWidth
                type="email"
                size="small"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (emailError) {
                    setEmailError("");
                  }
                }}
                error={Boolean(
                  emailError
                )}
                helperText={
                  emailError || " "
                }
                slotProps={{
                  input: {
                    className:
                      "!rounded-md !bg-white",
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!mt-3 !rounded-md !bg-blue-600 !py-3 !text-[14px] !font-semibold !capitalize !shadow-none hover:!bg-blue-700"
              >
                Send Verification Code
              </Button>

              <Box className="mt-6 flex justify-center">

                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-[13px] font-medium text-blue-600 no-underline hover:underline"
                >
                  <IoArrowBack />

                  Back to Sign In
                </Link>

              </Box>

            </Box>

          </>
        )}

        {/* ==================================================
            STEP 2 - OTP
        ================================================== */}

        {step === "otp" && (
          <>

            <Box className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">

              <HiOutlineShieldCheck className="!text-[26px] !text-blue-600" />

            </Box>

            <Typography
              variant="h4"
              className="!mb-1 !text-center !font-extrabold !text-gray-900"
            >
              Verify Your Email
            </Typography>

            <Typography className="!mb-8 !text-center !text-[14px] !leading-relaxed !text-gray-500">

              Enter the 6-digit code we sent to{" "}

              <span className="font-semibold text-gray-800">
                {email}
              </span>

            </Typography>

            <Box
              component="form"
              onSubmit={handleOtpSubmit}
              className="w-full"
            >

              <Box className="mb-1 flex justify-between gap-2">

                {otp.map(
                  (digit, index) => (
                    <TextField
                      key={index}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(
                          index,
                          e.target.value
                        )
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(
                          index,
                          e
                        )
                      }
                      onPaste={
                        handleOtpPaste
                      }
                      error={Boolean(
                        otpError
                      )}
                      inputRef={(el) => {
                        inputRefs.current[
                          index
                        ] = el;
                      }}
                      slotProps={{
                        htmlInput: {
                          maxLength: 1,
                          inputMode:
                            "numeric",
                          pattern:
                            "[0-9]*",
                          className:
                            "!h-[52px] !w-full !p-0 !text-center !text-[20px] !font-semibold",
                        },
                      }}
                      sx={{
                        width: 48,
                      }}
                    />
                  )
                )}

              </Box>

              <Typography
                className={`!mb-4 !min-h-[18px] !text-[12px] ${
                  otpError
                    ? "!text-red-600"
                    : "!text-transparent"
                }`}
              >
                {otpError ||
                  "placeholder"}
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!rounded-md !bg-blue-600 !py-3 !text-[14px] !font-semibold !capitalize !shadow-none hover:!bg-blue-700"
              >
                Verify Code
              </Button>

              <Box className="mt-5 flex justify-center gap-1.5">

                <Typography className="!text-[13px] !text-gray-500">
                  Didn't receive the
                  code?
                </Typography>

                {resendTimer > 0 ? (

                  <Typography className="!text-[13px] !text-gray-400">
                    Resend in{" "}
                    {resendTimer}s
                  </Typography>

                ) : (

                  <button
                    type="button"
                    onClick={
                      handleResend
                    }
                    className="border-0 bg-transparent p-0 text-[13px] font-medium text-blue-600 hover:underline"
                  >
                    Resend Code
                  </button>

                )}

              </Box>

              <Box className="mt-4 flex justify-center">

                <button
                  type="button"
                  onClick={() =>
                    setStep("email")
                  }
                  className="flex items-center gap-1.5 border-0 bg-transparent p-0 text-[13px] font-medium text-blue-600 hover:underline"
                >
                  <IoArrowBack />

                  Use a Different Email
                </button>

              </Box>

            </Box>

          </>
        )}

        {/* ==================================================
            STEP 3 - RESET PASSWORD
        ================================================== */}

        {step === "reset" && (
          <>

            <Box className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">

              <HiOutlineShieldCheck className="!text-[26px] !text-blue-600" />

            </Box>

            <Typography
              variant="h4"
              className="!mb-1 !text-center !font-extrabold !text-gray-900"
            >
              Create New Password
            </Typography>

            <Typography className="!mb-8 !text-center !text-[14px] !leading-relaxed !text-gray-500">
              Create a strong new password for
              your account.
            </Typography>

            <Box
              component="form"
              onSubmit={
                handleResetPassword
              }
              className="w-full"
            >

              {/* New Password */}

              <Typography className="!mb-1.5 !text-[13px] !font-medium !text-gray-700">
                New Password
              </Typography>

              <TextField
                fullWidth
                size="small"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(
                    e.target.value
                  );

                  if (
                    passwordError
                  ) {
                    setPasswordError("");
                  }
                }}
                error={Boolean(
                  passwordError
                )}
                helperText={
                  passwordError ||
                  "At least 8 characters"
                }
                slotProps={{
                  input: {
                    className:
                      "!rounded-md !bg-white",

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword(
                              (prev) =>
                                !prev
                            )
                          }
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Confirm Password */}

              <Typography className="!mb-1.5 !mt-3 !text-[13px] !font-medium !text-gray-700">
                Confirm Password
              </Typography>

              <TextField
                fullWidth
                size="small"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(
                    e.target.value
                  );

                  if (
                    confirmPasswordError
                  ) {
                    setConfirmPasswordError(
                      ""
                    );
                  }
                }}
                error={Boolean(
                  confirmPasswordError
                )}
                helperText={
                  confirmPasswordError ||
                  " "
                }
                slotProps={{
                  input: {
                    className:
                      "!rounded-md !bg-white",

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(
                              (prev) =>
                                !prev
                            )
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* Submit */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="!mt-4 !rounded-md !bg-blue-600 !py-3 !text-[14px] !font-semibold !capitalize !shadow-none hover:!bg-blue-700"
              >
                Change Password
              </Button>

              <Box className="mt-5 flex justify-center">

                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-[13px] font-medium text-blue-600 no-underline hover:underline"
                >
                  <IoArrowBack />

                  Back to Sign In
                </Link>

              </Box>

            </Box>

          </>
        )}

        {/* ==================================================
            STEP 4 - SUCCESS
        ================================================== */}

        {step === "success" && (
          <Box className="flex flex-col items-center text-center">

            <Box className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">

              <HiOutlineMailOpen className="!text-[28px] !text-blue-600" />

            </Box>

            <Typography
              variant="h5"
              className="!mb-2 !font-extrabold !text-gray-900"
            >
              Password Changed
            </Typography>

            <Typography className="!mb-8 !text-[14px] !leading-relaxed !text-gray-500">
              Your password has been changed
              successfully. You can now sign
              in with your new password.
            </Typography>

            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-md bg-blue-600 py-3 text-[14px] font-semibold text-white no-underline hover:bg-blue-700"
            >
              Go to Sign In
            </Link>

          </Box>
        )}

      </Container>

    </Box>
  );
};

export default ForgotPassword;