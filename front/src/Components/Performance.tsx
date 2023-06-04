import { useEffect, useState } from "react";
import cashFlow from "../assets/images/cash-flow.png";
import cost from "../assets/images/cost.png";
import std from "../assets/images/std.png";
import mdd from "../assets/images/mdd.png";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import styled from "styled-components";
import SimpleSlider from "./SimpleSlider";
import { useSelector } from "react-redux";
import fetchApi from "../httpFetch";
import { getUserInfo } from "../Cookie";
import DashboardPfPieBox from "./DashboardPfPieBox";
import DashboardPfRetLinBox from "./DashboardPfRetLinBox";

const PStyle = styled.p`
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
`;

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Performance() {
  return (
    <div className="h-full w-full rounded-xl ">
      <p className="font-bold text-gray-800 text-xl">
        {getUserInfo().name}님의 포트폴리오 성과
      </p>
      <div>
        <PortfolioPerformance />
      </div>
    </div>
  );
}

export function PortfolioPerformance() {
  const assets = useSelector((state: any) => state.assetReducer);
  const [userPortData, setUserPortData] = useState<number[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const contents = {
    평균수익률: "투자기간 동안의 수익률 평균입니다.",
    샤프비율:
      "샤프 비율은 투자자가 부담하는 위험을 자산 수익률이 얼마나 잘 보상하는지를 규정합니다",
    표준편차: "표준편차는 포트폴리오의 수익률의 변동성을 의미합니다",
    Mdd: "MDD는 전 고점 대비 최대 하락비율을 의미합니다.",
  };

  useEffect(() => {
    //user의 포트폴리오 성과 with benchmark
    const getUserAssetPerformance = async () => {
      let result = await fetchApi("getUserAssetPerformance", "POST", {
        userInfo: getUserInfo(),
      });
      if (result.success) {
        const arr: number[] = [
          result.mean,
          result.sharpe,
          result.std,
          result.mdd,
        ];
        setUserPortData([...arr]);
        setIsDataLoaded(true);
      } else {
      }
    };
    getUserAssetPerformance();
  }, [assets]);
  return (
    <div className="text-white h-full overflow-y-auto">
      {assets.length > 0 ? (
        <div>
          {isDataLoaded ? (
            userPortData.map((item, idx) => (
              <div key={idx}>
                <PortfolioPerformanceBar
                  label={Object.keys(contents)[idx]}
                  content={Object.values(contents)[idx]}
                  value={userPortData[idx]}
                  key={idx}
                ></PortfolioPerformanceBar>
              </div>
            ))
          ) : (
            <h3>데이터를 불러오는 중입니다.</h3>
          )}
        </div>
      ) : (
        <div className="h-[200px]">
          <h5 className="text-sm text-left">
            아직 자산이 설정되지 않았습니다.
          </h5>
        </div>
      )}
    </div>
  );
}

function PortfolioPerformanceBar({
  label,
  content,
  value,
}: {
  label: string;
  content: string;
  value: number;
}) {
  return (
    <div className="flex bg-white rounded-xl my-2">
      <div className="w-[80%] flex flex-col ml-5 my-3">
        <span className="font-semibold text-gray-900 ">{label}</span>
        <span className="font-semibold text-sm text-gray-500">{content}</span>
      </div>
      <div className="w-[20%] ml-5 my-3">
        <span className="text-xl text-red-400 h-full font-bold">
          {value.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Performance;
