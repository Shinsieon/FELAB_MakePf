import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Login from "./Login";
import axios, { AxiosRequestConfig } from "axios";

function App() {
  const [apiResult, setApiResult] = useState("");

  return (
    <div
      className="App"
      style={{
        position: "absolute",
        left: 0,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        fontSize: "20px",
        overflow: "hidden",
      }}
    >
      <Routes>
        <Route path="/" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
