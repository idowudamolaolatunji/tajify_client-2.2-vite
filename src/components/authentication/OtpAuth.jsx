import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import otpVerificationImg from "../../assets/images/pngs/otp-verification.png";
import MainSpinner from "../MainSpinner";
import OtpInput from "react-otp-input";
import { HOST_URL } from "../../assets/js/help_func";
import Alert from "../Alert";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const customStyles = {
  background: "none", 
  position: 'fixed',
};

const OtpAuth = ({ isOpen, onClose, email }) => {
  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  
  function handleError(mess) {
		setIsError(true);
		setMessage(mess);
		setTimeout(() => {
			setIsError(false);
			setMessage("");
		}, 2000);
	}

	function handleReset() {
		setIsError(false);
		setIsSuccess(false);
		setMessage("");
	}

  // Function to handle OTP input changes
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  // Function to handle OTP resend
  const handleResendOTP = async () => {
    try {
      handleReset();
      setIsLoading(true);

      const res = await fetch(`${HOST_URL()}/users/request-otp`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email }),
      });

      if(!res.ok) throw new Error('Error Sending OTP');

      const data = await res.json();
      if(data.status !== 'success') {
        throw new Error(data.message);
      }

      setIsSuccess(true);
      setMessage(data.message)
			setTimeout(() => {
        setIsSuccess(false);
				setMessage("");
			}, 1000);

    } catch (err) {
      handleError(err.message)
    } finally {
      setIsLoading(false)
    }
  };

  const handleVerifyOtp = async () => {
    try {
      handleReset();
      setIsLoading(true);
      const otpCode = parseInt(otp);

      const res = await fetch(`${HOST_URL()}/users/verify-otp`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, otp:otpCode }),
      });

      if(!res.ok) throw new Error('Error Verifying OTP');

      const data = await res.json();
      if(data.status !== 'success') {
        throw new Error(data.message);
      }

      setIsSuccess(true);
      setMessage(data.message)
			setTimeout(() => {
        setIsSuccess(false);
				setMessage("");
        navigate("/login"); 
			}, 2000);

    } catch (err) {
      handleError(err.message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
    { isLoading && <MainSpinner />}
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
              <button className="resend" onClick={handleResendOTP}>
                Resend code
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>

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

export default OtpAuth;
