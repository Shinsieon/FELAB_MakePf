import { useMediaQuery } from "react-responsive";
import React from "react";
import NavBar from "./NavBar";

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
    <div style={{ padding: "4rem 3rem" }}>
      <Pc>
        <div>
          <NavBar></NavBar>
          <div
            className="Container"
            style={{
              position: "absolute",
              backgroundColor: "#fff5ea",
              width: "80%",
              height: "85vh",
              left: "18%",
              borderRadius: "4rem",
            }}
          ></div>
        </div>
      </Pc>
      <Mobile>
        <h1></h1>
      </Mobile>
    </div>
  );
}
export default Home;
