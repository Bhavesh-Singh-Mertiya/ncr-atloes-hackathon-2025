import React from "react";
import { useHistory, useNavigate } from "react-router-dom";

import DataTable from "./DataTable";

import { adminRoutes } from "../../../Router/routes";
import { generateCSV } from "../../../utility/common";
import { getExportUsersApiCall } from "../../../services/users/user.services";

export default function Content(props) {
  let navigate = useNavigate();

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="m-0">{props.name}</h1>
            </div>
            <div className="col-auto">
              <div className="text-end">
                <button
                  onClick={() => {
                    getExportUsersApiCall().then((response) => {
                      console.log(response);
                      generateCSV(response.data, "users");
                    });
                  }}
                  className="btn btn-primary mr-3"
                  disabled={true}
                >
                  Export
                </button>
                <button
                  onClick={() => {
                    navigate(adminRoutes.manageAddUsers.path);
                  }}
                  className="btn btn-primary"
                  disabled={true}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      {/* Main content */}
      <DataTable />
      {/* /.content */}
    </div>
  );
}
