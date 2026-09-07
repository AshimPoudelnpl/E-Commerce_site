import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { postData } from "../utils/api";

const ForgotPassword = () => {
  const [formFields, setFormFields] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formFields.email === "") {
      context.alertBox({
        type: "error",
        msg: "Please enter your email address!",
      });
      return;
    }

    setIsLoading(true);
    postData("/api/user/forgot-password", { email: formFields.email })
      .then((res) => {
        console.log(res);
        if (res?.success) {
          context.alertBox({
            type: "success",
            msg: res?.message || "OTP sent to your email successfully!",
          }
        
        );
          localStorage.setItem("userEmail", formFields.email);
          navigate("/verify", {
            state: { email: formFields.email, isForgotPassword: true },
          });
        } else {
          context.alertBox({
            type: "error",
            msg: res?.message || "Failed to send reset code",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Forgot password error:", err);
        context.alertBox({
          type: "error",
          msg: err?.message || "Failed to send reset code",
        });
        setIsLoading(false);
      });
  };

  return (
    <section className="section py-6 md:py-10 px-3">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-4 sm:p-5 px-4 sm:px-10">
          <div className="flex justify-center mb-2 text-[45px] sm:text-[50px] text-[#ff5252]">
            <MdOutlineEmail />
          </div>
          <h3 className="text-center text-[18px] p-2 sm:p-4 font-bold">Forgot Password</h3>
          <p className="text-center text-[13px] text-gray-500 mb-5 leading-relaxed">
            Enter your registered email below to receive a 6-digit verification code.
          </p>

          <form className="w-full mt-2" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="forgot-email"
                label="Email Id *"
                variant="outlined"
                className="w-full"
                name="email"
                value={formFields.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={isLoading}
                className={`btn-org btn-lg w-full !bg-[#ff5252] font-bold !text-white flex items-center justify-center gap-2 ${
                  isLoading ? "!bg-gray-500" : "!bg-[#ff5252]"
                }`}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  "Send OTP"
                )}
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
