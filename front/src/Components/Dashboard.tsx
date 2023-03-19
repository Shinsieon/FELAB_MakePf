import styled from "styled-components";
import { FaDiceD6 } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
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
  useEffect(() => {
    axios.get("http://localhost:8000/getStocks").then((response) => {
      console.log(response);
      setStocks(response.data);
    });
  }, []);
  // const axiosConfig: AxiosRequestConfig = {
  //   baseURL: "http://localhost:8000",
  // };
  // const client = axios.create(axiosConfig);
  // const response = client.get("/getStocks");

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
