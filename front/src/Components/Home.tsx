import { useMediaQuery } from "react-responsive";
import React from "react";
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";
import Container from "./Container";
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
