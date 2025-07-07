import React, { Fragment, useEffect, useState } from 'react'
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import { adminRoutes } from '../../../Router/routes';
import { validationSchema } from "../../../validation/changePassword.validation";
import FormInput from '../../../Components/FormInput'
import { changePasswordApiCall } from '../../../services/auth/auth.services';
import { toast } from 'react-toastify';


export default function Content(props) {
    const [loadForm, setLoadForm] = useState(true)


    let navigate = useNavigate();





    const handleSubmit = (values, actions) => {
  
        actions.setSubmitting(true)
        changePasswordApiCall(values.current_password, values.new_password).then(response => {
            navigate(adminRoutes.home.path)
            toast.success(response.data.message)
        }).catch(error => {
            toast.error(error.response.data.message)

        })
        actions.setSubmitting(false)
    }

    const onCancel = () => {

        navigate(adminRoutes.home.path)
    }
    return (
        <div className="content-wrapper px-2">
            {/* Content Header (Page header) */}
            <div className="content-header px-0">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col">
                            <h1 className="m-0">{props.name}</h1>
                        </div>{/* /.col */}

                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <div className='container-fluid'>
                <div className='row'>


                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            current_password: "",
                            new_password: "",
                            retype_new_password: ""
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
                            <div className='container-fluid'>

                                <div className='card  border-0 shadow-lg innerCard'>
                                    <div className="row">
                                        <div className="col-xxl-5 col-lg-8 col-md-10">
                                            <div className="form-group pb-1 mb-0">
                                                <div className="row align-items-start">
                                                    <div className="col-4">
                                                        <label className='fs-15 fw-semibold p-0 mt-2 text-dark'>Current Password</label>
                                                    </div>
                                                    <div className="col-8">
                                                        <FormInput
                                                            name="current_password"
                                                            placeholder="Current Password"

                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.current_password}
                                                            error={errors.current_password}
                                                            touched={touched.current_password}
                                                     
                                                        />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group pb-1 mb-0">
                                                        <div className="row align-items-start">
                                                            <div className="col-4">
                                                                <label className='fs-15 fw-semibold p-0 mt-2 text-dark'>New Password</label>
                                                            </div>
                                                            <div className="col-8">
     
                                                                <FormInput
                                                                    name="new_password"
                                                                    placeholder="New Password"
     
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.new_password}
                                                                    error={errors.new_password}
                                                                    touched={touched.new_password}
                                                                
                                                                />

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group pb-1 mb-0">
                                                        <div className="row align-items-start">
                                                            <div className="col-4">
                                                                <label className='fs-15 fw-semibold p-0 mt-2 text-dark'>Confirm New Password</label>
                                                            </div>
                                                            <div className="col-8">
        
                                                                <FormInput
                                                                    name="retype_new_password"
                                                                    placeholder="Confirm New Password"
                                                                    className="mb-0"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.retype_new_password}
                                                                    error={errors.retype_new_password}
                                                                    touched={touched.retype_new_password}
                                                       
                                                                />



                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group ">
                                                        <div className="row align-items-center justify-content-end">

                                                            <div className="col-8">
        
                                                                <button
                                                                    type="submit"
                                                                    disabled={isSubmitting}
                                                                    onClick={
                                                                        handleSubmit
                                                                    } className='btn btn-primary fw-semibold submitBtn me-3 py-2 px-3 rounded'>
                                                                    {isSubmitting && <div className='d-flex align-item-center'>
                                                                        <Spinner size={"sm"} />

                                                            </div>}
                                                            {!isSubmitting && "Update"}

                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onCancel()
                                                            }}

                                                                    className='btn btn-secondary fw-semibold cancelBtn py-2 px-3 bg-1 rounded'>
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





                </div>
            </div>

            {/* /.content */}
        </div>

    )
}
