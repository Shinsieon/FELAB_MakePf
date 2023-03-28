import { useMediaQuery } from "react-responsive";
import NavBar from "./NavBar";
import Container from "./Container";
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
        <div>
          <NavBar changeFunc={changeScreen}></NavBar>
          <Container screen={screen}></Container>
        </div>
      </Pc>
      <Mobile>
        <h1>hu</h1>
      </Mobile>
    </div>
  );
}
export default Home;
