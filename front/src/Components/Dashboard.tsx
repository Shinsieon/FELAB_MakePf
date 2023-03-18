import styled from "styled-components";
import { FaDiceD6 } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
const Title = styled.h1`
  font-size: 1rem;
  text-align: left;
  color: black;
  position: absolute;
  margin: 50px;
  font-family: "Noto Sans", sans-serif;
`;

interface IStocks {
  code: string;
  name: string;
  market: string;
}
function Dashboard() {
  const [stocks, setStocks] = useState({});

  axios.get("/getStocks").then((response) => {
    console.log(response);
    setStocks(response.data);
  });
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
