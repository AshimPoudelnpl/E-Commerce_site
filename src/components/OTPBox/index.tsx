import React, { useRef, useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const OTPBox = ({length,onChange}) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const context = useContext(MyContext);
    const navigate = useNavigate();

    // Countdown timer
    useEffect(() => {
        if (timer === 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pasted)) return;
        const newOtp = [...otp];
        pasted.split("").forEach((char, i) => { newOtp[i] = char; });
        setOtp(newOtp);
        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleSubmit = () => {
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            context.error("Please enter all 6 digits");
            return;
        }
        context.success("OTP Verified Successfully!");
        setTimeout(() => navigate("/forgot-password"), 1500);
    };

    const handleResend = () => {
        setOtp(["", "", "", "", "", ""]);
        setTimer(30);
        setCanResend(false);
        inputRefs.current[0]?.focus();
        context.success("OTP resent to your email!");
    };

    const isComplete = otp.every((d) => d !== "");

    return (
        <div className="flex flex-col items-center gap-6 py-4">
            {/* Subtitle */}
            <p className="text-center text-[13px] text-gray-500 leading-relaxed">
                We've sent a 6-digit OTP to your email address.<br />
                Please enter it below to verify.
            </p>

            {/* OTP Inputs */}
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        style={{
                            width: "48px",
                            height: "52px",
                            border: digit ? "2px solid #ff5252" : "2px solid #e0e0e0",
                            borderRadius: "10px",
                            textAlign: "center",
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#333",
                            outline: "none",
                            background: digit ? "#fff5f5" : "#fafafa",
                            transition: "all 0.2s ease",
                            boxShadow: digit ? "0 2px 8px rgba(255,82,82,0.15)" : "none",
                        }}
                        onFocus={(e) => {
                            e.target.style.border = "2px solid #ff5252";
                            e.target.style.boxShadow = "0 0 0 3px rgba(255,82,82,0.15)";
                        }}
                        onBlur={(e) => {
                            if (!digit) {
                                e.target.style.border = "2px solid #e0e0e0";
                                e.target.style.boxShadow = "none";
                            }
                        }}
                    />
                ))}
            </div>

            {/* Timer / Resend */}
            <div className="text-center text-[13px] text-gray-500">
                {canResend ? (
                    <span>
                        Didn't receive it?{" "}
                        <button
                            onClick={handleResend}
                            className="text-[#ff5252] font-[600] cursor-pointer underline bg-transparent border-none"
                        >
                            Resend OTP
                        </button>
                    </span>
                ) : (
                    <span>
                        Resend OTP in{" "}
                        <span className="text-[#ff5252] font-[700]">00:{String(timer).padStart(2, "0")}</span>
                    </span>
                )}
            </div>

            {/* Verify Button */}
            <Button
                onClick={handleSubmit}
                disabled={!isComplete}
                className="w-full !py-3 !text-[15px] !font-bold !rounded-lg !text-white !normal-case"
                style={{
                    background: isComplete
                        ? "linear-gradient(135deg, #ff5252, #ff1744)"
                        : "#e0e0e0",
                    color: isComplete ? "#fff" : "#aaa",
                    boxShadow: isComplete ? "0 4px 15px rgba(255,82,82,0.4)" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                Verify OTP
            </Button>

            {/* Back to login */}
            <button
                onClick={() => navigate("/login")}
                className="text-[13px] text-gray-400 hover:text-[#ff5252] cursor-pointer bg-transparent border-none transition-colors"
            >
                ← Back to Login
            </button>
        </div>
    );
};

export default OTPBox;