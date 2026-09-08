import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../utils/api";
import { MyContext } from "../context/MyContext";
import { signInWithGoogle } from "../firebase/config";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.success && res.user) {
        localStorage.setItem("token", res.token || "google-token");
        localStorage.setItem("userEmail", res.user.email);
        localStorage.setItem("userName", res.user.name);
        if (res.user.uid) {
          localStorage.setItem("userUid", res.user.uid);
        }
        if (res.user.avatar) {
          localStorage.setItem("userAvatar", res.user.avatar);
        }
        context.setUser({
          uid: res.user.uid,
          name: res.user.name,
          email: res.user.email,
          avatar: res.user.avatar,
        });
        context.setIsLogin(true);
        context.alertBox({ type: "success", msg: `Welcome ${res.user.name}!` });
        navigate("/");
      } else {
        context.alertBox({ type: "error", msg: res.message || "Google sign-in failed" });
      }
    } catch (err: any) {
      context.alertBox({ type: "error", msg: err?.message || "Google sign-in failed" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formFields.email === "") {
      context.alertBox({ type: "error", msg: "Please enter your email" });
      return;
    }
    if (formFields.password === "") {
      context.alertBox({ type: "error", msg: "Please enter your password" });
      return;
    }

    setIsLoading(true);
    postData("/api/user/login", formFields)
      .then((res) => {
        console.log(res);
        if (res?.success === true) {
          setIsLoading(false);
          context.alertBox({ type: "success", msg: res?.message });
          localStorage.setItem("token", res?.data?.accessToken);
          localStorage.setItem("userEmail", formFields.email);
          setFormFields({ email: "", password: "" });
          navigate("/");
        } else {
          context.alertBox({ type: "error", msg: res?.message });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <section className="section py-6 md:py-10 px-3">
      <div className="container">
        <div className="card shadow-md w-full max-w-[500px] m-auto rounded-md bg-white p-4 sm:p-5 px-4 sm:px-10">
          <h3 className="text-center text-[18px] p-2 sm:p-4 font-bold">
            Login to your account
          </h3>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email ID *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="password"
                label="Password *"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
              <Button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black opacity-75"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </div>

            <span
              onClick={forgotPassword}
              className="link cursor-pointer text-[14px] font-[600]"
            >
              Forgot Password ?
            </span>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={isLoading}
                className={`btn-org btn-lg w-full font-bold !text-white flex items-center justify-center gap-2 ${
                  isLoading ? "!bg-gray-500" : "!bg-[#ff5252]"
                }`}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={22} color="inherit" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            <p className="text-center py-2">
              Not Registered?{" "}
              <Link className="link text-[14px] font-[600]" to="/sign-in">
                Sign Up
              </Link>
            </p>

            <p className="text-center font-[500] py-2">
              Or continue with social account
            </p>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="flex items-center justify-center gap-3 w-full text-[15px] sm:text-[16px] !bg-[#f1f1f1] hover:!bg-[#e5e5e5] btn-lg !text-black !font-semibold transition-all py-2.5 rounded-md"
            >
              {isGoogleLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <FcGoogle className="text-[22px]" />
                  <span>Login with Google</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
