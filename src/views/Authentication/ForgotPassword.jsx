import React, { useState } from "react";
import "./style.scss";
import { imagePath } from "../../constants/imageUrl";
import { useNavigate, Link } from "react-router-dom";
import { adminRoutes } from "../../Router/routes";
import { validation } from "../../constants/constant";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { validationSchema } from "../../validation/forgotPassword.validation";
// import ApiLoader from '../../../common/ApiLoader';

function ForgotPassword() {
  // Data
  const [email, setEmail] = useState("");

  // Validation
  const [submitted, setSubmitted] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const [loader, setLoader] = useState(false);

  const handleSubmit = (values, actions) => {};

  return (
    <div
      className="BgImage adminlogin"
      // style={{ backgroundImage: `URL(${HeroImage})` }}
    >
      {/* {loader && <ApiLoader />} */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-sm-7">
            <div className="innerbox bg-white">
              <div className="logo text-center mb-4">
                {/* <img src={} alt="" className="img-fluid" /> */}
              </div>
              <h3 className="fs-18 text-center mt-2 mb-3 pb-1 p-1 pt-3 fw-normal">
                Forgot Password
              </h3>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  email: "",
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
                  <div>
                    <div className="form-group  position-relative">
                      <label className="form-label fs-13 fw-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Address *"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {touched.email && errors.email && (
                        <p className="fs-11 text-danger pt-1">{errors.email}</p>
                      )}
                      {/* {submitted && email === "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.emptyEmailField}
                        </p>
                      )}
                      {submitted && !validEmail && email !== "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.invalidEmail}
                        </p>
                      )} */}

                      <span className="position-absolute end-0 zIndex-9 pt-2 top-0  bg-white border-start-0 formicon ">
                        {imagePath.mailIcon}
                      </span>
                    </div>
                    <div className="row align-items-center justify-content-between mt-3 pt-1">
                      <div className="col-auto">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary fw-semibold"
                        >
                          Send
                        </button>
                      </div>
                      <div className="col-auto">
                        {/* <a href="#" className='text-decoration-none text-primary'>Back to Login</a> */}
                        <Link
                          className="text-decoration-none text-primary"
                          to={adminRoutes.login.path}
                        >
                          Back to Login
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
