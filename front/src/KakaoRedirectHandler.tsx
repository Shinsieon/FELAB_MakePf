import React, { useEffect } from "react";
import axios from "axios";

const { Kakao } = window;
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const KakaoRedirectHandler = () => {
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
        fetch("http://localhost:8000/kakaoLoginDone", {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify("asd"),
        })
          .then((result) => console.log("success====:", result))
          .catch((error) => console.log("error============:", error));
      });
  }, []);
  return <div>login완료!</div>;
};

export default KakaoRedirectHandler;
