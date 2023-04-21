import moveLeft from "../assets/images/move-left.png";
import moveRight from "../assets/images/move-right.png";
import { useState } from "react";

function Visitor() {
  const [isClick, setIsClick] = useState(false);
  const clickedToggle = () => {
    setIsClick((prev) => !prev);
  };
  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: isClick ? "15vw" : "-0.5vw",
          top: "50%",
          transform: "translate(0,-50%)",
          cursor: "pointer",
          width: "3vw",
          height: "6vh",
          backgroundColor: "#dddddd",
          borderRadius: "5rem",
          zIndex: 2,
          WebkitTransition: "right 1s ease-in-out",
        }}
      >
        <img
          src={isClick ? moveRight : moveLeft}
          style={{ width: "100%", height: "100%" }}
          onClick={() => clickedToggle()}
          alt="눌러서 방명록을 확인해주세요!"
        ></img>
      </div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.8",
          width: "15vw",
          height: "70vh",
          borderRadius: "1rem",
          position: "absolute",
          right: isClick ? "1vw" : "-14.5vw",
          top: "8rem",
          zIndex: 1,
          WebkitTransition: "right 1s ease-in-out",
        }}
      ></div>
    </div>
  );
}

export default Visitor;
