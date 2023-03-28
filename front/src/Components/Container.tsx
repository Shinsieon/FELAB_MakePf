import styled from "styled-components";
import Dashboard from "./Dashboard";
import { useState } from "react";

const StyledContainer = styled.div`
  position: absolute;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
`;
function Container({ screen }: { screen: JSX.Element }) {
  return <StyledContainer>{screen}</StyledContainer>;
}
export default Container;
