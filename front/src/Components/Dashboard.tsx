import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "./Profile";
import Dashboard_PfRetLinBox from "./Dashboard_PfRetLinBox";
import Dashboard_PfPieBox from "./Dashboard_PfPieBox";
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

export interface Iasset {
  code: string;
  stock: string;
  weight: number;
  amount: number;
  investmentPeriod: number;
}

function Dashboard() {
  const [assets, setAssets] = useState<Iasset[] | null>([]);

  const Dashboard_ment = () => {
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
  };

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
        setAssets(result);
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
      <Dashboard_PfRetLinBox
        assets={assets ? assets : []}
      ></Dashboard_PfRetLinBox>
      <Profile></Profile>
    </div>
  );
}

export default Dashboard;
