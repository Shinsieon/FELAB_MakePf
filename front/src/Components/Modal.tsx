import { useEffect } from "react";

function Modal({ setAssetModalOpen }: { setAssetModalOpen: Function }) {
  const closeModal = () => {
    setAssetModalOpen(false);
  };
  useEffect(() => {}, []);
  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        zIndex: "999",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "gray",
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <h1 onClick={closeModal}>hello</h1>
    </div>
  );
}

export default Modal;
