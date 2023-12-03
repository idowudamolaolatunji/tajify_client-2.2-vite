import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import otpVerificationImg from "../../assets/images/pngs/otp-verification.png";
import axios from "axios";
import LoaderSpinner from "../LoaderSpinner";
import OtpInput from "react-otp-input";

const customStyles = {
  background: "none", // Transparent black background
};

const OtpAuth = ({ isOpen, onClose, email }) => {
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle OTP input changes
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  // Function to handle OTP resend
  const handleResendClick = () => {
    // Implement OTP resend logic (e.g., send a new OTP to the user's phone/email)
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "https://api.tajify.com/api/users/verifyOtp",
        // "http://localhost:3005/api/users/verifyOtp",
        { email, otp }
      );
      console.log(response);
      if (response.data.status) {
        setLoading(true);
        toast.success("Otp successfully verified!");
        navigate("/login"); // Replace with the desired path
        // onClose(); // Close the modal
      } else {
        // OTP is incorrect, set an error message
        toast.error("Invalid or Expired Otp");
        setLoading(false);

        setErrMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error("Error verifying OTP:", error);
      setErrMsg("An error occurred while verifying OTP.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onClose}
      contentLabel="OTP Verification Modal"
      className="react-modal"
    >
      <div className="otp__container opt">
        <div className="auth__modal modal">
          <img
            className="modal__image"
            src={otpVerificationImg}
            alt="design image"
          />
          <div className="modal__content-box">
            <h4 className="content__header">OTP Verification</h4>
            <p className="content__description">
              Enter your OTP code, sent to <br />{" "}
              <strong>your email. Please verify!</strong>
            </p>
            <div className="otp__input-box">
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={4}
                className="otp__input"
                // separator={<span>-</span>}
                isInputNum={true}
                renderSeparator={<span>-</span>}
                renderInput={(props, index) => (
                  <input
                    {...props}
                    className="rounded-lg text-5xl w-[40px]"
                    // Add a unique key to avoid React warnings
                    key={index}
                  />
                )}
              />
            </div>
            {/* {errMsg && <p className="error-message">{errMsg}</p>} */}
            <div className="modal__actions">
              <button
                className="modal__button continue"
                onClick={handleVerifyOtp}
              >
                Continue
              </button>
              <button className="resend" onClick={handleResendClick}>
                Resend code
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OtpAuth;
