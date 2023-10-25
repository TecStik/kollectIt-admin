import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import 'antd/dist/antd.css';
import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";
// material ui styles import
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007ACC", // Set your desired primary color here
    },
    // Add other palette colors if needed
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    ,
  </React.StrictMode>
);
