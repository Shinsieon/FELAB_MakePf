import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    let client_id = "999489b616f1e164fe961a7a3a7ca257";
    let redirectUri = "http://localhost:3000/login/oauth";
    console.log(code);
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
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
        api
          .post("/kakaoLoginDone", {
            accessToken: res.data.access_token,
          })
          .then((res) => {
            window.Kakao.init(client_id);
            window.Kakao.Auth.setAccessToken(res.data.access_token);
            navigate("./Components/Home.tsx");
          });
      });
  }, []);
  return <div></div>;
};

export default KakaoRedirectHandler;
