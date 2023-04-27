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
import axios from "axios";
import styled from "styled-components";
import SimpleSlider from "./car";

const H5Style = styled.h5`
  font-size: 1rem;
  text-align: left;
  margin: 0;
`;
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
    <div
      style={{
        position: "absolute",
        top: "7rem",
        height: "65vh",
        width: "35vw",
        left: "47vw",
        display: "flex",
      }}
    >
      <SimpleSlider
        children={[PortfolioPerformance, IndivisualPerformance]}
      ></SimpleSlider>
    </div>
  );
}

function PortfolioPerformance() {
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
    //user의 포트폴리오 성과 with benchmark
    axios
      .post("http://localhost:8000/getUserAssetPerformance", {
        email: localStorage.getItem("userMail"),
        userToken: localStorage.getItem("access_token"),
      })
      .then((response) => {
        console.log(response);
        const arr: number[] = [
          response.data.retMean,
          response.data.sharpe,
          response.data.std,
          response.data.mdd,
        ];
        setUserPortData([...arr]);
        setIsDataLoaded(true);
      });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#251342",
        height: "65vh",
        width: "100%",
        borderRadius: "1rem",
        color: "white",
        padding: "12px",
        position: "relative",
      }}
    >
      <h5 style={{ textAlign: "left" }}>포트폴리오 성과</h5>
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
  );
}
type TassetFundamental = {
  CODE: string;
  PER: number;
  EPS: number;
  RETURN: number;
};
function IndivisualPerformance() {
  const [assetFundArr, setAssetFund] = useState<TassetFundamental[]>([]);
  useEffect(() => {
    axios
      .post("http://localhost:8000/getIndivisualPerformance", {
        email: localStorage.getItem("userMail"),
        userToken: localStorage.getItem("access_token"),
      })
      .then((response) => {
        var dataObj = response.data;
        var tempArr: TassetFundamental[] = [];
        console.log(dataObj);
        Object.keys(dataObj).forEach((item) => {
          var tempObj: TassetFundamental = {
            CODE: "",
            PER: 0,
            EPS: 0,
            RETURN: 0,
          };
          tempObj["CODE"] = item;
          tempObj["PER"] = dataObj[item].PER;
          tempObj["EPS"] = dataObj[item].EPS;
          tempObj["RETURN"] = dataObj[item].RETURN;
          tempArr.push(tempObj);
        });
        tempArr.sort((a, b) => b.RETURN - a.RETURN);
        setAssetFund(tempArr);
      });
  }, []);
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "65vh",
        width: "100%",
        borderRadius: "1rem",
        color: "white",
        padding: "12px",
        position: "relative",
      }}
    >
      <h5 style={{ textAlign: "left", color: "black" }}>개별종목 성과</h5>
      {assetFundArr.map((item, idx) => {
        return (
          <div key={idx}>
            <IndividualPerformanceBar item={item}></IndividualPerformanceBar>
          </div>
        );
      })}
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
        <H5Style>{label}</H5Style>
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
        backgroundColor: "#f5f5f5",
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
        <H5Style>{item.CODE}</H5Style>
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
