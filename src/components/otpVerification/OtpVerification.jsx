import "./OtpVerification.css";
// import OTPInput, { ResendOTP } from 'otp-input-react'
import OTPInput from "otp-input-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showNewPW } from "../../redux/reducers/showNewPW";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_Url } from "../../utils/baseUrl";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");

  const EmailIdEntered = useSelector((state) => state.emailSend.emailId);

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    // console.log('EmailIdEntered', EmailIdEntered)
    // console.log('otp', otp)

    axios(`${Base_Url}/api/v1/verify_otp`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      data: {
        // email: EmailIdEntered,
        otp: otp,
      },
    })
      .then((res) => {
        if (res) {
          // alert('valid otp')
          toast.success("OTP Verification successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          // alert(res.data)
          console.log("res.dataotp", res);
          dispatch(showNewPW(true));
          navigate("/newPassword");
          // if (res.status === 200) {
          //   dispatch(showNewPW(true));
          //   navigate("/newPassword");
          // }
        }
      })
      .catch((err) => {
        // alert(
        //   err &&
        //     err.response &&
        //     err.response.data &&
        //     err.response.data.Error &&
        //     err.response.data.Error,
        // )
        toast.error("Wrong OTP", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const resendOtp = (e) => {
    e.preventDefault();
    // console.log('resend', EmailIdEntered)
    axios(`${Base_Url}/api/v1/send_otp`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      data: {
        email: EmailIdEntered,
      },
    })
      .then((res) => {
        toast.info("OTP Valid for 2 Mins", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        if (res) {
          // alert('otp sent')
          // alert(res.data.message)

          console.log("sent otp message", res.data);

          // if (res.status === 200) {
          // }
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong! Please Try Again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        console.log("otp verification error", err);
      });
  };

  return (
    <div>
      {" "}
      <div className="otpVerifivation-container">
        <div className="otp-verification">Verification</div>
        <div className="otp-verifyText">
          Please fill in the verification code that has
          <br /> been sent to your Email ID.
        </div>
      </div>
      <form
        action=""
        className="otp-formController"
        onSubmit={(e) => {
          otpSubmitHandler(e);
        }}
      >
        <div className="otp-otpContainer">
          <OTPInput
            value={otp}
            // onChange={(e) => setOTP(e.target.value)}
            onChange={setOTP}
            name="OTP"
            autoFocus
            OTPLength={4}
            otpType="number"
            disabled={false}
            autoComplete="off"
            inputStyles={{
              borderBottom: "1px solid #072D5B",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              width: "2.7rem",
            }}
          />
        </div>
        <div className="otp-resendCode">
          Didn’t receive a code?{" "}
          <span
            className="otp-resend"
            onClick={(e) => {
              resendOtp(e);
            }}
          >
            Resend
          </span>
        </div>
        <button type="submit" className="otp-verifyButton">
          Verify
        </button>
      </form>
      {/* <div>
        <ResendOTP onResendClick={() => console.log('Resend clicked')} />
      </div> */}
    </div>
  );
};

export default OtpVerification;
