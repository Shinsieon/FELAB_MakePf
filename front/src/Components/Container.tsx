import styled from "styled-components";
import Dashboard from "./Dashboard";

const StyledContainer = styled.div`
  position: absolute;
  background-color: #f2f2f2;
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
