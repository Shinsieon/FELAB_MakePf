import { useEffect, useState } from "react";
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

// [
//   const labels = ["평균 수익률", "샤프비율", "표준편차", "mdd"];
// ]
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
function Performance() {
  const [userPortData, setUserPortData] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    //user의 포트폴리오 성과 with benchmark
    axios
      .post("http://localhost:8000/getUserAssetPerformance", {
        email: localStorage.getItem("userMail"),
        userToken: localStorage.getItem("access_token"),
      })
      .then((response) => {
        console.log(response);
        const arr: string[] = [
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
        position: "absolute",
        top: "27rem",
        height: "25vh",
        width: "60vw",
        left: "32vw",
        display: "flex",
      }}
    >
      <div
        style={{
          backgroundColor: "#251342",
          height: "100%",
          width: "35vw",
          borderRadius: "1rem",
          color: "white",
        }}
      >
        <h4 style={{ textAlign: "left", margin: "10px" }}>포트폴리오 성과</h4>
        {isDataLoaded ? (
          <RadarChart userPortData={userPortData}></RadarChart>
        ) : (
          <h1>asd</h1>
        )}
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          marginLeft: "2vw",
          width: "23vw",
          borderRadius: "1rem",
        }}
      >
        <h5 style={{ textAlign: "left", margin: "10px" }}>개별주식 성과</h5>
      </div>
    </div>
  );
}

function RadarChart({ userPortData }: { userPortData: string[] }) {
  console.log(userPortData);
  const labels = ["평균 수익률", "샤프비율", "표준편차", "mdd"];
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
  return <Radar data={data}></Radar>;
}

export default Performance;
