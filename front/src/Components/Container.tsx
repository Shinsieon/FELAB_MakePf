import styled from "styled-components";
import Dashboard from "./Dashboard";

const StyledContainer = styled.div`
  position: absolute;
  background-color: #fff5ea;
  width: 80%;
  height: 85vh;
  left: 18%;
  border-radius: 4rem;
`;

function Container() {
  return (
    <StyledContainer>
      <Dashboard></Dashboard>
    </StyledContainer>
  );
}
export default Container;
