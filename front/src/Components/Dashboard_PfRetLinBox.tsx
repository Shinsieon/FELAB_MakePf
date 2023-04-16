import { Line } from "react-chartjs-2";
import { Iasset } from "./Dashboard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { screenChanger } from "../Store";
import { getRandomColor } from "../RandomColorGenerator";
import axios from "axios";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "자산별 수익률 변동 그래프",
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
function Dashboard_PfRetLinBox() {
  const assets: Iasset[] = useSelector((state: any) => state.assetReducer);
  const [mouseOn, setMouseOn] = useState(false);
  const getUserAssetReturn = () => {
    axios.get("http://localhost:8000/getUserAssetReturn").then((response) => {
      console.log(response);
    });
  };
  const dispatch = useDispatch();
  const changeScreenToPf = () => {
    dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  useEffect(() => {
    getUserAssetReturn();
  }, []);
  if (assets.length === 0) {
    return (
      <div
        onMouseEnter={() => setMouseOn(true)}
        onMouseLeave={() => setMouseOn(false)}
        onClick={changeScreenToPf}
        style={{
          position: "absolute",
          top: "15rem",
          backgroundColor: mouseOn ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)",
          height: "50vh",
          width: "55vw",
          left: "40vw",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            marginTop: "7rem",
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
          height: "50vh",
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
