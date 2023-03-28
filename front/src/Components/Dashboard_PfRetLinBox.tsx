import { Line } from "react-chartjs-2";
import { Iasset } from "./Dashboard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const labels = ["January", "February"];
export const data2 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 4),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 3),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
function Dashboard_PfRetLinBox({ assets }: { assets: Iasset[] }) {
  const [mouseOn, setMouseOn] = useState(false);
  if (assets.length == 0) {
    return (
      <div
        onMouseEnter={() => setMouseOn(true)}
        onMouseLeave={() => setMouseOn(false)}
        style={{
          position: "absolute",
          top: "15rem",
          backgroundColor: mouseOn ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)",
          height: "55vh",
          width: "55vw",
          left: "40vw",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            marginTop: "9rem",
          }}
        >
          <AiOutlinePlusCircle
            size={"5rem"}
            color={"white"}
            onClick={() => console.log("click")}
          />
          <p style={{ color: "white", fontSize: "1rem" }}>
            보유한 자산이 없습니다. 추가해주세요
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          position: "absolute",
          top: "15rem",
          backgroundColor: "white",
          height: "55vh",
          width: "55vw",
          left: "40vw",
          borderRadius: "1rem",
        }}
      >
        <Line options={options} data={data2}></Line>
      </div>
    );
  }
}

export default Dashboard_PfRetLinBox;
