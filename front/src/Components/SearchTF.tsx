import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
function SearchTF() {
  const [searchTxt, setSearchTxt] = useState("");

  return (
    <div>
      <AiOutlineSearch
        style={{
          position: "absolute",
          top: "2.4rem",
          left: "2rem",
          zIndex: 2,
        }}
      />
      <input
        placeholder="찾으시는 종목을 검색해주세요"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.8rem",
          width: "80%",
          padding: "1rem 1.5rem",
          borderRadius: "1rem",
          border: "none",
          backgroundColor: "#eee",
          boxSizing: "border-box",
          zIndex: 1,
        }}
      ></input>
    </div>
  );
}

export default SearchTF;
