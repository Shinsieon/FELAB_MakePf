import React from "react";
import { useState, useEffect } from "react";
import Logout from "./Logout";
function Profile() {
  const [userName, setUserName] = useState("");
  const [userImage, setUserIamge] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
    setUserIamge(localStorage.getItem("userImage") || "");
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        height: "auto",
        width: "300px",
        top: "7vh",
        left: "3rem",
        cursor: "default",
        borderRadius: "1rem",
      }}
    >
      <img
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "2rem",
        }}
        src={userImage}
      ></img>
      <h3
        style={{
          fontSize: "1rem",
          margin: "5px",
          color: "#3F3035",
        }}
      >
        {userName} 님 반갑습니다
      </h3>
      <Logout></Logout>
    </div>
  );
}

export default Profile;
