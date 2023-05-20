import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Login from "./Login";
import KakaoRedirectHandler from "./KakaoRedirectHandler";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configData from "../src/config.json";
import { getRefreshToken } from "./Cookie";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(configData.KAKAO_APIKEY);
    const userToken = getRefreshToken();
    if (!userToken) {
      navigate("/login");
      return;
    }
    try {
      //window.Kakao.Auth.setAccessToken(userToken);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (response: any) => {
          navigate("/home");
        },
      });
    } catch (err) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="absolute cover w-screen h-screen bg-white font-sm">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      </Routes>
    </div>
  );
}

export default App;
