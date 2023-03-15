import styled from "styled-components";
import { useState } from "react";

const StyledNavBar = styled.div`
  width: 20%;
  height: 85%;
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  font-size: 1.5vw;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: {colors.white};
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
