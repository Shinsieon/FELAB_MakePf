import styled, { css } from "styled-components"; //css 추가

const StyledProfile = styled.div<{
  width: string;
  height: string;
  color: string;
  left: string;
  right: string;
  top: string;
}>`
  position: ${(props) => "absolute"};
  width: ${(props) => props.width || "10vw"};
  height: ${(props) => props.height || "5vh"};
  background-color: ${(props) => props.color || "#f1c232"};
  left: ${(props) => props.left || ""};
  right: ${(props) => props.right || ""};
  top: ${(props) => props.top || "5vh"};
  border-radius: ${(props) => "1rem"};
  padding: ${(props) => "0.3rem"};
`;

export default StyledProfile;
