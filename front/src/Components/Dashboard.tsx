import { useEffect } from "react";
import Profile from "./Profile";
import Dashboard_PfRetLinBox from "./Dashboard_PfRetLinBox";
import Dashboard_PfPieBox from "./Dashboard_PfPieBox";
import fetchApi from "../httpFetch";
import { getUserInfo } from "../Cookie";

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
    getUserAssets(dispatch);
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
    <div className="absolute font-bold top-20 left-12 text-left ">
      <label className="text-5xl leading-10 font-bold my-10">
        Manage your <br />
        Portfolio
      </label>
    </div>
  );
}

export const getUserAssets = async (dispatch: any) => {
  let result = await fetchApi("getUserAssets", "post", {
    userInfo: getUserInfo(),
  });
  if (result) {
    const asset: Iasset[] = [];
    for (var i = 0; i < result.length; i++) {
      var item = result[i];
      asset.push({
        code: item.code,
        name: item.name,
        weight: item.weight,
        amount: item.amount,
        investmentPeriod: item.investmentperiod,
      });
    }
    dispatch({ type: assetChanger.SET_ASSET, asset: asset });
  }
};
export default Dashboard;
