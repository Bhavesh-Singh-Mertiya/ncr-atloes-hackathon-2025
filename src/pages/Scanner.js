import React from "react";
import QRCode from "react-qr-code";

const Scanner = () => {
  const feedbackURL = "http://localhost:3000/feedback"; // Use your actual URL here

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#111",
        flexDirection: "column",
        fontFamily: "monospace",
        color: "#0f0",
      }}
    >
      <div className="text-center mb-4">
        <h1 style={{ color: "#0f0", fontSize: "2rem" }}>Welcome to ATM</h1>
        <p>Please scan the QR code to provide feedback</p>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#222",
          borderRadius: "12px",
          boxShadow: "0 0 20px #0f0",
        }}
      >
        <QRCode value={feedbackURL} size={200} />
      </div>

      <div className="mt-4 text-center">
        <p className="text-light" style={{ fontSize: "1rem" }}>
          Scan using your mobile camera
        </p>
      </div>
    </div>
  );
};

export default Scanner;
