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
import SimpleSlider from "./Carousel";
import { useSelector } from "react-redux";
import fetchApi from "../httpFetch";
import { getUserInfo } from "../Cookie";

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
    <div className="absolute top-28 h-[70vh] left-[47vw] md:w-1/3 flex">
      <SimpleSlider
        children={[PortfolioPerformance, IndivisualPerformance]}
      ></SimpleSlider>
    </div>
  );
}

function PortfolioPerformance() {
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
  const icons = [cashFlow, cost, std, mdd];

  useEffect(() => {
    console.log("render here");
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
    <div className="bg-[#251342] h-full w-full rounded-xl text-white p-5">
      <h5 className="font-bold text-white">포트폴리오 성과</h5>
      {assets.length > 0 ? (
        <div>
          <PStyle>
            {localStorage.getItem("userName")}님의 자산 데이터를 바탕으로 성과를
            도출했습니다.
          </PStyle>
          {isDataLoaded ? (
            userPortData.map((item, idx) => (
              <div key={idx}>
                <PortfolioPerformanceBar
                  label={Object.keys(contents)[idx]}
                  content={Object.values(contents)[idx]}
                  value={userPortData[idx]}
                  icon={icons[idx]}
                  key={idx}
                ></PortfolioPerformanceBar>
              </div>
            ))
          ) : (
            //<RadarChart userPortData={userPortData}></RadarChart>
            <h3>데이터를 불러오는 중입니다.</h3>
          )}
        </div>
      ) : (
        <div className="h-[200px]">
          <h5 className="text-sm text-left m-0">
            아직 자산이 설정되지 않았습니다.
          </h5>
        </div>
      )}
    </div>
  );
}
type TassetFundamental = {
  CODE: string;
  PER: number;
  EPS: number;
  RETURN: number;
};
function IndivisualPerformance() {
  const assets = useSelector((state: any) => state.assetReducer);
  const [assetFundArr, setAssetFund] = useState<TassetFundamental[]>([]);
  useEffect(() => {
    const getIndivisualPerformance = async () => {
      let result = await fetchApi("getIndivisualPerformance", "POST", {
        userInfo: getUserInfo(),
      });
      if (result.success) {
        var tempArr: TassetFundamental[] = [];
        console.log(result);
        Object.keys(result).forEach((item) => {
          var tempObj: TassetFundamental = {
            CODE: "",
            PER: 0,
            EPS: 0,
            RETURN: 0,
          };
          tempObj["CODE"] = item;
          tempObj["PER"] = result[item].PER;
          tempObj["EPS"] = result[item].EPS;
          tempObj["RETURN"] = result[item].RETURN;
          tempArr.push(tempObj);
        });
        tempArr.sort((a, b) => b.RETURN - a.RETURN);
        setAssetFund(tempArr);
      }
    };
  }, [assets]);
  return (
    <div className="bg-white h-full w-full rounded-xl text-white p-5">
      <h5 className="font-bold text-black">개별종목 성과</h5>
      {assets.length > 0 ? (
        <div>
          {assetFundArr.map((item, idx) => {
            return (
              <div key={idx}>
                <IndividualPerformanceBar
                  item={item}
                ></IndividualPerformanceBar>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-[200px]">
          <h5 className="text-sm text-left m-0 text-black">
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
  icon,
}: {
  label: string;
  content: string;
  value: number;
  icon: any;
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        color: "black",
        margin: "10px",
      }}
    >
      <div
        className="iconLayer"
        style={{
          width: "5rem",
          height: "5rem",
        }}
      >
        <img src={icon} style={{ width: "3rem" }}></img>
      </div>
      <div
        className="detailLayer"
        style={{ color: "white", marginLeft: "1rem", width: "20vw" }}
      >
        <h5>{label}</h5>
        <PStyle>{content}</PStyle>
        <PStyle style={{ fontWeight: "bold" }}>{value.toFixed(2)}</PStyle>
      </div>
    </div>
  );
}
function IndividualPerformanceBar({ item }: { item: TassetFundamental }) {
  return (
    <div
      style={{
        width: "100%",
        height: "4rem",
        backgroundColor:
          item.RETURN > 0 ? "rgba(219,0,0,0.15)" : "rgba(70,102,255,0.15)",
        borderRadius: "1rem",
        marginBottom: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        color: "rgba(35,35,35)",
      }}
    >
      <div style={{ textAlign: "left" }}>
        <h5>{item.CODE}</h5>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PStyle>월평균수익률 {item.RETURN.toFixed(2)}</PStyle>
        <PStyle>PER {item.PER.toFixed(2)}</PStyle>
        <PStyle>EPS {item.EPS.toFixed(2)}</PStyle>
        <PStyle></PStyle>
        <PStyle></PStyle>
      </div>
    </div>
  );
}
function RadarChart({ userPortData }: { userPortData: number[] }) {
  console.log(userPortData);
  const labels = ["평균수익률", "샤프비율", "표준편차", "mdd"];
  const options = {
    responsive: true,

    legend: {
      labels: {
        fontColor: "white",
        fontSize: 18,
      },
    },
    scale: {
      pointLabels: {
        fontColor: labels.map((lbl) => "white"),
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "내 포트폴리오",
        data: userPortData,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return <Radar data={data} options={options}></Radar>;
}

export default Performance;
