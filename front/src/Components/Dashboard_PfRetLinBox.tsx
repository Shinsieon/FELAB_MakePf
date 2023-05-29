import { Line } from "react-chartjs-2";
import { Iasset } from "./Dashboard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { screenChanger } from "../Store";
import fetchApi from "../httpFetch";
import { getUserInfo } from "../Cookie";

function Dashboard_PfRetLinBox() {
  const assets: Iasset[] = useSelector((state: any) => state.assetReducer);
  const [labels, setLabels] = useState<string[]>([]);
  const [retMean, setRetMean] = useState<string[]>([]);
  const getUserAssetRetArray = async () => {
    let result = await fetchApi("getUserAssetRetArray", "POST", {
      userInfo: getUserInfo(),
    });
    if (result.success) {
      setLabels(result.date);
      setRetMean(result.mean.map((item: any) => item * 100));
    }
  };
  const dispatch = useDispatch();
  const changeScreenToPf = () => {
    dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  useEffect(() => {
    getUserAssetRetArray();
  }, []);
  const options = {
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        padding: 20,
        text: "Portfolio Returns(%)",
        font: { size: 15 },
      },
    },
  };
  if (assets.length === 0) {
    return (
      <div
        className="absolute top-[7rem] bg-gray-600 h-52 w-1/3 right-10 rounded-lg md:flex place-items-center hover:bg-gray-500 text-white flex-col justify-center"
        onClick={changeScreenToPf}
      >
        <AiOutlinePlusCircle
          size={"5rem"}
          color={"white"}
          onClick={() => console.log("click")}
        />
        <p>보유한 자산이 없습니다. 추가해주세요</p>
      </div>
    );
  } else {
    return (
      <div className="absolute top-[7rem] bg-white h-52 w-1/3 right-10 rounded-lg md:flex">
        <Line
          options={options}
          data={{
            labels,
            datasets: [
              {
                label: "포트폴리오 평균 수익률(%)",
                data: retMean,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                pointBorderWidth: 0,
                fill: true,
              },
            ],
          }}
        ></Line>
      </div>
    );
  }
}

export default Dashboard_PfRetLinBox;
