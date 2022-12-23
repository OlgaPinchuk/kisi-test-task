import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import { GroupsProvider } from "./context/context";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <GroupsProvider>
        <App />
      </GroupsProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
