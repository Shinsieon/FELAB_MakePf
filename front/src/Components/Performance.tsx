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
  const labels = ["평균 수익률", "샤프비율", "표준편차", "mdd"];
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
        top: "55vh",
        height: "28.5vh",
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
          padding: "10px",
        }}
      >
        <h4 style={{ textAlign: "left" }}>포트폴리오 성과</h4>
        {isDataLoaded ? (
          userPortData.map((item, idx) => (
            <PerformanceBar
              label={labels[idx]}
              value={userPortData[0]}
            ></PerformanceBar>
          ))
        ) : (
          <h1>데이터를 불러오는 중입니다.</h1>
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

function PerformanceBar({ label, value }: { label: string; value: string }) {
  console.log(label);
  return (
    <div
      style={{
        width: "100%",
        height: "2.5rem",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "center",
        color: "black",
        margin: "10px 0",
      }}
    >
      <p>{label}</p>
      <p>{parseFloat(value).toFixed(2)}</p>
    </div>
  );
}

function RadarChart({ userPortData }: { userPortData: string[] }) {
  console.log(userPortData);
  const labels = ["샤프비율", "표준편차", "mdd"];
  const options = {
    responsive: false,

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
