import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getUserApiCall } from "../../../services/users/user.services";
import moment from "moment";
import UserImage from "../../../assets/images/userimg.svg";

export default function Content(props) {
  const [loadForm, setLoadForm] = useState(true);
  const [user, setUser] = useState("");
  let { id } = useParams();

  useEffect(() => {
    getUserApiCall(id).then((response) => {
      setUser(response.data);
      setLoadForm(false);
    });
  }, []);

  return (
    <div className="content-wrapper px-2">
      {/* Content Header (Page header) */}
      <div className="content-header px-0">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="m-0">{props.name}</h1>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}

      {!loadForm && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card innerCard p-4 p-sm-5 shadow-lg border-0">
                <div class="row">
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-2 profileimgCover">
                        <div className="profileimg border overflow-hidden mb-lg-0 mb-3">
                          <img
                            src={
                              user.user_info?.image?.url
                                ? user.user_info?.image?.url
                                : UserImage
                            }
                            alt="Profile Image"
                            className="img-fluid w-100 h-100"
                          />
                        </div>
                      </div>

                      <div className="col-lg-10 profileimgContent">
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              First Name
                            </label>
                          </div>
                          <div className="col-md-3">
                            <span className="fs-15">
                              {user.user_info?.firstName}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              Last Name
                            </label>
                          </div>
                          <div className="col-md-9">
                            <span className="fs-15">
                              {" "}
                              {user.user_info?.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              Email
                            </label>
                          </div>
                          <div className="col-md-9">
                            <span className="fs-15"> {user.email}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              Bookings
                            </label>
                          </div>
                          <div className="col-md-9">
                            <span className="fs-15">0</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              Listings
                            </label>
                          </div>
                          <div className="col-md-9">
                            <span className="fs-15">{user.spots.length}</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              CPF / CNPJ#
                            </label>
                          </div>
                          <div className="col-md-9">
                            <span className="fs-15">
                              {user.user_info?.cpfNumber}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-md-3">
                            <label className="fs-15 fw-semibold mb-0">
                              Registration Date
                            </label>
                          </div>
                          <div className="col-md-9">
                            <span className="fs-15">
                              {moment(user.created_on).format("YYYY-MM-DD")}
                            </span>
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
      )}

      {/* /.content */}
    </div>
  );
}
