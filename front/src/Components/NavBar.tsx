import { useState } from "react";
import styled from "styled-components";
import { FaDiceD6, FaChartPie } from "react-icons/fa";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";
import { connect } from "react-redux";
const StyledMenuItemLi = styled.div`
  padding-top: 14px;
  width: 100%;
  text-align: center;
  cursor: default;
  font-size: 1rem;
`;
const StyledMenuItemLiOnHover = styled.div`
  width: 80px;
  padding: 15px;
  text-align: center;
  cursor: default;
  color: white;
  font-size: 0.7rem;
  white-space: pre-wrap;
  &:hover {
    font-size: 0.75rem;
  }
`;
interface menuPropsType {
  name: string;
  icon: JSX.Element;
}
function NavBar(props: any) {
  console.log(props);
  const [onNavBarHover, setOnNavBarHover] = useState(false);

  const changeNavBar = (name: string) => {
    props.dispatch({ type: name });
  };
  let iconMap = new Map();
  iconMap.set("Dashboard", <FaDiceD6 />);
  iconMap.set("Portfolio", <FaChartPie />);
  const NavBarOnHover = () => {
    if (!onNavBarHover) {
      return (
        <NavBarItem
          name={props.currentScr.type.name}
          icon={iconMap.get(props.currentScr.type.name)}
        ></NavBarItem>
      );
    } else
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <NavBarItemOnHover
            name="Dashboard"
            icon={<FaDiceD6 />}
          ></NavBarItemOnHover>
          <NavBarItemOnHover
            name="Portfolio"
            icon={<FaChartPie />}
          ></NavBarItemOnHover>
        </div>
      );
  };

  const NavBarItem = ({ name, icon }: menuPropsType) => {
    return (
      <StyledMenuItemLi key={name}>
        {icon}
        <a>{name}</a>
      </StyledMenuItemLi>
    );
  };

  const NavBarItemOnHover = ({ name, icon }: menuPropsType) => {
    return (
      <StyledMenuItemLiOnHover
        key={name}
        onClick={() => {
          changeNavBar(name);
        }}
      >
        {icon}
        <br />
        <a>{name}</a>
      </StyledMenuItemLiOnHover>
    );
  };
  return (
    <div
      onMouseEnter={() => {
        setOnNavBarHover(true);
      }}
      onMouseLeave={() => {
        setOnNavBarHover(false);
      }}
      style={{
        position: "absolute",
        bottom: "1rem",
        left: "50%",
        transform: "translate(-50%)",
        width: onNavBarHover ? "30vw" : "15vw",
        transition: "width .2s linear",
        height: "3rem",
        borderRadius: "2rem",
        color: "white",
        zIndex: 5,
        backgroundColor: "black",
      }}
    >
      <NavBarOnHover></NavBarOnHover>
    </div>
  );
}
function mapStateToProps(state: JSX.Element) {
  return { currentScr: state };
}
export default connect(mapStateToProps)(NavBar);
