import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://3308ecf1b4894f58aa5eb9ed2b102b50@o0.ingest.sentry.io/0",
  integrations: [new BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

reportWebVitals();
