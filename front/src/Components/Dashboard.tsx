import styled from "styled-components";
import { FaDiceD6 } from "react-icons/fa";
const Title = styled.h1`
  font-size: 1rem;
  text-align: left;
  color: black;
  position: absolute;
  margin: 50px;
  font-family: "Noto Sans", sans-serif;
`;

function Dashboard() {
  return (
    <div>
      <Title>
        <FaDiceD6 />
        Dashboard
      </Title>
    </div>
  );
}

export default Dashboard;
