import { useState, useEffect } from "react";
import styled from "styled-components";
import { Iasset } from "./Dashboard";
import fetchApi from "../httpFetch";

type stockType = {
  code: string;
  name: string;
};
const StyledUl = styled.ul`
  position: absolute;
  top: 1.6rem;
  right: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  height: 40vh;
  width: 20vw;
  list-style: none;
  text-align: left;
  font-size: 1rem;
  color: white;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1rem;
  padding: 0 1rem;
  margin: 15px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
function SearchTF(props: any) {
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
  const addToAsset = (code: string, name: string) => {
    if (
      props.tempAssets.filter((item: Iasset) => item.code === code).length > 0
    )
      return;
    var nAssets: Iasset[] = [
      ...props.tempAssets,
      { code: code, name: name, amount: 0, weight: 0, investmentPeriod: 12 },
    ];

    props.setTempAssets(nAssets);
  };
  useEffect(() => {
    const getAllStocks = async () => {
      let result = await fetchApi("getAllStocks", "GET");
      result = await result
        .filter((item: any) => item.Market === "KOSPI")
        .map((item: any) => {
          return {
            code: item.Code,
            name: item.Name,
          };
        });
      await setAllStocks([...result]);
    };
    getAllStocks();
  }, []);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "2rem",
        marginBottom: "10px",
      }}
    >
      <input
        placeholder="찾으시는 종목을 검색해주세요"
        style={{
          position: "absolute",
          right: "3rem",
          width: "20vw",
          height: "2rem",
          fontSize: "0.8rem",
          padding: "1.3rem 1.5rem",
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
          {findedStocks.map((item, idx) => (
            <div
              style={{ display: "flex", margin: "10px", width: "100%" }}
              key={idx}
            >
              <li
                style={{
                  margin: 0,
                  height: "1.5rem",
                  width: "70%",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addToAsset(item.code.toString(), item.name.toString());
                  setSearchTxt("");
                }}
              >
                {item.code + "  " + item.name}
              </li>
            </div>
          ))}
        </StyledUl>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default SearchTF;
