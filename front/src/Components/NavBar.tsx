import { useState } from "react";
import styled from "styled-components";
import { FaDiceD6, FaChartPie } from "react-icons/fa";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";

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
  comp: JSX.Element;
  name: string;
  icon: JSX.Element;
}
function NavBar({ changeFunc }: { changeFunc: Function }) {
  const [onNavBarHover, setOnNavBarHover] = useState(false);
  const [selectedNavBarItem, setSelectedNavBarItem] = useState("Dashboard");

  const changeNavBar = ({ item }: { item: JSX.Element }) => {
    changeFunc(item);
  };
  let iconMap = new Map();
  iconMap.set("Dashboard", <FaDiceD6 />);
  iconMap.set("Portfolio", <FaChartPie />);
  const NavBarOnHover = () => {
    if (!onNavBarHover) {
      return (
        <NavBarItem
          comp={<Dashboard />}
          name={selectedNavBarItem}
          icon={iconMap.get(selectedNavBarItem)}
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
            comp={<Dashboard />}
            name="Dashboard"
            icon={<FaDiceD6 />}
          ></NavBarItemOnHover>
          <NavBarItemOnHover
            comp={<Portfolio />}
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

  const NavBarItemOnHover = ({ comp, name, icon }: menuPropsType) => {
    return (
      <StyledMenuItemLiOnHover
        key={name}
        onClick={() => {
          setSelectedNavBarItem(name);
          changeFunc(comp);
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
