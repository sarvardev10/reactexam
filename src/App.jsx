import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AuthorizedRoutes } from "./router/router";

function App() {
  return (
    <>
      <h1>Hello World </h1>
      <AuthorizedRoutes />
    </>
  );
}

export default App;
