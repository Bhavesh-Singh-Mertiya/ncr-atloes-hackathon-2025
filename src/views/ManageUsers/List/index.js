import React from "react";
import Header from "../../../layouts/Header/Header";
import Sidebar from "../../../layouts/Sidebar/Sidebar";
import Content from "./Content";

import "../../../assets/scss/list.scss";

export default function List(props) {
  return <Content name="Manage Users" {...props} />;
}
