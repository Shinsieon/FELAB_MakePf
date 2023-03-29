import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "./Modal";
import { Iasset } from "./Dashboard";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
const Dashboard_PfPieBox = ({ assets }: { assets: Iasset[] }) => {
  const [assetModalOpen, setAssetModelOpen] = useState(false);
  const [mouseOn, setMouseOn] = useState(false);
  const showModal = () => {
    console.log("modal open");
    setAssetModelOpen(true);
  };

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
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
          width: "30vw",
          left: "3rem",
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
            onClick={showModal}
          />
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
        height: "55vh",
        width: "30vw",
        left: "3rem",
        borderRadius: "1rem",
      }}
    >
      <Pie data={data}></Pie>
    </div>
  );
};
function mapStateToProps(state: JSX.Element) {
  return { currentScr: state };
}
export default connect(mapStateToProps)(Dashboard_PfPieBox);
