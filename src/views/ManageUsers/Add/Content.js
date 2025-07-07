import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import UserImage from "../../../assets/images/userimg.svg";

import { adminRoutes } from "../../../Router/routes";
import { validationSchema } from "../../../validation/user.validation";
import FormInput from "../../../Components/FormInput";
import {
  addUserApiCall,
  getUserApiCall,
  updateUserApiCall,
} from "../../../services/users/user.services";
import FileUploader from "./FileUploader";
import { uploadFileApiCall } from "../../../services/file/file.service";
import { toast } from "react-toastify";

import "../../../assets/scss/style.scss";

export default function Content(props) {
  const [loadForm, setLoadForm] = useState(true);
  const [user, setUser] = useState("");

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getUserApiCall(id).then((response) => {
        setUser(response.data);
        setLoadForm(false);
      });
    } else {
      setLoadForm(false);
    }
  }, []);

  const handleSubmit = async (values, actions) => {
    values.firstName = values.firstName.trim();
    values.lastName = values.lastName.trim();
    values.cpfNumber = values.cpfNumber.toString();
    actions.setSubmitting(true);
    if (id) {
      await updateUserApiCall(id, values)
        .then((response) => {
          navigate(adminRoutes.manageUsers.path);
          toast.success("User has been updated successfully!");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } else {
      await addUserApiCall(values)
        .then((response) => {
          navigate(adminRoutes.manageUsers.path);
          toast.success("User has been added successfully!");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
    actions.setSubmitting(false);
  };

  const onCancel = () => {
    navigate(adminRoutes.manageUsers.path);
  };

  const handleChangeName = (e) => {
    if (e.target.value.match("/^[a-zA-Z0-9._\b]+$/") != null) {
      return true;
    }
    return true;
  };
  return (
    <div className="content-wrapper px-2">
      {/* Content Header (Page header) */}
      <div className="content-header px-0">
        <div className="container-fluid ">
          <div className="row align-items-center g-0">
            <div className="col">
              <h1 className="m-0 fw-semibold">{props.name}</h1>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="container-fluid ">
        <div className="row">
          {!loadForm && (
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                status: user ? user.status : 1,
                image: user ? user.user_info?.image : "",
                lastName: user ? user.user_info?.lastName : "",
                cpfNumber: user ? user.user_info?.cpfNumber : "",
                firstName: user ? user.user_info?.firstName : "",
                companyName: user ? user.user_info?.companyName : "",
                country_code: user ? user.user_info?.companyName : "",
                dateOfBirth: user ? user.user_info?.dateOfBirth : "",
                hearAboutUs: user ? user.user_info?.hearAboutUs : "",
                knowSource: user ? user.user_info?.knowSource : "",
                phone_number: user ? user.user_info?.phone_number : "",
                email: user ? user.email : "",
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
                <div className="container-fluid">
                  <div className="card innerCard  shadow-lg border-0">
                    <div className="row">
                      <div className="col-xxl-8 col-lg-10 col-md-12">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label mt-2 fs-15 fw-semibold">
                              First Name{" "}
                              <small className="text-danger ">* </small>
                            </label>
                          </div>
                          <div className="col-xl-5 col-md-6">
                            <FormInput
                              name="firstName"
                              placeholder="First Name"
                              onChange={(e) => {
                                if (handleChangeName(e)) {
                                  handleChange(e);
                                }
                              }}
                              onBlur={handleBlur}
                              value={values.firstName}
                              error={errors.firstName}
                              touched={touched.firstName}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label mt-2 fs-15 fw-semibold">
                              Last Name{" "}
                              <small className="text-danger ">* </small>
                            </label>
                          </div>
                          <div className="col-xl-5 col-md-6">
                            <FormInput
                              name="lastName"
                              placeholder="Last Name"
                              onChange={(e) => {
                                if (handleChangeName(e)) {
                                  handleChange(e);
                                }
                              }}
                              onBlur={handleBlur}
                              value={values.lastName}
                              error={errors.lastName}
                              touched={touched.lastName}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label mt-2 fs-15 fw-semibold">
                              Email <small className="text-danger ">* </small>
                            </label>
                          </div>
                          <div className="col-xl-5 col-md-6">
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

                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label mt-2 fs-15 fw-semibold">
                              CPF / CNPJ#{" "}
                              <small className="text-danger ">* </small>
                            </label>
                          </div>
                          <div className="col-xl-5 col-md-6">
                            <FormInput
                              name="cpfNumber"
                              placeholder="CPF / CNPJ#"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.cpfNumber}
                              error={errors.cpfNumber}
                              touched={touched.cpfNumber}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              type="text"
                              onKeyDown={(evt) => {
                                console.log(evt.key);
                                return (
                                  (evt.key === "e" && evt.preventDefault()) ||
                                  (evt.key === "." && evt.preventDefault()) ||
                                  (evt.key === "-" && evt.preventDefault()) ||
                                  (evt.key === "+" && evt.preventDefault())
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="row my-2">
                          <div className="col-md-3">
                            <label className="form-label mt-0 fs-15 fw-semibold">
                              Status
                            </label>
                          </div>
                          <div className="col-md-9 align-items-center d-flex">
                            <div className="d-flex radioSection">
                              <div className="form-check me-4">
                                <input
                                  onClick={() => {
                                    setFieldValue("status", 1);
                                  }}
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  checked={values.status == 1}
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  Enable
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  onClick={() => {
                                    setFieldValue("status", 0);
                                  }}
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  checked={values.status == 0}
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  Disable
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="form-group pb-1">
                            <div className="row align-items-start">
                              <div className="col-md-3">
                                <label className="fs-15 fw-semibold p-0 m-0 text-dark">
                                  Upload Image
                                </label>
                              </div>
                              <div className="col-xl-5 col-md-6">
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

                          <div className="offset-md-3  col-md-9 mb-5 pt-1">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              onClick={handleSubmit}
                              className="btn btn-primary submitBtn mr-3 px-3 rounded py-2"
                            >
                              {isSubmitting && (
                                <div className="align-item-center d-flex justify-content-center">
                                  <Spinner size={"sm"} />
                                </div>
                              )}
                              {!isSubmitting && "Submit"}
                            </button>
                            <button
                              onClick={() => {
                                onCancel();
                              }}
                              className="btn btn-secondary cancelBtn px-3 rounded py-2"
                            >
                              Cancel
                            </button>
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

      {/* /.content */}
    </div>
  );
}
