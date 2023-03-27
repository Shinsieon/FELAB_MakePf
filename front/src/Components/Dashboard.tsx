import styled from "styled-components";
import { FaDiceD6 } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Profile from "./Profile";
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
import { type } from "os";

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

interface Iasset {
  email: string;
  stock: string;
  weight: number;
  amount: number;
}
const Dashboard_PfPieBox = ({ assets }: { assets: Iasset[] }) => {
  const data = {
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
  if (assets.length == 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: "15rem",
          backgroundColor: "rgba(0,0,0,0.3)",
          height: "55vh",
          width: "30vw",
          left: "3rem",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            padding: "40% 0",
          }}
        >
          <AiOutlinePlusCircle size={"5rem"} color={"white"} />
          <p style={{ color: "white", fontSize: "1rem" }}>
            보유한 자산이 없습니다. 추가해주세요
          </p>
        </div>
      </div>
    );
  }
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
};
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
  const [assets, setAssets] = useState<Iasset[] | null>([]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/getMyStocks", {
        email: localStorage.getItem("userMail"),
      })
      .then((response) => {
        const result: Iasset[] = [];
        if (response.data.length == 0) {
        } else {
          response.data.map((item: Iasset, idx: number) => {
            result.push(item);
          });
        }
        console.log(typeof result);
        setAssets(result);
        console.log(result);
      });
  }, []);
  return (
    <div>
      {/* <TitleLabel>
        <FaDiceD6 />
        Dashboard
      </TitleLabel> */}
      <Dashboard_ment></Dashboard_ment>
      <Dashboard_PfPieBox assets={assets ? assets : []}></Dashboard_PfPieBox>
      <Dashboard_PfRetLinBox></Dashboard_PfRetLinBox>
      <Profile></Profile>
    </div>
  );
}

export default Dashboard;
