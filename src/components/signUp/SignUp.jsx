import "./SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storePass } from "../../redux/reducers/regDetailSlice";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_Url } from "../../utils/baseUrl";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navigate = useNavigate()

  const alreadySent = () =>
    toast.info("Email Id already registered", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const invalidSent = () =>
    toast.info("Please enter a valid email", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const registerSent = () =>
    toast.info("Registered Successfully", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobileNo: "",
      profilePhoto: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "Must be 15 charecters or less")
        .required("Required*"),
      email: Yup.string()
        .email("Enter a valid email Id")
        .required("Please enter your email"),
      mobileNo: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8)
        .required("Please enter your mobile Number"),
      password: Yup.string()
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("Please enter your password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Please enter your password"),
    }),

    onSubmit: (values) => {
      // console.log("sign up", values);

      axios
        .request(`${Base_Url}/api/v1/admin_register`, {
          method: "post",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          data: {
            email: values.email,
            name: values.userName,
            phone: `+91${values.mobileNo}`,
            password: values.password,
          },
        })

        .then((res) => {
          if (res.status === 201) {
            if (
              res &&
              res.data &&
              res.data.message &&
              res.data.message === "Admin Registration Successfully"
            ) {
              registerSent();
              navigate("/");
            }
          }

          // console.log("res", res);
        })

        .catch((err) => {
          if (
            err.response &&
            err.response.status === 500 &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.message.message ===
              "admin validation failed: email: Please enter a valid email"
          ) {
            // alert(" Please enter a valid email")\
            invalidSent();
          }
          else if (
            err.response &&
            err.response.status === 400 &&
            err.response.data &&
            err.response.data.message
          ) {
            // alert(err.response.data.message)
            alreadySent();
            // navigate('/')
          }
          else (
            alert("Something Went Wrong! Please Try Again")
          )
          // console.log("err", err);
        });
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {" "}
      <div>
        <form
          action=""
          className="login-loginContainer"
          id="regForm"
          onSubmit={(e) => {
            formik.handleSubmit();
            submitHandler(e);
          }}
        >
          <div className="signUp-container">
            {/* name */}
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder=" "
              className="login-input"
              autoComplete="off"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="userName" className="login-lable">
              Full Name
            </label>
            {formik.errors.userName && formik.touched.userName ? (
              <p className="error-msg">{formik.errors.userName}</p>
            ) : null}
            {/* email id */}
            <input
              type="text"
              id="email"
              name="email"
              placeholder=" "
              className="login-input"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email" className="login-lable">
              Email Id
            </label>
            {formik.errors.email && formik.touched.email ? (
              <p className="error-msg">{formik.errors.email}</p>
            ) : null}
            {/* mobile */}

            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              placeholder=" "
              className="login-input"
              autoComplete="off"
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="mobileNo" className="login-lable">
              Mobile Number
            </label>
            {formik.errors.mobileNo && formik.touched.mobileNo ? (
              <p className="error-msg">{formik.errors.mobileNo}</p>
            ) : null}
            {/* hidden */}
            <input
              type="hidden"
              name="profilePhoto"
              placeholder=" "
              className="login-input"
              value={formik.values.profilePhoto}
            />
            {/* password */}
            <input
              type="text"
              id="password"
              name="password"
              placeholder=" "
              className="login-input"
              autoComplete="off"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="password" className="login-lable">
              Password
            </label>
            {formik.errors.password && formik.touched.password ? (
              <p className="error-msg">{formik.errors.password}</p>
            ) : null}
            {/* confirmPassword */}
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              className="login-input"
              autoComplete="off"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="confirmPassword" className="login-lable">
              Confirm Password
            </label>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <p className="error-msg">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          <div>
            <div className="button-loginContainer">
              <div className="login-buttonContainer">
                <button type="submit" className="login-loginButton">
                  Register
                </button>
              </div>
            </div>
            <div className="signUp-text">
              Already have an account?&nbsp;
              <span
                className="span-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Log&nbsp;In
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
