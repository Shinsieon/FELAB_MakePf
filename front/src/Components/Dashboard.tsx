import axios from "axios";
import { useEffect } from "react";
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
  const dispatch = useDispatch();

  useEffect(() => {
    getMyStocks(dispatch);
  });
  return (
    <div>
      {/* <TitleLabel>
        <FaDiceD6 />
        Dashboard
      </TitleLabel> */}
      <DashboardMent></DashboardMent>
      <Dashboard_PfPieBox></Dashboard_PfPieBox>
      <Dashboard_PfRetLinBox></Dashboard_PfRetLinBox>
      <Profile></Profile>
    </div>
  );
}
function DashboardMent() {
  return (
    <div className="absolute font-bold top-20 left-12 text-left">
      <label className="text-5xl leading-10 font-bold my-10">
        Manage your <br />
        Portfolio
      </label>
    </div>
  );
}

export const getMyStocks = (dispatch: any) => {
  axios
    .post("http://localhost:8000/getMyStocks", {
      email: localStorage.getItem("userMail"),
      userToken: localStorage.getItem("access_token"),
    })
    .then((response) => {
      const result: Iasset[] = [];
      if (response.data.length === 0 || response.data === 5) {
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
      dispatch({ type: assetChanger.SET_ASSET, asset: result });
    });
};
export default Dashboard;
