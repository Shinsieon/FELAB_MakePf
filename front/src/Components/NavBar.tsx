import { useState } from "react";
import styled from "styled-components";
import { FaDiceD6, FaChartPie } from "react-icons/fa";
import { screenChanger } from "../Store";
import { useDispatch, useSelector } from "react-redux";

interface menuPropsType {
  name: string;
  icon: JSX.Element;
}
const initialMenuList: menuPropsType[] = [
  { name: "Dashboard", icon: <FaDiceD6 /> },
  { name: "Portfolio", icon: <FaChartPie /> },
];
const iconMap = {
  Dashboard: <FaDiceD6 />,
  Portfolio: <FaChartPie />,
};
function NavBar() {
  const state = useSelector((state: any) => state.scrReducer);
  const [onNavBarHover, setOnNavBarHover] = useState(false);

  const nowMenu: menuPropsType[] = initialMenuList.filter(
    (item) => item.name === state.type.name
  );
  const [showMenu, setShowMenu] = useState<menuPropsType[]>(nowMenu);
  //w-auto duration-300 transition ease-in-out delay-150 rounded-lg bg-black z-5 delay-200
  return (
    <div className="absolute bottom-5 h-12 w-screen flex justify-center ">
      <div
        className="flex flex-row ... justify-center cursor-default h-full bg-black z-5 mx-3 text-white rounded-3xl w-auto"
        onMouseEnter={() => {
          setShowMenu(initialMenuList);
        }}
        onMouseLeave={() => {
          setShowMenu(initialMenuList);
        }}
      >
        <NavBarItem showMenu={showMenu}></NavBarItem>
      </div>
    </div>
  );
}
const NavBarItem = ({ showMenu }: { showMenu: menuPropsType[] }) => {
  return (
    <div>
      {showMenu.map((item) => (
        <div className="flex justify-center h-full place-items-center mx-3">
          {item.icon}
          {item.name}
        </div>
      ))}
    </div>
  );
};
const NavBarOnHover = ({ onNavBarHover }: { onNavBarHover: boolean }) => {
  if (!onNavBarHover) {
    return (
      <div className="flex justify-center cursor-default h-full place-items-center mx-3"></div>
    );
  } else
    return (
      <div className="flex justify-evenly text-lg hover:text-xl text-white mx-2 cursor-default mx-3 h-full place-items-center">
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

const NavBarItemOnHover = ({ name, icon }: menuPropsType) => {
  //Navigationbar items on hover
  const dispatch = useDispatch();
  const changeNavBar = (name: string) => {
    if (name === "Dashboard") dispatch({ type: screenChanger.SET_DASHBOARD });
    else if (name === "Portfolio")
      dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  return (
    <div
      className="flex justify-center text-lg hover:text-xl text-white mx-2 cursor-default h-full place-items-center"
      key={name}
      onClick={() => {
        changeNavBar(name);
      }}
    >
      {icon}
      {name}
    </div>
  );
};
export default NavBar;
