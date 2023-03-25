import React from "react";
import kakaoLoginIcon from "./assets/images/kakao_login_medium_narrow.png";
const { Kakao } = window;

const loginWithKakao = () => {
  console.log("kakao button pressed");
  Kakao.Auth.authorize({
    redirectUri: "http://localhost:3000/login/oauth",
    scope: "profile_nickname, account_email, profile_image, gender, age_range",
  });
};

function LoginButton() {
  return (
    <div>
      <img
        src={kakaoLoginIcon}
        style={{ cursor: "pointer" }}
        onClick={loginWithKakao}
        alt="카카오로 로그인하기!"
      ></img>
    </div>
  );
}
function LogoutButton() {
  return (
    <div>
      <button value="logout"></button>
    </div>
  );
}

function Login() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "40px",
          marginTop: "2rem",
          width: "30vw",
          height: "30vh",
          borderRadius: "1rem",
          backgroundColor: "rgba(255,255,255,0.4)",
          zIndex: 3,
        }}
      >
        <h1>Manage your Portfolio</h1>
        <LoginButton></LoginButton>

        <p style={{ fontSize: "0.7rem" }}>
          최초 회원가입 시 이용약관, 개인정보처리방침에 동의하게 됩니다.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          width: "20rem",
          height: "20rem",
          top: "20vh",
          left: "50%",
          backgroundColor: "rgba(255,192,203,0.3)",
          borderRadius: "20rem",
          filter: "blur(10px)",
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "30rem",
          height: "30rem",
          top: "30vh",
          left: "25%",
          backgroundColor: "rgba(0,0,255,0.3)",
          borderRadius: "20rem",
          filter: "blur(10px)",
          zIndex: 2,
        }}
      ></div>
    </div>
  );
}

export default Login;
