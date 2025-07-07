import React, { Component, Suspense } from "react";
import Router from "./Router/Router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { AuthProvider } from "./context/authentication";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App d-flex flex-column minHeight100">
      <Suspense fallback={() => <h1>Loading....</h1>}>
        <BrowserRouter>
          {/* <AuthProvider> */}
          <Router />
          {/* </AuthProvider> */}
          <ToastContainer />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
