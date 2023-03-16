import styled from "styled-components";
import { useState } from "react";

const StyledNavBar = styled.div`
  width: 23%;
  height: 90vh;
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
  left: 20%;
  position: absolute;
  font-family: "Noto Sans", sans-serif;
  weight: bold;
`;

function NavBar() {
  const [userName, setUserName] = useState("User");

  return (
    <StyledNavBar>
      <Title>hello {userName}</Title>
    </StyledNavBar>
  );
}

export default NavBar;
