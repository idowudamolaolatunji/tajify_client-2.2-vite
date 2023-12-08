
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useNavigate } from "react-router-dom";

import "../../index.css";
import "./auth.css";
import { HiOutlineKey } from "react-icons/hi";
import { BiSolidUser } from "react-icons/bi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import SignupImg from "../../assets/images/pngs/signup-img.png";
import { Link } from "react-router-dom";
import LoaderSpinner from "../LoaderSpinner";
import { useAuthContext } from "../../context/AuthContext";
import { HOST_URL } from "../../assets/js/help_func";
// import Loader from "../Loader";

import OtpAuth from './OtpAuth';
import Alert from "../Alert";
import MainSpinner from "../MainSpinner";

// const REGISTER_URL = "https://api.tajify.com/api/users/signup";
// const REGISTER_URL = "http://localhost:3005/api/users/signup";

const Register = () => {
  const navigate = useNavigate();
  // const { user, handleChange } = useAuthContext();
  const { user } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [check, setCheck] = useState(true)
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false);
  };


  function handleError(mess) {
		setIsError(true);
		setMessage(mess);
		setTimeout(() => {
			setIsError(false);
			setMessage("");
		}, 2000);
	}

	function handleReset() {
    setCheck(true)
		setIsError(false);
		setIsSuccess(false);
		setMessage("");
	}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      handleReset();

      if(email === '' || password === '' || username === "" || passwordConfirm === "" || !check) throw new Error('All fields are required!');
      
      const res = await fetch( HOST_URL() + "/users/signup", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, passwordConfirm }),
        }
      );

      if(!res.ok) {
        throw new Error("Something went wrong!")
      }

      const data = await res.json();
      if(data.status !== 'success') {
        throw new Error(data.message);
      }

      setIsSuccess(true);
      setMessage(data.message || 'Signup Successful. Verify OTP Code')
			setTimeout(() => {
        setIsSuccess(false);
				setMessage("");
        setShowOtpModal(true);
			}, 1000);
      // navigate("/verify-otp");

    } catch (err) {
      handleError(err.message)
    } finally {
      setLoading(false)
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <>
    {loading && <MainSpinner />}
    <section className="signup__section">
      <div className="signup__container signup">
          <div className="signup__images--box">
            <img src={SignupImg} alt="signup image" />
          </div>
          <div className="auth">
            <h3 className="auth__heading">Register</h3>
            <div className="auth__head">
              <div className="auth__head--card">
                <FcGoogle />
                <p>Connect with Google</p>
              </div>
            </div>

            <span className="auth__mid">
              <p> or register with email </p>
            </span>

            <form
              className="login__form"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="form__item">
                <BiSolidUser className="input__icon" />
                <input
                  type="text"
                  className="form__input"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  className="form__input"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
              <div className="form__item">
                <HiOutlineKey className="input__icon" />
                <input
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  className="form__input"
                  placeholder="Confirm Password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  required
                  // aria-invalid={validMatch ? "false" : "true"}
                  // aria-describedby="confirmnote"
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
                <input type="checkbox" className="form__check-box" checked={true} id="check" onChange={(e) => setCheck((prev) => !prev)} />
                <label htmlFor="checkbox" className="form__label">
                  I agree to the{" "}
                  <a href="#" className="form__link">
                    Terms </a> &
                  <a href="#" className="form__link">
                    Privacy policy</a>.
                </label>
              </div>
              <span className="form__extra">
              Already have an account? <Link to="/login">Login</Link>
            </span>

              {loading ? (
                <div className="loader__container">
                <LoaderSpinner />

                </div>
              ) : (
                <div className="form__item">
                  <button className="form__submit button">
                    Create Account
                  </button>
                </div>
              )}
            </form>
          </div>
      </div>
    </section>

    {showOtpModal && <OtpAuth
      isOpen={showOtpModal}
      email={email} 
      onClose={() => setShowOtpModal(false)} />
    } 

      <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
      {isSuccess ? (
        <AiFillCheckCircle className="alert--icon" />
      ) : isError ? (
        <AiFillExclamationCircle className="alert--icon" />
      ) : (
        ""
      )}
      <p>{message}</p>
      </Alert>

    </>
  );
};

export default Register;






