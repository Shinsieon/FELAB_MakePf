import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { screenChanger } from "../Store";
import { getRandomColor } from "../RandomColorGenerator";

type pieDataType = {
  labels: string[];
  data: number[];
  colors: string[];
};

const Dashboard_PfPieBox = () => {
  const assets = useSelector((state: any) => state.assetReducer);
  const [pieData, setPieData] = useState<pieDataType>({
    labels: [],
    data: [],
    colors: [],
  });
  const dispatch = useDispatch();
  const changeScreenToPf = () => {
    dispatch({ type: screenChanger.SET_PORTFOLIO });
  };
  useEffect(() => {
    var labels = [];
    var data_ = [];
    var colors = [];
    for (var i = 0; i < assets.length; i++) {
      labels.push(assets[i].name);
      data_.push(assets[i].amount);
      colors.push(getRandomColor());
    }
    setPieData({
      labels: labels,
      data: data_,
      colors: colors,
    });
  }, [assets]);

  const data = {
    labels: pieData["labels"],
    datasets: [
      {
        label: "투자금액",
        data: pieData.data,
        backgroundColor: pieData.colors,
        borderColor: pieData.colors,
        borderWidth: 1,
      },
    ],
  };
  if (assets.length === 0) {
    return (
      <div
        className="absolute top-60 bg-gray-600 h-50 w-1/3 left-12 rounded-lg md:flex place-items-center hover:bg-gray-500 text-white flex-col justify-center"
        onClick={changeScreenToPf}
      >
        <AiOutlinePlusCircle size={"5rem"} color={"white"} />
        <p>보유한 자산이 없습니다. 추가해주세요</p>
      </div>
    );
  }
  return (
    <div className="absolute top-60 bg-white h-50 w-1/3 left-12 rounded-lg md:flex">
      <Pie data={data}></Pie>
    </div>
  );
};
export default Dashboard_PfPieBox;
