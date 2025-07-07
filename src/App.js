import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import FeedbackForm from "./pages/FeedbackForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scanner />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;
