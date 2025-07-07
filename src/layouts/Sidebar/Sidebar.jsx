import React, { useState } from "react";
import { useLocation, Link, useMatch } from "react-router-dom";
import { adminRoutes } from "../../Router/routes";
import { imagePath } from "../../constants/imageUrl";
import "./style.scss";

function Sidebar() {
  const [blogCollapse, setBlogCollapse] = useState(true);
  const location = useLocation();

  // let match = useMatch({
  //   path: location.path,
  //   strict: true,
  //   sensitive: true,
  // });
  // console.log(match, "match");
  const checkActiveTab = (path) => {
    return path.path == location.pathname;
  };
  const toggle = () => {
    setBlogCollapse((prevState) => !prevState);
  };
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4 position-fixed top-0 bottom-0">
        {/* Brand Logo */}
        <Link
          to={adminRoutes.home.path}
          className="brand-link text-decoration-none text-center"
        >
          {/* <img src={""} alt="Admin" className="img-fluid" /> */}
          Admin
        </Link>
        {/* Sidebar */}
        <div className="sidebar p-0">
          {/* Sidebar Menu */}
          <nav>
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="align-items-center d-flex nav-header opacity-50 text-white">
                MAIN NAVIGATION
              </li>
              <li className="nav-item w-100">
                <Link
                  to={adminRoutes.home.path}
                  className={`${
                    useMatch({
                      path: `${adminRoutes.home.path}`,
                      exact: false,
                    })
                      ? "active"
                      : ""
                  } nav-link d-flex align-items-center rounded-0 w-100 mb-0 text-white`}
                >
                  <i className="fs-13 nav-icon text-left fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </Link>
              </li>

              <li className="nav-item w-100">
                <Link
                  // activeClassName="active"
                  to={adminRoutes.manageUsers.path}
                  className={`${
                    useMatch({
                      path: `${adminRoutes.manageUsers.path}/*`,
                      exact: false,
                    })
                      ? "active"
                      : ""
                  } nav-link d-flex align-items-center rounded-0 w-100 mb-0 text-white`}
                >
                  <i className="fs-13 nav-icon text-left fas fa-users" />
                  <p>Manage Users</p>
                </Link>
              </li>

              <li className="nav-item w-100">
                <Link
                  to={adminRoutes.adminProfile.path}
                  className={`${
                    useMatch({
                      path: `${adminRoutes.adminProfile.path}/*`,
                      exact: false,
                    })
                      ? "active"
                      : ""
                  } nav-link d-flex align-items-center rounded-0 w-100 mb-0 text-white`}
                >
                  <i className="fs-14 nav-icon text-left fas fa-user-alt" />
                  <p>Admin Profile</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  );
}

export default Sidebar;
