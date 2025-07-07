import { lazy } from "react";

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";
// Admin Base Path
const basePathAdmin = process.env.REACT_APP_BASE_URL;

// ** Merge Routes
const routes = [
  {
    id: "login",
    path: "/login",
    component: lazy(() => import("../../views/Authentication/Login.jsx")),
    isPrivate: false,
  },

  {
    id: "home",
    path: "/",
    component: lazy(() => import("../../views/Home/index.js")),
    isPrivate: true,
  },

  {
    id: "changePassword",
    path: "/change-password",
    component: lazy(() =>
      import("../../views/Authentication/changePassword/index")
    ),
    isPrivate: true,
  },

  {
    id: "forgetPassword",
    path: "/forgot-password",
    component: lazy(() => import("../../views/Authentication/ForgotPassword")),
    isPrivate: false,
  },

  {
    id: "resetPassword",
    path: "/reset-password",
    component: lazy(() => import("../../views/Authentication/ResetPassword")),
    isPrivate: false,
  },

  //manage Users
  {
    id: "manageUsers",
    path: "/manage-users",
    component: lazy(() => import("../../views/ManageUsers/List")),
    isPrivate: true,
  },
  {
    id: "manageAddUser",
    path: "/manage-users/add",
    component: lazy(() => import("../../views/ManageUsers/Add")),
    isPrivate: true,
  },
  {
    id: "manageEditUser",
    path: "/manage-users/edit/:id",
    component: lazy(() => import("../../views/ManageUsers/Add")),
    isPrivate: true,
  },
  {
    id: "manageEditUser",
    path: "/manage-users/view/:id",
    component: lazy(() => import("../../views/ManageUsers/View")),
    isPrivate: true,
  },

  //Admin Profile
  {
    id: "manageTransactions",
    path: "/admin-profile",
    component: lazy(() =>
      import("../../views/Authentication/AdminProfile/Index")
    ),
    isPrivate: true,
  },
  {
    id: "notFoundWithAuth",
    path: "/*",
    component: lazy(() => import("../../views/Error/NotFound")),
    isPrivate: true,
  },
];

// Admin Routes
const adminRoutes = {
  home: {
    name: "home",
    // component: <AdminHome />,
    exact: true,
    path: `${basePathAdmin}`,
  },
  login: {
    name: "Admin Login",
    //  component: <AdminLogin />,
    path: `${basePathAdmin}/login`,
  },
  forgotPassword: {
    name: "Admin Forgot Passowrd",
    //     component: <AdminForgotPassword />,
    path: `${basePathAdmin}/forgot-password`,
  },
  resetPassword: {
    name: "Admin Reset Passowrd",
    //   component: <AdminResetPassword />,
    path: `${basePathAdmin}/reset-password`,
  },

  changePassword: {
    name: "Admin Change Password",
    // component: <AdminChangePassword />,
    path: `${basePathAdmin}/change-password`,
  },

  manageUsers: {
    id: "manageUsers",
    name: "Manage Users",
    //component: <ManageUsersList />,
    path: `${basePathAdmin}/manage-users`,
  },
  manageViewUser: {
    id: "manageUsers",
    name: "Manage Users",
    //component: <ManageUserView />,
    path: `${basePathAdmin}/manage-users/view`,
  },

  manageAddUsers: {
    id: "manageUsers",
    name: "Manage Users",
    //component: <ManageUsersAdd />,
    path: `${basePathAdmin}/manage-users/add`,
  },

  manageEditUsers: {
    id: "manageUsers",
    name: "Manage Users",
    //   component: <ManageUsersAdd />,
    path: `${basePathAdmin}/manage-users/edit`,
  },

  adminProfile: {
    name: "Admin Profile",
    //  component: <AdminProfile />,
    path: `${basePathAdmin}/admin-profile`,
  },
};

export { adminRoutes, DefaultRoute, routes, TemplateTitle };
