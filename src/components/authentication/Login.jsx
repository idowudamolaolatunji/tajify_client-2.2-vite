import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import axios from "../../Api/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../../index.css";
import "./auth.css";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { HiOutlineKey } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Image1 from "../../assets/images/pngs/login-slide-img-1.png";
import Image2 from "../../assets/images/pngs/login-slide-img-2.png";
import Image3 from "../../assets/images/pngs/login-slide-img-3.png";
// import Loader from "../Loader";
import LoaderSpinner from "../LoaderSpinner";
import Loader from "../Loader";
import { HOST_URL } from "../../assets/js/help_func";

// const LOGIN_URL = "https://api.tajify.com/api/users/login";
// const LOGIN_URL = "http://localhost:3005/api/users/login";

const Login = () => {
  const { user, handleChange } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errors, setErrors] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();
      setLoading(true);
      setErrMsg(""); // Reset error message

      // const res = await fetch(`${HOST_URL}/users/login`, {
      const res = await fetch(`http://localhost:3005/api/users/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if(!res.ok) {
        throw new Error("Something went wrong!")
      }

      const data = await res.json();
      if(data.status !== 'success') {
        throw new Error(data.message);
      }

      toast.success("Login Success!");
      handleChange(data.data.user, data.data.token);

    } catch(err) {
      setErrMsg(err.message);
      toast.error(err.message);
      setErrors(err.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="login__section">
      <div className="login__container login">
        <div className="auth">
          <h3 className="auth__heading">Log in</h3>
          <div className="auth__head">
            <div className="auth__head--card">
              <FcGoogle />
              <p>Connect with Google</p>
            </div>
            <div className="auth__head--card">
              <SiFacebook style={{ color: "#4267B2" }} />
              <p>Connect with Facebook</p>
            </div>
          </div>

          <span className="auth__mid login__mid">
            <p> or </p>
          </span>

          <form
            className="login__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form__item">
              <AiOutlineMail className="input__icon" />
              <input
                type="email"
                className="form__input"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form__item">
              <HiOutlineKey className="input__icon" />
              <input
                type={showPassword ? "text" : "password"}
                className="form__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaRegEye
                  onClick={togglePasswordVisibility}
                  className="password__icon"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={togglePasswordVisibility}
                  className="password__icon"
                />
              )}
            </div>
            <div className="form__flex">
              <input type="checkbox" className="form__checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="form__label">
                Remember me
              </label>
              <a href="#" className="form__link">
                forgot password?
              </a>
            </div>
            {/* {loading ? (
              <div className="loader__container">
                <LoaderSpinner />
                <Loader /> 
              </div>
            ) : (
              <div className="form__item">
                <button className="form__submit">Login</button>
              </div>
            )} */}
            <div className="form__item">
              <button className="form__submit">Login</button>
            </div>
            {errMsg && <p className="error">{errMsg}</p>}
            <span className="form__extra">
              New to Tajify? <Link to="/signup">Create Account</Link>
            </span>
          </form>
        </div>
        <div className="login__slide">
          <img src={Image1} alt="login slides" className="login__image" />
        </div>
        {loading && (
          <div className="loader__container">
            <LoaderSpinner />
            {/* <Loader /> */}

          </div>
        )}
      </div>
    </section>
    
  );
};

export default Login;
