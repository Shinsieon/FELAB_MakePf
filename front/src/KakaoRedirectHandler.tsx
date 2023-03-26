import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { KAKAO_APIKEY } from "../src/config";

const { Kakao } = window;
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = KAKAO_APIKEY;
    let redirectUri = "http://localhost:3000/login/oauth";
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirectUri}&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset = utf-8",
          },
        }
      )
      .then((res) => {
        Kakao.Auth.setAccessToken(res.data.access_token);
        Kakao.API.request({
          url: "/v2/user/me",
          success: (response: any) => {
            console.log(response);
            localStorage.setItem("userName", response.properties.nickname);
            localStorage.setItem(
              "userImage",
              response.properties.profile_image
            );
            localStorage.setItem("userMail", response.kakao_account.email);
            api
              .post("/kakaoLoginDone", {
                userInfo: response,
                //accessToken: res.data.access_token,
              })
              .then((res) => {
                navigate("/home");
              });
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
        localStorage.setItem("access_token", res.data.access_token);
      });
  }, []);
  return <div></div>;
};

export default KakaoRedirectHandler;
