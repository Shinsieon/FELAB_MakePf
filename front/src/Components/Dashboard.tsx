import { useEffect } from "react";
import Profile from "./Profile";
import DashboardPfRetLinBox from "./DashboardPfRetLinBox";
import DashboardPfPieBox from "./DashboardPfPieBox";
import Performance from "./Performance";
import PortfolioTable from "./PortfolioTable";
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
      <DashboardMent />
      <div className="absolute top-[25vh] h-[62vh] left-[4vw] md:w-[35vw]">
        <PortfolioTable />
      </div>
      <div className="absolute top-[25vh] h-[62vh] left-[40vw] md:w-[35vw]">
        <Performance />
      </div>
      <div className="absolute top-[25vh] h-[62vh] left-[75vw] md:w-[20vw] flex flex-col ml-2">
        <div className="flex-1">
          <DashboardPfRetLinBox />
        </div>
        <div className="flex-1">
          <DashboardPfPieBox />
        </div>
      </div>
      <Profile></Profile>
    </div>
  );
}
function DashboardMent() {
  return (
    <div className="absolute font-bold top-5 left-12 text-left ">
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
