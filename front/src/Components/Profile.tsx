import React, { useRef, useCallback } from "react";
import { useState, useEffect } from "react";

import manImage from "../assets/images/man.png";
import womanImage from "../assets/images/woman.png";
import notification from "../assets/images/notification.png";
import dropdown from "../assets/images/down-arrow.png";
import "react-dropdown/style.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { getUserInfo } from "../Cookie";
import fetchApi from "../httpFetch";

const logoutFunc = () => {
  window.Kakao.Auth.logout(() => {
    alert("로그아웃 되었습니다");
    localStorage.clear();
    window.location.href = "/home";
  });
};
function Logout() {
  return (
    <div className="cursor-pointer mt-0.5">
      <RiLogoutBoxLine
        onClick={logoutFunc}
        size="20"
        color="tomato"
      ></RiLogoutBoxLine>
    </div>
  );
}
function Profile() {
  return (
    <div className="absolute flex w-200 top-10 right-10 cursor-default p-2">
      <Noti></Noti>
      <ProfileDrpDown />
    </div>
  );
}

function ProfileDrpDown() {
  const [userEmail, setUserName] = useState("");
  const [userImage, setUserIamge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [profileDrpShow, setProfileDrpShow] = useState(false);
  const menuRef = useRef(null);
  const closeOpenMenus = useCallback((e: any) => {
    if (menuRef.current && profileDrpShow && menuRef.current !== e.target) {
      setProfileDrpShow(false);
    }
  }, []);

  useEffect(() => {
    try {
      setUserName(getUserInfo().email);
      setUserIamge(getUserInfo().image);
      setUserGender(getUserInfo().userGender);
      document.addEventListener("mousedown", closeOpenMenus);
    } catch (e) {
      console.log("cookie is empty");
    }
  }, [closeOpenMenus]);
  return (
    <div className="relative inline-block text-left dropdown">
      <span className="rounded-md">
        <button
          className="inline-flex justify-center w-full leading-5 transition duration-150 ease-in-out rounded-md "
          onClick={() => {
            setProfileDrpShow(true);
          }}
        >
          <img
            className="rounded-full w-10 h-10 mx-2 "
            src={userImage || (userGender === "M" ? manImage : womanImage)}
            alt="profile_image"
            ref={menuRef}
          ></img>
          <img className="w-5" src={dropdown} alt="dropdown" />
        </button>
      </span>
      {profileDrpShow ? (
        <div>
          <div className="absolute right-0 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
            <div className="px-4 py-3">
              <p className="text-sm leading-5">Signed in as</p>
              <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                {userEmail}
              </p>
            </div>
            <div className="py-1 flex"></div>
            <a
              tabIndex={0}
              className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
              onClick={logoutFunc}
            >
              Logout
              <Logout />
            </a>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
type Tnoti = {
  title: string;
  content: string;
};
function Noti() {
  const [noti, setNoti] = useState<Tnoti[]>([]);
  const [isNoti, setIsNoti] = useState(false);
  const [notiShow, setNotiShow] = useState(false);
  const notiRef = useRef(null);
  const closeOpenMenus = useCallback((e: any) => {
    console.log("hi");
    if (notiRef.current && notiShow && notiRef.current !== e.target) {
      setNotiShow(false);
    }
  }, []);
  const getNoti = async () => {
    let result = await fetchApi("getNoti", "GET");
    if (result.success) {
      setIsNoti(true);
      setNoti([...result.notis]);
    }
  };
  useEffect(() => {
    getNoti();
    document.addEventListener("mousedown", closeOpenMenus);
  }, [closeOpenMenus]);
  return (
    <div>
      <img
        className="w-8 h-8 mx-2 cursor-pointer"
        src={notification}
        alt="notification"
        onClick={() => {
          setNotiShow(true);
        }}
        ref={notiRef}
      ></img>
      {isNoti ? (
        <div className="absolute right-[5.5rem] top-2 bg-red-600 w-2 h-2 rounded-full"></div>
      ) : (
        <div></div>
      )}
      {notiShow ? (
        <div className="absolute right-20 w-56 mt-2 origin-top-right bg-white border rounded-md shadow-lg outline-none">
          <div className="px-4 py-3">
            {noti.map((item: Tnoti, idx) => {
              return (
                <div key={idx}>
                  <p className="text-sm">{item.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;
