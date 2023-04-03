import SearchTF from "./SearchTF";
function MyAssetList() {
  return (
    <div
      style={{
        position: "absolute",
        top: "8rem",
        left: "3rem",
        width: "25vw",
        height: "70vh",
        backgroundColor: "white",
        borderRadius: "1rem",
      }}
    >
      <SearchTF></SearchTF>
    </div>
  );
}

export default MyAssetList;
