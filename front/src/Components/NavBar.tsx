import styled from "styled-components";
import { useState } from "react";

const StyledNavBar = styled.div`
  width: 23%;
  height: 85vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3rem;
  font-size: 1.5vw;
`;
const StyledNavBarItem = styled.li`
  color: white;
  font-size: 1rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: left;
  color: white;
  padding: 30px;
  height: 80px;
  left: 13%;
  position: absolute;
  font-family: "Noto Sans", sans-serif;
  weight: bold;
`;

interface propsType {
  menuItems: string[];
}

function NavBarItem({ menuItems }: propsType) {
  const listItems = menuItems.map((item) => <li key={item}>{item}</li>);
  return <ul>{listItems}</ul>;
}

function NavBar() {
  const [userName, setUserName] = useState<string>("User");
  const [menus, setMenus] = useState<string[]>(["Dashboard, Portfolio"]);
  return (
    <StyledNavBar>
      <Title>hello {userName}</Title>
      <NavBarItem menuItems={menus}></NavBarItem>
    </StyledNavBar>
  );
}

export default NavBar;
