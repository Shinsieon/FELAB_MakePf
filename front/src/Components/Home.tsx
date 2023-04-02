import { useMediaQuery } from "react-responsive";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { connect } from "react-redux";
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
function Home({ currentScr }: { currentScr: JSX.Element }) {
  console.log(currentScr);
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
          <NavBar></NavBar>
          {currentScr}
        </div>
      </Pc>
      <Mobile>
        <h1>hu</h1>
      </Mobile>
    </div>
  );
}
function mapStateToProps(state: any) {
  console.log(state);
  return { currentScr: state.scrReducer };
}
export default connect(mapStateToProps)(Home);
