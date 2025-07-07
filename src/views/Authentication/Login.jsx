import React, { useState, useEffect } from "react";
import "./style.scss";
import ClientCaptcha from "react-client-captcha";
import "react-client-captcha/dist/index.css";
import { imagePath } from "../../constants/imageUrl";
// import HeroImage from "../../assets/images/adminbg.png";
// import CaptchaChange from "../../assets/images/captchachange.png";
import { adminRoutes } from "../../Router/routes";

// import CaptchaImage from "../../../assets/images/captcha.png"
import { validation } from "../../constants/constant";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import { routes } from "../../Router/routes";
import { loginApiCall } from "../../services/auth/auth.services";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { validationSchema } from "../../validation/login.validation";
// import ApiLoader from '../../../common/ApiLoader'

function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  // data
  const [data, setData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  // remember me
  const rememberMeEmail = cookies.get("admin_email");
  const rememberMePassword = cookies.get("admin_password");
  const alreadyChecked = cookies.get("admin_checked");
  const [rememberMe, setRemembeMe] = useState(!!alreadyChecked);

  // Validations
  const [submitted, setSubmitted] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [captchaCode, setCaptchaCode] = useState("");
  const [validCaptcha, setValidCaptcha] = useState(true);
  const [credentialError, setCredentialError] = useState("");

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (rememberMeEmail && rememberMePassword) {
      setData((data) => ({ ...data, email: rememberMeEmail }));
      setData((data) => ({ ...data, password: rememberMePassword }));
    }
  }, []);

  const handleSubmit = (values, actions) => {
    // console.log(data.password)
    setLoader(true);

    navigate(adminRoutes.home.path);
    setLoader(false);
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
            <div className="innerbox bg-white">
              <div className="logo text-center mb-4">
                {/* <img src={""} alt="" className="img-fluid" /> */}
              </div>

              <h3 className="fs-18 text-center mt-2 mb-3 pb-1 p-1 fw-normal pt-3">
                Sign in
              </h3>

              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  email: "",
                  password: "",
                  captcha: "",
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
                        Email address
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Address *"
                        //value={data.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />

                      <span className="position-absolute end-0 zIndex-9   pt-2 top-0  bg-white border-start-0 formicon bg-transparent ">
                        {imagePath.mailIcon}
                      </span>
                      {touched.email && errors.email && (
                        <p className="fs-11 text-danger pt-1">{errors.email}</p>
                      )}
                      {/* {submitted && data.email === "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.emptyEmailField}
                        </p>
                      )}
                      {submitted && !validEmail && data.email !== "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.invalidEmail}
                        </p>
                      )} */}
                    </div>

                    <div className="form-group position-relative">
                      <label className="form-label fs-13 fw-semibold mb-1">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter Password *"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <span className="position-absolute end-0 zIndex-9   pt-2 top-0  bg-white border-start-0 formicon bg-transparent">
                        {imagePath.lockIcon}
                      </span>
                      {touched.password && errors.password && (
                        <p className="fs-11 text-danger pt-1">
                          {errors.password}
                        </p>
                      )}
                      {/* {submitted && data.password === "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.emptyPasswordField}
                        </p>
                      )}
                      {submitted && !validPassword && data.password !== "" && (
                        <p className="fs-11 text-danger pt-1">
                          {validation.invalidPassword}
                        </p>
                      )} */}
                    </div>

                    <label className="form-label fs-13 fw-semibold mb-1">
                      Security Code
                    </label>
                    <div className="row g-0 ">
                      <div className="col-7">
                        <input
                          name="captcha"
                          type="text"
                          className="form-control"
                          placeholder="Enter Security Code *"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.captcha}
                        />
                        {touched.captcha && errors.captcha && (
                          <p className="fs-11 text-danger pt-1">
                            {errors.captcha}
                          </p>
                        )}
                        {/* {submitted && data.captcha === "" && (
                          <p className="fs-11 text-danger pt-1">
                            {validation.captchaRequired}
                          </p>
                        )}
                        {submitted && data.captcha !== "" && !validCaptcha && (
                          <p className="fs-11 text-danger pt-1">
                            Captcha is Invalid
                          </p>
                        )} */}
                      </div>
                      <div className="col-5 ps-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <ClientCaptcha
                            captchaCode={setCaptchaCode}
                            // retryIcon={CaptchaChange}
                            // retryIconSize={24}
                            // retryButtonClassName=""
                            retryImgClassName="cptimg"
                          />
                          {/* <img src={CaptchaImage} alt="" /> */}
                          {/* <a href="#">
                                  {imagePath.repeatIcon}
                                </a> */}
                        </div>
                      </div>
                    </div>

                    <div className="form-check mt-3 pt-1 position-relative">
                      <label className="form-check-label fs-13 d-flex align-items-center ms-2 ps-1">
                        <input
                          className="form-check-input start-0 ms-0"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRemembeMe(e.target.checked)}
                        />
                        Remember Me
                      </label>
                    </div>

                    <div className="row align-items-center justify-content-between mt-3 pt-2">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-primary fw-semibold py-2"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                      <div className="col-auto">
                        {/* <a href="#" className='text-decoration-none text-primary'>Forgot Password?</a> */}
                        <Link
                          className="text-decoration-none text-primary"
                          to={adminRoutes.forgotPassword.path}
                        >
                          Forgot Password?
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

export default Login;
