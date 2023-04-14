import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaDiceD6, FaChartPie } from "react-icons/fa";
import { screenChanger } from "../Store";
import { useDispatch, useSelector } from "react-redux";
const StyledMenuItemLi = styled.div`
  padding-top: 6px;
  width: 100%;
  text-align: center;
  cursor: default;
  font-size: 1.5rem;
`;
const StyledMenuItemLiOnHover = styled.div`
  width: 80px;
  text-align: center;
  cursor: default;
  color: white;
  font-size: 1rem;
  white-space: pre-wrap;
  &:hover {
    font-size: 1.1rem;
  }
`;
interface menuPropsType {
  name: string;
  icon: JSX.Element;
}
function NavBar() {
  const [onNavBarHover, setOnNavBarHover] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.scrReducer);

  const changeNavBar = (name: string) => {
    if (name === "Dashboard") dispatch({ type: screenChanger.SET_DASHBOARD });
    else if (name === "Portfolio")
      dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  let iconMap = new Map();
  iconMap.set("Dashboard", <FaDiceD6 />);
  iconMap.set("Portfolio", <FaChartPie />);
  const NavBarOnHover = () => {
    if (!onNavBarHover) {
      return (
        <NavBarItem
          name={state?.type.name}
          icon={iconMap.get(state?.type.name)}
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
        <a style={{ margin: "5px" }}>{name}</a>
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
export default NavBar;
