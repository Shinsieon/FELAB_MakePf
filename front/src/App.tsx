import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Login from "./Login";
import KakaoRedirectHandler from "./KakaoRedirectHandler";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as config from "../src/config.js";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(config.KAKAO_APIKEY);
    const userToken = localStorage.getItem("access_token");
    if (!userToken) {
      navigate("/login");
    }
    try {
      //window.Kakao.Auth.setAccessToken(userToken);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (response: any) => {
          navigate("/home");
        },
        fail: (error: any) => {
          navigate("/login");
        },
      });
    } catch (err) {
      navigate("/login");
    }
  }, []);

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
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      </Routes>
    </div>
  );
}

export default App;
