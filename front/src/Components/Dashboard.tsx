import styled from "styled-components";
import { FaDiceD6 } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import StyledProfile from "./Profile";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const TitleLabel = styled.h1`
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

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const labels = ["January", "February"];

export const data2 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 4),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 3),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
function Dashboard_ment() {
  return (
    <div
      style={{
        position: "absolute",
        top: "5rem",
        left: "3rem",
        fontSize: "rem",
        textAlign: "left",
        letterSpacing: "0.2rem",
      }}
    >
      <h1>
        Manage your <br />
        Portfolio
      </h1>
    </div>
  );
}
function Dashboard_PfPieBox() {
  return (
    <div
      style={{
        position: "absolute",
        top: "15rem",
        backgroundColor: "white",
        height: "55vh",
        width: "30vw",
        left: "3rem",
        borderRadius: "1rem",
      }}
    >
      <Pie data={data}></Pie>
    </div>
  );
}
function Dashboard_PfRetLinBox() {
  return (
    <div
      style={{
        position: "absolute",
        top: "15rem",
        backgroundColor: "white",
        height: "55vh",
        width: "55vw",
        left: "40vw",
        borderRadius: "1rem",
      }}
    >
      <Line options={options} data={data2}></Line>
    </div>
  );
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
      <TitleLabel>
        <FaDiceD6 />
        Dashboard
      </TitleLabel>
      <Dashboard_ment></Dashboard_ment>
      <Dashboard_PfPieBox></Dashboard_PfPieBox>
      <Dashboard_PfRetLinBox></Dashboard_PfRetLinBox>
      <StyledProfile
        width="10vw"
        height="5vh"
        left=""
        right="5vw"
        top="6.5vh"
        color="#f1c232"
      >
        <h3
          style={{
            position: "absolute",
            margin: 0,
            fontSize: "1rem",
            top: "50%",
          }}
        >
          shinsieon
        </h3>
      </StyledProfile>
    </div>
  );
}

export default Dashboard;
