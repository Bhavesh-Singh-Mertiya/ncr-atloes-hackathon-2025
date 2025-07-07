import React, { useState } from "react";
import "./style.scss";
import { adminRoutes } from "../../Router/routes";
// import { logoutApiCall } from '../../services/admin/auth.services';
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { logoutApiCall } from "../../services/auth/auth.services";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigator = useNavigate();

  const firstName = localStorage.getItem("admin-firstName");
  const lastName = localStorage.getItem("admin-lastName");
  const imageUrl = localStorage.getItem("admin-imageUrl");

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <nav className="align-items-center navbar-expand main-header navbar navbar-dark position-sticky top-0">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="align-items-center d-inline-flex nav-item">
            <a
              className="align-items-center d-inline-flex mx-1 nav-link px-3 text-white"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fa-bars fas fs-17" />
            </a>
          </li>
          <li className="align-items-center d-inline-flex d-lg-none nav-item">
            <a
              href={adminRoutes.home.path}
              className="text-decoration-none text-center"
            >
              <img
                src={""}
                alt="Admin Logo"
                className="img-fluid"
                width="143px"
                height="26"
              />
            </a>
          </li>
          {/* <li className="nav-item d-none d-sm-inline-block">
                        <a href={adminadminRoutes.login.path} className="nav-link">Logout</a>
                    </li> */}
        </ul>
        {/* Right navbar links */}

        <ul className="navbar-nav ml-auto">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
              <div className="align-items-center d-inline-flex dropdown-toggle fs-14 fw-semibold nav-link px-3  text-white">
                <img
                  className=" mr-1 mr-md-2 rounded-circle userImg"
                  src={imageUrl ? imageUrl : "https://dummyimage.com/40"}
                  alt="Mark Bosten"
                  width="40"
                  height="40"
                />
                <span className="d-md-block d-none ml-1">
                  {firstName} {lastName}
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem> */}
              <DropdownItem
                onClick={() => {
                  navigator(adminRoutes.adminProfile.path);
                }}
              >
                Profile
              </DropdownItem>
              {/* <DropdownItem divider /> */}
              <DropdownItem
                onClick={() => {
                  navigator(adminRoutes.changePassword.path);
                }}
              >
                Change Password
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  logoutApiCall();
                  navigator(adminRoutes.login.path);
                }}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <li className="nav-item dropdown d-inline-flex">
                        <a className="align-items-center d-inline-flex dropdown-toggle fs-14 fw-semibold nav-link px-3  text-white" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="img-fluid mr-1 mr-md-2 rounded-circle userImg" src="https://dummyimage.com/40" alt="Mark Bosten" width="40" height="40" />
                            <span className="d-md-block d-none ml-1">Mark Bosten</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><a className="dropdown-item" href="#">Change Password</a></li>
                            <li><a className="dropdown-item" onClick={() => {
                                // logoutApiCall().then(response => {
                                //     localStorage.clear();
                                //     navigator(adminRoutes.login.path)
                                // })
                            }} >Logout</a></li>
                        </ul>
                    </li> */}
        </ul>
      </nav>
    </>
  );
}

export default Header;
