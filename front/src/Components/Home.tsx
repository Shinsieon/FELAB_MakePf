import { useMediaQuery } from "react-responsive";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import { useState } from "react";

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
  const [screen, setScreen] = useState(<Dashboard />);
  const changeScreen = (screen: JSX.Element) => {
    setScreen(screen);
  };
  return (
    <div>
      <Pc>
        <div
          style={{
            position: "absolute",
            backgroundColor: "#f2f2f2",
            width: "100%",
            height: "100%",
          }}
        >
          <NavBar changeFunc={changeScreen}></NavBar>
          {screen}
        </div>
      </Pc>
      <Mobile>
        <h1>hu</h1>
      </Mobile>
    </div>
  );
}
export default Home;
