import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios, { all } from "axios";

type stockType = {
  code: string;
  name: string;
};
function SearchTF() {
  const [searchTxt, setSearchTxt] = useState("");
  const [allStocks, setAllStocks] = useState<stockType[]>([]);
  const [findedStocks, setFindedStocks] = useState<stockType[]>([]);
  const changeText = (e: any) => {
    setSearchTxt(e.target.value);
    setFindedStocks(
      allStocks.filter(
        (item) =>
          item.name.includes(e.target.value) ||
          item.code.includes(e.target.value)
      )
    );
  };
  useEffect(() => {
    axios.get("http://localhost:8000/getAllStocks").then((response) => {
      if (response.status == 200) {
        const dataToArr: stockType[] = [];
        Object.keys(response.data).map((item, idx) => {
          dataToArr.push({ code: item, name: response.data[item] });
        });
        setAllStocks(dataToArr);
      }
    });
  }, []);
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
        onChange={changeText}
      ></input>
      {searchTxt !== "" ? (
        <ul
          style={{
            position: "absolute",
            top: "5rem",
            height: "60vh",
            listStyle: "none",
            textAlign: "left",
            fontSize: "1rem",
            overflow: "auto",
            borderRadius: "1rem",
          }}
        >
          {findedStocks.map((item) => (
            <li
              style={{
                margin: "0.5rem",
                height: "1.5rem",
              }}
              key={item.code.toString()}
            >
              {item.code + "  " + item.name}
            </li>
          ))}
        </ul>
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
}
export default SearchTF;
