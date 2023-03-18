import styled from "styled-components";
import { useState } from "react";
import { FaDashcube } from "react-icons/fa";

const StyledNavBar = styled.div`
  width: 23%;
  height: 85vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 3rem;
  font-size: 1.5vw;
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

const StyledMenuItemUl = styled.div`
  liststyle: none;
  position: absolute;
  top: 20vh;
  color: #cccccc;
`;

const StyledMenuItemLi = styled.div`
  padding: 20px;
  width: 100%;
  height: 15px;
  text-align: left;
  cursor: default;
  &:hover {
    color: white;
    font-size: 1.1rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface propsType {
  menuItems: string[];
  icon: JSX.Element;
}

function NavBarItem({ menuItems }: propsType) {
  const listItems = menuItems.map((item) => (
    <StyledMenuItemLi onClick={() => console.log("hello")} key={item}>
      <FaDashcube />
      <a>{item}</a>
    </StyledMenuItemLi>
  ));
  return <StyledMenuItemUl>{listItems}</StyledMenuItemUl>;
}

function NavBar() {
  const [userName, setUserName] = useState<string>("User");
  const [menus, setMenus] = useState<string[]>(["Dashboard", "Portfolio"]);
  return (
    <StyledNavBar>
      <Title>hello {userName}</Title>
      <NavBarItem menuItems={menus}></NavBarItem>
    </StyledNavBar>
  );
}

export default NavBar;
