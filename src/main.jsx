import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter, BrowserRouter } from 'react-router-dom'

const isGitHubPages = window.location.hostname === 'som3-1.github.io'
const Router = isGitHubPages ? HashRouter : BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
