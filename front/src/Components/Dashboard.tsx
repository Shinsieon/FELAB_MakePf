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
import { useDispatch } from "react-redux";
import { assetChanger } from "../Store";

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
  name: string;
  weight: number;
  amount: number;
  investmentPeriod: number;
}

function Dashboard() {
  const [assets, setAssets] = useState<Iasset[] | null>([]);
  const dispatch = useDispatch();

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
        <label
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            lineHeight: "2.5rem",
            margin: "1rem 0",
          }}
        >
          Manage your <br />
          Portfolio
        </label>
      </div>
    );
  };

  useEffect(() => {
    axios
      .post("http://localhost:8000/getMyStocks", {
        email: localStorage.getItem("userMail"),
      })
      .then((response) => {
        console.log(response);
        const result: Iasset[] = [];
        if (response.data.length === 0) {
        } else {
          for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            result.push({
              code: item.fields.code,
              name: item.fields.name,
              weight: item.fields.weight,
              amount: item.fields.amount,
              investmentPeriod: item.fields.investmentperiod,
            });
          }
        }
        setAssets(result);
        //dispatch(assetChanger.)
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
