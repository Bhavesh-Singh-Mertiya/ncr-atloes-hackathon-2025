import React, { useState } from "react";
import "./style.scss";
// import Logo from "../../assets/images/logo.svg";
import { imagePath } from "../../constants/imageUrl";
// import HeroImage from "../../assets/images/adminbg.png";
import { validation } from "../../constants/constant";
import { useNavigate } from "react-router-dom";
// import ApiLoader from '../../common/ApiLoader'
import { resetPasswordApiCall } from "../../services/auth/auth.services";
import { useLocation } from "react-router-dom";
import { adminRoutes } from "../../Router/routes";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { Formik } from "formik";
import { validationSchema } from "../../validation/resetPassword.validation";

const ResetPassword = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const search = useLocation().search;
  const key = new URLSearchParams(search).get("key");
  const email = new URLSearchParams(search).get("email");

  // data
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation
  const [submitted, setSubmitted] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (values, actions) => {
    // e.preventDefault();
    // setSubmitted(true);

    // let error = false;
    // if (password === "" || confirmPassword === "") error = true;
    // if (password !== "") {
    //   if (
    //     !new RegExp(
    //       /(?=^.{8,32}$)(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9](?=.*[-+_!@#$%^&*., ?])/g
    //     ).test(password)
    //   ) {
    //     setValidPassword(false);
    //     error = true;
    //   } else {
    //     setValidPassword(true);
    //   }
    // }
    // if (password !== confirmPassword) error = true;
    // if (error) return;

    //setLoader(true);
    // console.log(password);
    // console.log(confirmPassword);

    resetPasswordApiCall(email, key, values.password).then(
      (resp) => {
        setLoader(false);
        const res = resp?.data;
        if (res?.status === 200) {
          cookies.remove("admin_password");
          toast.success(res?.message);
          setSubmitted(false);
          navigate(adminRoutes.login.path);
        }
      },
      (error) => {
        setLoader(false);
        const err = error?.response?.data;
        if (err?.status === 400) {
          toast.error(err?.message);
        }
      }
    );
  };

  return (
    <div
      className="BgImage adminlogin"
      // style={{ backgroundImage: `URL(${HeroImage})` }}
    >
      {/* {loader && <ApiLoader />} */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-sm-7">
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                status,
              }) => (
                <div className="innerbox bg-white">
                  <div className="logo text-center mb-4">
                    {/* <img src={Logo} alt="" className="img-fluid" /> */}
                  </div>
                  <h3 className="fs-18 text-center mt-2 mb-3 pb-1 p-1 fw-normal pt-3">
                    Reset Password
                  </h3>
                  <div>
                    <div className="form-group  position-relative">
                      <label className="form-label fs-13 fw-semibold mb-1">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter Passoword *"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <span className="position-absolute end-0 zIndex-9 pt-2  top-0  bg-white border-start-0 formicon">
                        {imagePath.lockIcon}
                      </span>
                      {touched.password && errors.password && (
                        <p className="fs-11 text-danger pt-1">
                          {errors.password}
                        </p>
                      )}
                      {/* {submitted && password === "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.emptyPasswordField}
                        </p>
                      )}
                      {submitted && !validPassword && password !== "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.invalidPassword}
                        </p>
                      )} */}
                    </div>
                    <div className="form-group  position-relative">
                      <label className="form-label fs-13 fw-semibold mb-1">
                        Confirm Password
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm Passoword *"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />

                      <span className="position-absolute end-0 zIndex-9 pt-2  top-0  bg-white border-start-0 formicon">
                        {imagePath.lockIcon}
                      </span>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <p className="fs-11 text-danger pt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                      {/* {submitted && confirmPassword === "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.emptyConfirmPasswordField}
                        </p>
                      )}
                      {submitted &&
                        password !== confirmPassword &&
                        confirmPassword !== "" && (
                          <p className="fs-11 text-danger pt-1">
                            {validation.confirmPasswordNotMatched}
                          </p>
                        )} */}
                    </div>

                    <div className="row align-items-center justify-content-between mt-3 pt-1">
                      <div className="col-auto">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary fw-semibold"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
