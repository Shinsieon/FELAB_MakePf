import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import KakaoRedirectHandler from "./KakaoRedirectHandler";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configData from "./config.json";
import { getRefreshToken } from "./Cookie";
import { getUserInfo } from "./Cookie";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(configData.KAKAO_APIKEY);
    const userToken = getRefreshToken() && getUserInfo();

    try {
      //window.Kakao.Auth.setAccessToken(userToken);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (response: any) => {
          if (!userToken) navigate("/login");
          else navigate("/home");
        },
        fail: (response: any) => {
          if (!userToken) {
            navigate("/login");
          } else navigate("/home");
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
