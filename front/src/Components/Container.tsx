import styled from "styled-components";
import Dashboard from "./Dashboard";

const StyledContainer = styled.div`
  position: absolute;
  background-color: #fff5ea;
  width: 100%;
  height: 100%;
`;

function Container() {
  return (
    <StyledContainer>
      <Dashboard></Dashboard>
    </StyledContainer>
  );
}
export default Container;
