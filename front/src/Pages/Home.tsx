import { useMediaQuery } from "react-responsive";
import NavBar from "../Components/NavBar";
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
  return { currentScr: state.scrReducer };
}
export default connect(mapStateToProps)(Home);
