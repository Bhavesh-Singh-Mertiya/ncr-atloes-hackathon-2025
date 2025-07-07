import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

// import './style.scss'
import Header from "../../../layouts/Header/Header";
import Sidebar from "../../../layouts/Sidebar/Sidebar";
import { adminRoutes } from "../../../Router/routes";
import { validationSchema } from "../../../validation/profile.validaiton";
import FormInput from "../../../Components/FormInput";
import {
  getAdminProfileApiCall,
  updateAdminProfileApiCall,
} from "../../../services/profile/profile.services";
import { toast } from "react-toastify";
import FileUploader from "./FileUploader";
import { uploadFileApiCall } from "../../../services/file/file.service";
import UserImage from "../../../assets/images/userimg.svg";
import InputMask from "react-input-mask";

// import './style.scss'

import "../../../assets/scss/style.scss";

const AdminProfile = () => {
  const [loadForm, setLoadForm] = useState(true);
  const [adminProfileData, setAdminProfileData] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    getAdminProfileApiCall().then((response) => {
      console.log(response.data);
      setAdminProfileData(response.data);
      setLoadForm(false);
    });
  }, []);

  const handleSubmit = (values, actions) => {
    values.firstName = values.firstName.trim();
    values.lastName = values.lastName.trim();
    actions.setSubmitting(true);

    updateAdminProfileApiCall(values)
      .then((response) => {
        actions.setSubmitting(false);
        localStorage.setItem("admin-imageUrl", values?.image?.url);
        localStorage.setItem("admin-firstName", values?.firstName);
        localStorage.setItem("admin-lastName", values?.lastName);
        toast.success("Profile updated successfully.");
        navigate(adminRoutes.home.path);
      })
      .catch((error) => {
        actions.setSubmitting(false);
        toast.error(error.response.data.message);
      });
  };

  const onCancel = () => {
    navigate(adminRoutes.home.path);
  };
  return (
    <div className="content-wrapper px-2">
      {/* Content Header (Page header) */}
      <div className="content-header px-0">
        <div className="container-fluid ">
          <div className="row  align-items-center g-0">
            <div className="col-6">
              <h1 className="m-0 fw-semibold ">Admin Profile</h1>
            </div>
            {/* /.col */}
            <div className="col-6 text-end">
              <button
                onClick={() => {
                  navigate(adminRoutes.changePassword.path);
                }}
                className="btn btn-primary fs-13 fw-semibold rounded"
              >
                Change Password
              </button>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>

      {/* /.content-header */}
      {/* Main content */}
      <div className="container-fluid">
        <div className="row">
          {!loadForm && (
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                firstName:
                  adminProfileData && adminProfileData?.user_info?.firstName,
                lastName:
                  adminProfileData && adminProfileData?.user_info?.lastName,
                email: adminProfileData && adminProfileData.email,
                phoneNumber:
                  adminProfileData && adminProfileData?.user_info?.phoneNumber,
                image: adminProfileData && adminProfileData?.user_info?.image,
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
                <div className="col-12 px-3">
                  <div className="card  border-0 shadow-lg innerCard ">
                    <div className="row">
                      <div className="col-xxl-5 col-lg-8 col-md-10">
                        <div className="form-group pb-1 mb-0">
                          <div className="row align-items-start">
                            <div className="col-4">
                              <label className="fs-15 fw-semibold p-0 mt-2 text-dark">
                                First Name{" "}
                                <small className="text-danger ">*</small>
                              </label>
                            </div>
                            <div className="col-8">
                              <FormInput
                                name="firstName"
                                placeholder="Enter Your First Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                error={errors.firstName}
                                touched={touched.firstName}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group pb-1 mb-0">
                          <div className="row align-items-start">
                            <div className="col-4">
                              <label className="fs-15 fw-semibold p-0 mt-2 text-dark">
                                Last Name{" "}
                                <small className="text-danger ">*</small>
                              </label>
                            </div>
                            <div className="col-8">
                              <FormInput
                                name="lastName"
                                placeholder="Enter Your Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                error={errors.lastName}
                                touched={touched.lastName}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group pb-1 mb-0">
                          <div className="row align-items-start">
                            <div className="col-4">
                              <label className="fs-15 fw-semibold p-0 mt-2 text-dark">
                                Email <small className="text-danger ">*</small>
                              </label>
                            </div>
                            <div className="col-8">
                              <FormInput
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group pb-1 mb-0">
                          <div className="row align-items-start">
                            <div className="col-4">
                              <label className="fs-15 fw-semibold p-0 mt-2 text-dark">
                                Phone Number{" "}
                                <small className="text-danger ">*</small>
                              </label>
                            </div>
                            <div className="col-8 mb-3">
                              {/* <FormInput
                                name="phoneNumber"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                                error={errors.phoneNumber}
                                touched={touched.phoneNumber}
                       
                              /> */}
                              <InputMask
                                mask="99 99999-9999"
                                value={values.phoneNumber}
                                className={`form-control ${
                                  touched.phoneNumber && errors.phoneNumber
                                    ? "is-invalid"
                                    : null
                                } `}
                                placeholder="Phone Number"
                                //   onChange={(e) => handleInput(e)}
                                onChange={(event) => {
                                  // console.log(e);
                                  setFieldValue(
                                    "phoneNumber",
                                    event.target.value
                                  );
                                }}
                                maskChar={null}
                              />
                              {touched.phoneNumber && errors.phoneNumber && (
                                <p class="fs-11 text-danger pt-1 mb-0">
                                  {errors.phoneNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="form-group pb-1 mb-0">
                          <div className="row align-items-start">
                            <div className="col-4">
                              <label className="fs-15 fw-semibold p-0 mt-2 text-dark">
                                Upload Image
                              </label>
                            </div>
                            <div className="col-8">
                              <div className="row g-3">
                                <div className="col-auto">
                                  <div className="imgbox rounded overflow-hidden">
                                    <img
                                      src={
                                        values.image?.url
                                          ? values.image?.url
                                          : UserImage
                                      }
                                      width="90px"
                                      height="90px"
                                      alt="Profile Image"
                                    />
                                  </div>
                                </div>

                                <div className="col-auto">
                                  {/* <button className='btn fs-15 text-default fw-normal btn-outline-dark'>Change Picture</button> */}
                                  <FileUploader
                                    onChange={(files) => {
                                      const formData = new FormData();
                                      formData.append("files", files[0]);
                                      uploadFileApiCall(formData).then(
                                        (response) => {
                                          console.log(response);

                                          setFieldValue(
                                            "image",
                                            response.data.images[0]
                                          );
                                        }
                                      );
                                      // console.log(files)
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-4 pt-2">
                          <div className="row align-items-center justify-content-end">
                            <div className="col-8">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className="btn btn-primary submitBtn me-3 py-2 px-4 rounded"
                              >
                                {isSubmitting && (
                                  <div className="align-item-center d-flex justify-content-center">
                                    <Spinner size={"sm"} />
                                  </div>
                                )}
                                {!isSubmitting && "Update"}
                              </button>
                              <button
                                onClick={() => {
                                  onCancel();
                                }}
                                className="btn btn-secondary cancelBtn py-2 px-4 rounded fw-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
