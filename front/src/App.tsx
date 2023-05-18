import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Components/Home";
import Login from "./Login";
import KakaoRedirectHandler from "./KakaoRedirectHandler";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configData from "../src/config.json";
import { getCookieToken } from "./Cookie";
import { setRefreshToken } from "./Cookie";
import { useDispatch } from "react-redux";
import { authChanger } from "./Store";
import fetchApi from "./httpFetch";
import { getUserInfo } from "./Cookie";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(configData.KAKAO_APIKEY);
    const userToken = getCookieToken();
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
        fail: (error: any) => {
          console.log("fail!!!!!");
          console.log(getUserInfo());
          fetchApi("availableCheck", "POST", {
            email: getUserInfo().email,
            refreshToken: userToken, //accesstoken
          }).then((response) => {
            console.log(response.data);
            if (response.data) {
              setRefreshToken(response.data.refreshToken);
              dispatch({
                type: authChanger.SET_TOKEN,
                payload: response.data.accessToken,
              });
              navigate("/home");
            } else {
              navigate("/login");
            }
          });
        },
      });
    } catch (err) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="absolute cover w-screen h-screen bg-white font-sm">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      </Routes>
    </div>
  );
}

export default App;
