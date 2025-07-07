import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "../../../Router/routes";
import {
  getUsersApiCall,
  deleteUserApiCall,
  updateUserStatusApiCall,
  getFeedbackApiCall,
} from "../../../services/users/user.services";
import messages from "../../../messages/en-base";

import Toggle from "../../../Components/Toggle";
import { caseInsensitiveSort } from "../../../utility/common";
// import "./style.scss"
// import "./style.css"

const CustomHeader = (props) => {
  return (
    <div className="data-list-header w-100 d-flex justify-content-between flex-wrap align-items-center">
      <div className="actions-left d-flex flex-wrap">
        <div className="showEntries">
          <div className="showEntriesInner">
            <span className="showText">Show</span>
            <select
              onChange={(event) => props.handleRowPerPage(event.target.value)}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="showText">Entries</span>
          </div>
        </div>
      </div>

      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2 topRight">
        <div className="searctTopSection">
          <input
            type="text"
            name="Search"
            placeholder="Search"
            value={props.searchFilter}
            onChange={(event) => props.handleSearch(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalReults, setTotalResults] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    fetchUsers({ page: currentPage, limit: rowPerPage, search: searchFilter });
  }, []);

  // useEffect(() => {
  //     handleSearch(searchFilter)
  // }, [rowPerPage])

  const fetchUsers = async (params) => {
    setLoading(true);
    getFeedbackApiCall({ ...params, search: params.search?.trim() }).then(
      (response) => {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalResults(response.data.totalResults);
        setLoading(false);
      }
    );
  };

  const columns = [
    {
      name: "S. No.",
      selector: (row, index) => (currentPage - 1) * rowPerPage + index + 1,
      maxWidth: "60px",
      minWidth: "60px",
      center: "center",
    },
    {
      name: "User Id",
      maxWidth: "80px",
      minWidth: "80px",
      selector: (row, index) => row._id,
    },
    {
      sortable: true,
      name: "Name",
      maxWidth: "14%",
      minWidth: "14%",
      selector: (row) => row?.name || "",
      sortFunction: (rowA, rowB) => {
        return caseInsensitiveSort(
          rowA.user_info?.firstName || "",
          rowB.user_info?.firstName || ""
        );
      },
    },
    {
      sortable: true,
      name: "Email",
      // minWidth: "100px",
      selector: (row) => row.email,
      sortFunction: (rowA, rowB) => {
        return caseInsensitiveSort(rowA.email, rowB.email);
      },
    },

    {
      sortable: false,
      name: "Description",
      // maxWidth: "120px",
      minWidth: "180px",
      selector: (row) => row?.description,
    },
    {
      sortable: false,
      name: "Ratings",
      // maxWidth: "120px",
      // minWidth: "180px",
      maxWidth: "14%",
      minWidth: "14%",
      selector: (row) => row?.rating,
    },
    {
      name: "Status",
      maxWidth: "80px",
      minWidth: "80px",
      cell: (row) => (
        <>
          <Toggle
            onChange={(event) =>
              handleUpdateStatus(row.userid, {
                ...row,
                status: event.target.checked ? 1 : 0,
              })
            }
            checked={!!row.status}
            icons={false}
          />
        </>
      ),
    },
    {
      name: "Actions",
      maxWidth: "120px",
      minWidth: "120px",
      center: "center",
      cell: (row) => (
        <div className="d-flex w-100 justify-content-center">
          <i
            onClick={() => {
              handleView(row.userid);
            }}
            className="pointer-cursor fas fa-eye mx-2"
            style={{ color: "#333" }}
          />
          {/* <i
            onClick={() => {
              handleEdit(row.userid);
            }}
            className="pointer-cursor fas fa-pen mx-2"
            style={{ color: "#333" }}
          /> */}
          <i
            onClick={() => {
              handleDelete(row.userid);
            }}
            className="pointer-cursor fas fa-trash mx-2"
            style={{ color: "#333" }}
          />
        </div>
      ),
    },
  ];

  const handleUpdateStatus = (id, object) => {
    updateUserStatusApiCall(id, { status: object.status });
    const result = [...data];
    var index = _.findIndex(result, { userid: object.userid });
    result.splice(index, 1, object);
    setData(result);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserApiCall(id).then((response) => {
          Swal.fire("Deleted!", "Your user has been deleted.", "success");
          fetchUsers({ page: 1, limit: rowPerPage });
          setCurrentPage(1);
        });
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`${adminRoutes.manageEditUsers.path}/${id}`);
  };
  const handleView = (id) => {
    navigate(`${adminRoutes.manageViewUser.path}/${id}`);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    fetchUsers({
      page: page.selected + 1,
      limit: rowPerPage,
      search: searchFilter,
    });
  };

  const handleSearch = (value) => {
    setSearchFilter(value);
    fetchUsers({ page: 1, limit: rowPerPage, search: value });
    setCurrentPage(1);
  };

  const handleRowPerPage = (rowPerPage) => {
    setCurrentPage(1);
    setRowPerPage(rowPerPage);
    fetchUsers({ page: 1, limit: rowPerPage, search: searchFilter });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card px-3">
            <DataTable
              columns={columns}
              data={data}
              className="datatable"
              //  defaultSortFieldId={2}
              pagination
              paginationServer
              paginationComponent={() => (
                <div className="d-flex justify-content-between align-items-center mt-4 paging">
                  <div className="pageShowText">
                    Showing {1 + (currentPage - 1) * rowPerPage} to{" "}
                    {data.length + (currentPage - 1) * rowPerPage} of{" "}
                    {totalReults} entries
                  </div>
                  <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={currentPage - 1}
                    pageCount={totalPages}
                    onPageChange={(page) => handlePagination(page)}
                  />
                </div>
              )}
              noHeader
              subHeader
              progressPending={loading}
              // progressComponent={<CustomLoader />}
              subHeaderComponent={
                <CustomHeader
                  handleSearch={handleSearch}
                  handleRowPerPage={handleRowPerPage}
                  searchFilter={searchFilter}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
