import React from "react";
import { useState, useEffect } from "react";

import manImage from "../assets/images/man.png";
import womanImage from "../assets/images/woman.png";

import { RiLogoutBoxLine } from "react-icons/ri";
import { getUserInfo } from "../Cookie";

const logoutFunc = () => {
  window.Kakao.Auth.logout(() => {
    alert("로그아웃 되었습니다");
    localStorage.clear();
    window.location.href = "/home";
  });
};
function Logout() {
  return (
    <div className="cursor-pointer mt-1">
      <RiLogoutBoxLine
        onClick={logoutFunc}
        size="20"
        color="tomato"
      ></RiLogoutBoxLine>
    </div>
  );
}
function Profile() {
  const [userName, setUserName] = useState("");
  const [userImage, setUserIamge] = useState("");
  var userGender: string = localStorage.getItem("userGender") || "";
  useEffect(() => {
    setUserName(getUserInfo().name);
    setUserIamge(getUserInfo().image);
  }, []);
  return (
    <div className="absolute flex h-10 w-200 top-10 left-10 cursor-default rounded">
      <img
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "2rem",
        }}
        src={userImage || (userGender === "M" ? manImage : womanImage)}
        alt="profile_image"
      ></img>
      <h3
        style={{
          fontSize: "1rem",
          margin: "5px",
          color: "#3F3035",
          fontWeight: "bold",
        }}
      >
        {userName} 님 반갑습니다
      </h3>
      <Logout></Logout>
    </div>
  );
}

export default Profile;
