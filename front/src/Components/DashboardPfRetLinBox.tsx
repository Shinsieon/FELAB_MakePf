import { Line } from "react-chartjs-2";
import { Iasset } from "./Dashboard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { screenChanger } from "../Store";
import fetchApi from "../httpFetch";
import { getUserInfo } from "../Cookie";

const numberToMonth = (month: string) => {
  switch (month) {
    case "1":
      return "Jan";
    case "2":
      return "Feb";
    case "3":
      return "Mar";
    case "4":
      return "Apr";
    case "5":
      return "May";
    case "6":
      return "Jun";
    case "7":
      return "Jul";
    case "8":
      return "Aug";
    case "9":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";
  }
};

function DashboardPfRetLinBox() {
  const assets: Iasset[] = useSelector((state: any) => state.assetReducer);
  const [labels, setLabels] = useState<string[]>([]);
  const [retMean, setRetMean] = useState<string[]>([]);
  const getUserAssetRetArray = async () => {
    let result = await fetchApi("getUserAssetRetArray", "POST", {
      userInfo: getUserInfo(),
    });
    if (result.success) {
      setLabels(
        result.date.map((item: string) =>
          numberToMonth(item.split(".")[1].replace(" ", ""))
        )
      );
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
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        ticks: {
          font: {
            size: 10,
            color: "red",
          },
        },
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
      <div>
        <p className="font-bold text-gray-800 text-xl h-[4vh]"> </p>
        <div
          className="bg-gray-800 rounded-xl md:flex place-items-center text-white flex-col justify-center h-[20vh]"
          onClick={changeScreenToPf}
        >
          <p className="text-sm text-center">
            보유한 자산이 없습니다. 추가해주세요
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p className="font-bold text-gray-800 text-xl"></p>
        <div className="bg-white rounded-xl">
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
      </div>
    );
  }
}

export default DashboardPfRetLinBox;
