import styled from "styled-components";
import { useState } from "react";
import { FaDiceD6 } from "react-icons/fa";

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
  width: 100%;
  liststyle: none;
  position: absolute;
  top: 30vh;
  color: #cccccc;
  font-size: 1rem;
`;

const StyledMenuItemLi = styled.div`
  padding: 20px;
  padding-left: 1.5vw;
  width: 100%;
  height: 18px;
  text-align: left;
  cursor: default;
  &:hover {
    color: white;
    font-size: 1.1rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface menuPropsType {
  name: string;
  icon: JSX.Element;
}

function NavBarItem({ name, icon }: menuPropsType) {
  return (
    <StyledMenuItemLi onClick={() => console.log("hello")} key={name}>
      {icon}
      <a>{name}</a>
    </StyledMenuItemLi>
  );
}

function NavBar() {
  const [userName, setUserName] = useState<string>("User");
  return (
    <StyledNavBar>
      <Title>hello {userName}</Title>
      <StyledMenuItemUl>
        <NavBarItem name="Dashboard" icon={<FaDiceD6 />}></NavBarItem>
        <NavBarItem name="Portfoilo" icon={<FaDiceD6 />}></NavBarItem>
      </StyledMenuItemUl>
    </StyledNavBar>
  );
}

export default NavBar;
