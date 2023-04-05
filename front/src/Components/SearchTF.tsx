import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios, { all } from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { assetChanger, TEMP_assetChanger } from "../Store";

type stockType = {
  code: string;
  name: string;
};
const StyledUl = styled.ul`
  position: absolute;
  top: 5rem;
  height: 55vh;
  width: 95%;
  list-style: none;
  text-align: left;
  font-size: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1rem;
  padding: 0 1rem;
  margin: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
function SearchTF() {
  const [searchTxt, setSearchTxt] = useState("");
  const [allStocks, setAllStocks] = useState<stockType[]>([]);
  const [findedStocks, setFindedStocks] = useState<stockType[]>([]);
  const dispatch = useDispatch();
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
  const addToTempAsset = (code: string) => {
    console.log(code);
    console.log(TEMP_assetChanger);
    dispatch(assetChanger.ADD_ASSET());
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
        <StyledUl>
          {findedStocks.map((item) => (
            <div
              style={{ display: "flex", margin: "10px", width: "100%" }}
              key={item.code.toString()}
            >
              <li
                style={{
                  margin: 0,
                  height: "1.5rem",
                  width: "70%",
                  overflow: "hidden",
                }}
              >
                {item.code + "  " + item.name}
              </li>
              <button
                style={{
                  width: "3rem",
                  height: "1.5rem",
                  margin: 0,
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 83, 73, 0.7)",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "white",
                }}
                onClick={() => addToTempAsset(item.code.toString())}
              >
                담기
              </button>
            </div>
          ))}
        </StyledUl>
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
}
export default SearchTF;
