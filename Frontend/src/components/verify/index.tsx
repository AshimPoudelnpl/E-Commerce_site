import React, { useState, useContext, useCallback } from "react";
import verifyImg from "../../assets/verify.png";
import OTPBox from "../OTPBox";
import { postData } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(MyContext);

  const email =
    location.state?.email || localStorage.getItem("userEmail") || "";
  const isForgotPassword = location.state?.isForgotPassword || false;

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const triggerVerify = useCallback((otpValue: string) => { // eslint-disable-line
    if (!otpValue || otpValue.length < 6 || isLoading) {
      return;
    }

    setIsLoading(true);

    const endpoint = isForgotPassword
      ? "/api/user/verify-forgot-password-otp"
      : "/api/user/verify-email";

    postData(endpoint, {
      email: email,
      otp: otpValue,
      code: otpValue,
    })
      .then((res) => {
        console.log("Verify OTP response:", res);
        if (res?.success || res?.error !== true) {
          context.alertBox({
            type: "success",
            msg: res?.message || "OTP verified successfully",
          });
          if (isForgotPassword) {
            navigate("/reset-password", { state: { email } });
          } else {
            navigate("/login");
          }
        } else {
          context.alertBox({
            type: "error",
            msg: res?.message || "Invalid OTP code",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Verify error:", err);
        context.alertBox({
          type: "error",
          msg: err?.message || "Failed to verify OTP",
        });
        setIsLoading(false);
      });
  }, [email, isForgotPassword, isLoading, navigate, context]);

  const verifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      context.alertBox({
        type: "error",
        msg: "Please enter all 6 digits of OTP",
      });
      return;
    }
    triggerVerify(otp);
  };

  return (
    <section className="section py-6 md:py-10 px-3">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-4 sm:p-5 px-4 sm:px-10">
          <img src={verifyImg} alt="verify" className="w-[100px] sm:w-[125px] mx-auto" />
          <h3 className="text-center text-[18px] p-2 sm:p-4 font-bold">Verify OTP</h3>
          {email && (
            <p className="text-center text-gray-500 text-xs sm:text-sm mb-4">
              Enter the 6-digit verification code sent to <b>{email}</b>
            </p>
          )}
          <form onSubmit={verifyOTP}>
            <OTPBox length={6} onChange={handleOtpChange} />
            <Button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className={`w-full !text-white font-bold mt-4 !py-2.5 flex items-center justify-center gap-2 ${
                otp.length === 6 ? "!bg-[#ff5252]" : "!bg-gray-400"
              }`}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
