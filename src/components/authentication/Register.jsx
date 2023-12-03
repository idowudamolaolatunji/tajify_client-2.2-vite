
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { useNavigate } from "react-router-dom";

import "../../index.css";
import "./auth.css";
import { HiOutlineKey } from "react-icons/hi";
import { BiSolidUser } from "react-icons/bi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import SignupImg from "../../assets/images/pngs/signup-img.png";
import { Link } from "react-router-dom";
import LoaderSpinner from "../LoaderSpinner";
import { useAuthContext } from "../../context/AuthContext";
import { HOST_URL } from "../../assets/js/help_func";
// import Loader from "../Loader";

import OtpAuth from './OtpAuth';

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
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg(""); // Reset error message

    try {
      const response = await axios.post(
        // REGISTER_URL,
        HOST_URL() + "/users/signup",
        JSON.stringify({ username, email, password, passwordConfirm }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // console.log(JSON.stringify(response.data));
      // setLoading(true);
      // handleChange(response.user, response.token);
      // setIsModalOpen(true);
      setShowOtpModal(true);
      // navigate("/verify-otp");

      // Handle success and redirection
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrMsg("Registration Failed");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="signup__section">
      <div className="signup__container signup">
          <div className="signup__images--box">
            <img src={SignupImg} alt="signup image" />
          </div>
          <div className="auth">
            {/* {loading && <LoaderSpinner />} */}
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
                <input type="checkbox" className="form__check-box" id="check" />
                <label htmlFor="checkbox" className="form__label">
                  I agree to the{" "}
                  <a href="#" className="form__link">
                    Terms{" "}
                  </a>{" "}
                  &{" "}
                  <a href="#" className="form__link">
                    Privacy policy
                  </a>
                  .
                </label>
              </div>
              <span className="form__extra">
              Already have an account? <Link to="/login">Login</Link>
            </span>

              {loading ? (
                <div className="loader__container">
                <LoaderSpinner />

                {/* <Loader /> */}
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

        {/* </div> */}
      </div>
      {/* {isModalOpen && <OtpAuth email={email} onClose={closeModal} />} */}
      {showOtpModal && <OtpAuth
      isOpen={showOtpModal}
      email={email} 
      onClose={() => setShowOtpModal(false)} />} 
    </section>
  );
};

export default Register;






