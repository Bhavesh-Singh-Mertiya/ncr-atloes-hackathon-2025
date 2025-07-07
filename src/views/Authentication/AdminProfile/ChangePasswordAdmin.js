import React from "react";

import "./style.scss";
import Header from "../../../layouts/Header/Header";
import Sidebar from "../../../layouts/Sidebar/Sidebar";

import "../../../assets/scss/style.scss";

const AdminChangePassword = () => {
  return (
    <div className="content-wrapper px-2">
      {/* Content Header (Page header) */}
      <div className="content-header px-0">
        <div className="container-fluid">
          <div className="row mb-2 align-items-center g-0">
            <div className="col-sm-6">
              <h1 className="m-0 fw-semibold">Change Password</h1>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 ">
            <div className="card  border-0 shadow-lg innerCard">
              <div className="row">
                <div className="col-xxl-5 col-lg-8 col-md-10">
                  <div className="form-group pb-1">
                    <div className="row align-items-center">
                      <div className="col-4">
                        <label className="fs-15 fw-semibold p-0 m-0 text-dark">
                          Current Password
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Current Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group pb-1">
                    <div className="row align-items-center">
                      <div className="col-4">
                        <label className="fs-15 fw-semibold p-0 m-0 text-dark">
                          New Password
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group pb-1">
                    <div className="row align-items-center">
                      <div className="col-4">
                        <label className="fs-15 fw-semibold p-0 m-0 text-dark">
                          Confirm New Password
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm New Password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-4 pt-2">
                    <div className="row align-items-center justify-content-end">
                      <div className="col-8">
                        <button className="btn btn-primary fw-semibold me-3 py-2 px-3 rounded">
                          Update
                        </button>
                        <button className="btn btn-secondary fw-semibold py-2 px-3 bg-1 rounded">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChangePassword;
