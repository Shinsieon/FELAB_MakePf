import { useState } from "react";
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
function NavBar() {
  const state = useSelector((state: any) => state.scrReducer);
  const nowMenu: menuPropsType[] = initialMenuList.filter(
    (item) => item.name === state.type.name
  );
  const [showMenu, setShowMenu] = useState<menuPropsType[]>(nowMenu);
  const dispatch = useDispatch();
  const changeNavBar = (name: string) => {
    if (name === "Dashboard") dispatch({ type: screenChanger.SET_DASHBOARD });
    else if (name === "Portfolio")
      dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  //w-auto duration-300 transition ease-in-out delay-150 rounded-lg bg-black z-5 delay-200
  return (
    <div className="absolute bottom-5 h-12 w-screen flex justify-center ">
      <div
        className="flex justify-center h-full bg-black z-5 mx-3 text-white rounded-3xl"
        onMouseEnter={() => {
          setShowMenu(initialMenuList);
        }}
        onMouseLeave={() => {
          setShowMenu(nowMenu);
        }}
      >
        {showMenu.map((item, idx) => (
          <div
            className="flex justify-center h-full place-items-center mx-3 w-30 cursor-default"
            onClick={() => {
              changeNavBar(item.name);
            }}
            key={idx}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
export default NavBar;
