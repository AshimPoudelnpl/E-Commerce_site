import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useContext } from "react";
import { MyContext } from "../context/MyContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { postData } from "../utils/api";

const ResetPassword = () => {
  const [formFields, setFormFields] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("userEmail") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.password || !formFields.confirmPassword) {
      context.alertBox({ type: "error", msg: "Please fill in all fields!" });
      return;
    }
    if (formFields.password !== formFields.confirmPassword) {
      context.alertBox({ type: "error", msg: "Passwords do not match!" });
      return;
    }
    if (formFields.password.length < 6) {
      context.alertBox({ type: "error", msg: "Password must be at least 6 characters!" });
      return;
    }

    setIsLoading(true);
    postData("/api/user/reset-password", { email, newPassword: formFields.password, confirmPassword: formFields.confirmPassword })
      .then((res) => {
        if (res?.success) {
          context.alertBox({ type: "success", msg: res?.message || "Password reset successfully!" });
          navigate("/login");
        } else {
          context.alertBox({ type: "error", msg: res?.message || "Failed to reset password" });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        context.alertBox({ type: "error", msg: err?.message || "Failed to reset password" });
        setIsLoading(false);
      });
  };

  return (
    <section className="section py-6 md:py-10 px-3">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-4 sm:p-5 px-6 md:px-10">
          <div className="flex justify-center mb-2 text-[45px] text-[#ff5252]">
            <MdLockOutline />
          </div>
          <h3 className="text-center text-[18px] p-2 font-bold">Reset Password</h3>
          <p className="text-center text-[13px] text-gray-500 mb-5">
            Enter your new password below.
          </p>

          <form className="w-full mt-2" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-4">
              <TextField
                type="password"
                label="New Password *"
                variant="outlined"
                className="w-full"
                name="password"
                value={formFields.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                type="password"
                label="Confirm Password *"
                variant="outlined"
                className="w-full"
                name="confirmPassword"
                value={formFields.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={isLoading}
                className={`btn-org btn-lg w-full !text-white font-bold flex items-center justify-center gap-2 ${
                  isLoading ? "!bg-gray-500" : "!bg-[#ff5252]"
                }`}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>

            <p className="text-center py-2">
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

export default ResetPassword;
