import { useMediaQuery } from "react-responsive";
import NavBar2 from "./NavBar";
import Container from "./Container";
import Login from "../Login";
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
  // Kakao SDK API를 이용해 사용자 정보 획득
  const [token, setToken] = useState();
  useEffect(() => {
    try {
      let data = window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log(data);
      if (!data || !data._result) setToken(data);

      if (!token) {
        //redirect to login
        return <Login />;
      }
      // 사용자 정보 변수에 저장
    } catch (err) {
      console.log(err);
      return <Login />;
    }
  }, []);

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
