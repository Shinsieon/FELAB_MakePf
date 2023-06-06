import React, { useRef, useCallback, Ref } from "react";
import { useState, useEffect } from "react";

import manImage from "../assets/images/man.png";
import womanImage from "../assets/images/woman.png";
import notification from "../assets/images/notification.png";
import dropdown from "../assets/images/down-arrow.png";
import "react-dropdown/style.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { getUserInfo } from "../Cookie";
import fetchApi from "../httpFetch";
import { removeCookieToken } from "../Cookie";

function Logout({ clickHandler }: { clickHandler: Function }) {
  return (
    <div className="cursor-pointer mt-0.5">
      <RiLogoutBoxLine
        onClick={() => {
          clickHandler();
        }}
        size="20"
        color="tomato"
      ></RiLogoutBoxLine>
    </div>
  );
}
function Profile() {
  return (
    <div className="absolute flex w-200 top-5 right-10 cursor-default p-2">
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
  const profileRef = useRef(null);
  const logoutBtnRef = useRef(null);
  const handleNoti = useCallback(
    (e: any) => {
      console.log(e.target);
      if (profileRef.current && profileRef.current !== e.target) {
        if (e.target.id === "profileImg") {
          setProfileDrpShow(!profileDrpShow);
        } else setProfileDrpShow(false);
      } else if (profileRef.current && profileRef.current === e.target) {
        setProfileDrpShow(!profileDrpShow);
      }
      if (e.target === logoutBtnRef.current) {
        logoutFunc();
      }
    },
    [profileDrpShow]
  );

  const logoutFunc = () => {
    console.log(window.Kakao.Auth);
    removeCookieToken();
    window.Kakao.Auth.logout(() => {
      alert("로그아웃 되었습니다");
      localStorage.clear();
      window.location.href = "/login";
    });
  };

  useEffect(() => {
    try {
      setUserName(getUserInfo().email);
      setUserIamge(getUserInfo().image);
      setUserGender(getUserInfo().userGender);
      document.addEventListener("mousedown", handleNoti);
    } catch (e) {
      console.log("cookie is empty");
    }
    return () => {
      document.removeEventListener("mousedown", handleNoti);
    };
  }, [handleNoti]);
  return (
    <div className="relative inline-block text-left dropdown">
      <span className="rounded-md">
        <button
          className="inline-flex justify-center w-full leading-5 transition duration-150 ease-in-out rounded-md "
          ref={profileRef}
        >
          <img
            className="rounded-full w-10 h-10 mx-2 "
            src={userImage || (userGender === "M" ? manImage : womanImage)}
            alt="profile_image"
            id="profileImg"
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
            <button
              ref={logoutBtnRef}
              tabIndex={0}
              className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer"
              onClick={logoutFunc}
            >
              Logout
            </button>
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
  const [notiShow, setNotiShow] = useState(false);
  const notiRef = useRef(null);

  const handleNoti = useCallback(
    (e: any) => {
      console.log(notiShow);
      console.log(notiRef.current === e.target);
      if (notiRef.current && notiRef.current !== e.target) {
        setNotiShow(false);
      } else if (notiRef.current && notiRef.current === e.target) {
        setNotiShow(!notiShow);
      }
    },
    [notiShow]
  );

  useEffect(() => {
    const getNoti = async () => {
      let result = await fetchApi("getNoti", "GET");
      if (result.success) {
        setNoti([...result.notis]);
      }
    };
    getNoti();
  }, []);
  useEffect(() => {
    const handleNoti = (e: any) => {
      if (notiRef.current && notiRef.current !== e.target) {
        setNotiShow(false);
      } else if (notiRef.current && notiRef.current === e.target) {
        setNotiShow(!notiShow);
      }
    };
    document.addEventListener("mousedown", handleNoti);
    return () => {
      document.removeEventListener("mousedown", handleNoti);
    };
  }, [handleNoti]);

  return (
    <div>
      <img
        className="w-8 h-8 mx-2 cursor-pointer"
        src={notification}
        alt="notification"
        ref={notiRef}
      ></img>
      {noti.length > 0 ? (
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
