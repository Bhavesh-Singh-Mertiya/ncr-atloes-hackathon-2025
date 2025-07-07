import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../layouts/Header/Header";
import Sidebar from "../../../layouts/Sidebar/Sidebar";
import Content from "./Content";
import "../../../assets/scss/style.scss";

export default function AddCategory() {
  let { id } = useParams();
  return <Content name="User Details" />;
}
