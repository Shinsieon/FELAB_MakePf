import { Line } from "react-chartjs-2";
import { Iasset } from "./Dashboard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { screenChanger } from "../Store";
import { getRandomColor } from "../RandomColorGenerator";
import axios from "axios";
import { FaAlignJustify } from "react-icons/fa";

function Dashboard_PfRetLinBox() {
  const assets: Iasset[] = useSelector((state: any) => state.assetReducer);
  const [labels, setLabels] = useState<string[]>([]);
  const [retMean, setRetMean] = useState<string[]>([]);
  const [mouseOn, setMouseOn] = useState(false);
  const getUserAssetRetArray = () => {
    console.log("clasd");
    axios
      .post("http://localhost:8000/getUserAssetRetArray", {
        email: localStorage.getItem("userMail"),
        userToken: localStorage.getItem("access_token"),
      })
      .then((response) => {
        setLabels(response.data.date);
        setRetMean(response.data.mean);
      });
  };
  const dispatch = useDispatch();
  const changeScreenToPf = () => {
    dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  useEffect(() => {
    getUserAssetRetArray();
  }, []);
  const options = {
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Line
          options={options}
          data={{
            labels,
            datasets: [
              {
                label: "포트폴리오 평균 수익률",
                data: retMean,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        ></Line>
      </div>
    );
  }
}

export default Dashboard_PfRetLinBox;
