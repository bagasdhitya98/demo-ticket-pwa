import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const App = () => {
  axios.defaults.baseURL = "https://alpine-sumptuous-snowboard.glitch.me/";

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
