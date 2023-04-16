import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./Modal";
import { Iasset } from "./Dashboard";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { screenChanger } from "../Store";
import { getRandomColor } from "../RandomColorGenerator";
import axios from "axios";

type pieDataType = {
  labels: string[];
  data: string[];
  colors: string[];
};

const Dashboard_PfPieBox = () => {
  const assets = useSelector((state: any) => state.assetReducer);
  const [pieData, setPieData] = useState<pieDataType>({
    labels: [],
    data: [],
    colors: [],
  });
  const [assetModalOpen, setAssetModelOpen] = useState(false);
  const [mouseOn, setMouseOn] = useState(false);
  const dispatch = useDispatch();
  const changeScreenToPf = () => {
    dispatch({ type: screenChanger.SET_PORTFOLIO });
  };

  useEffect(() => {
    var labels = [];
    var data = [];
    var colors = [];
    for (var i = 0; i < assets.length; i++) {
      labels.push(assets[i].name);
      data.push(assets[i].weight);
      colors.push(getRandomColor());
    }
    setPieData({
      labels: labels,
      data: data,
      colors: colors,
    });
  }, []);

  const data = {
    labels: pieData["labels"],
    datasets: [
      {
        label: "# of Votes",
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
        onMouseEnter={() => setMouseOn(true)}
        onMouseLeave={() => setMouseOn(false)}
        onClick={changeScreenToPf}
        style={{
          position: "absolute",
          top: "15rem",
          backgroundColor: mouseOn ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)",
          height: "50vh",
          width: "30vw",
          left: "3rem",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            marginTop: "7rem",
          }}
        >
          <AiOutlinePlusCircle size={"5rem"} color={"white"} />
          <p style={{ color: "white", fontSize: "1rem" }}>
            보유한 자산이 없습니다. 추가해주세요
          </p>
          {assetModalOpen && <Modal setAssetModalOpen={setAssetModelOpen} />}
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        top: "15rem",
        backgroundColor: "white",
        height: "50vh",
        width: "30vw",
        left: "3rem",
        borderRadius: "1rem",
      }}
    >
      <Pie data={data}></Pie>
    </div>
  );
};
export default Dashboard_PfPieBox;
