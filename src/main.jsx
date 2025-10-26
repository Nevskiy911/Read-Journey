import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./styles/_reset.scss";
import "./styles/global.scss";
import { store } from "./redux/store.js";
import { setAuthHeader } from "./api/axiosConfig.js";

const token = localStorage.getItem("token");
if (token) {
  setAuthHeader(token);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
