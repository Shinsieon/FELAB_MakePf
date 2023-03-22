import { useMediaQuery } from "react-responsive";
import NavBar2 from "./NavBar";
import Container from "./Container";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export const Mobile = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });
  return isMobile ? children : null;
};

export const Pc = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null => {
  const isPc = useMediaQuery({
    query: "(min-width:769px)",
  });
  return <>{isPc && children}</>;
};
function Home() {
  const navigate = useNavigate();
  // Kakao SDK API를 이용해 사용자 정보 획득
  try {
    let data = window.Kakao.API.request({
      url: "/v2/user/me",
    });
    console.log(data);

    if (!data) {
      //redirect to login
      navigate("/login");
    }
    // 사용자 정보 변수에 저장
  } catch (err) {
    console.log(err);
    navigate("/login");
  }
  return (
    <div>
      <Pc>
        <div>
          <NavBar2></NavBar2>
          <Container></Container>
        </div>
      </Pc>
      <Mobile>
        <h1>hu</h1>
      </Mobile>
    </div>
  );
}
export default Home;
