import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { UserTreeNodesContextProvider } from "./context/userTreeNodesContext";
import { ModalsStateContextProvider } from "./context/modalsStateContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ModalsStateContextProvider>
      <UserTreeNodesContextProvider>
        <App />
      </UserTreeNodesContextProvider>
    </ModalsStateContextProvider>
  </React.StrictMode>
);
