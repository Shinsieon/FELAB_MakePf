import { useNavigate } from "react-router-dom";
import axios from "axios";
import configData from "./config.json";
import { setAccessToken, setRefreshToken, setUserInfo } from "./Cookie";
import fetchApi from "./httpFetch";

const { Kakao } = window;

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  let params = new URL(document.location.toString()).searchParams;
  let code = params.get("code");
  let grant_type = "authorization_code";
  let client_id = configData.KAKAO_APIKEY;
  let redirectUri = configData.LOCAL_IP + ":3000/login/oauth";
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
      console.log(res);
      Kakao.Auth.setAccessToken(res.data.access_token);
      Kakao.API.request({
        url: "/v2/user/me",
        success: async (response: any) => {
          console.log("kakao success");
          console.log(response);
          let result = await fetchApi("loginWithKakao", "POST", {
            userInfo: response,
          });
          if (!result.success && result.errCode === 500) {
            //no user, redirect to register
            alert("회원가입으로 이동합니다.");
            navigate("/login", { state: { isRegister: true } });
          } else {
            setUserInfo(result.userInfo);
            setAccessToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            navigate("/home");
          }
        },
        fail: (error: any) => {
          console.log("this is for test commit");
        },
      });
    });
  return <div></div>;
};

export default KakaoRedirectHandler;
