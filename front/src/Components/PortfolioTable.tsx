//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Iasset } from "./Dashboard";
import { getMyStocks } from "./Dashboard";
import {
  AiFillDelete,
  AiFillCheckSquare,
  AiFillPlusCircle,
} from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

import SearchTF from "./SearchTF";
function Portfolio_Table() {
  const assets: Iasset[] = useSelector((state: any) => state.assetReducer);
  const [tempAssets, setTempAssets] = useState<Iasset[]>([...assets]);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [amountSum, setAmountSum] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [period, setPeriod] = useState(0);

  const dispatch = useDispatch();
  const addBtnToggle = () => {
    setIsAddBtnClicked((prev) => !prev);
  };
  const deleteAsset = (code: string) => {
    setTempAssets(tempAssets.filter((item) => item.code !== code));
    //dispatch({ type: assetChanger.DELETE_ASSET, code: code });
  };
  const inputChanged = (code: string, e: any) => {
    e.target.value = e.target.value === "" ? 0 : parseInt(e.target.value);
    var inputValue = parseInt(e.target.value);
    var tempArr = [...tempAssets];
    var obj = tempArr.find((item) => item.code === code);
    if (obj) {
      if (e.target.id === "amountField") obj.amount = inputValue;
      else obj.investmentPeriod = inputValue;
      setTempAssets(tempArr);
    }
  };
  const saveBtnClicked = () => {
    if (tempAssets.length === 0) return;
    if (tempAssets.filter((item) => item.amount <= 0).length > 0)
      alert("투자금액이 0원인 자산이 있습니다.");
    axios
      .post("http://localhost:8000/saveUserAsset", {
        email: localStorage.getItem("userMail"),
        userToken: localStorage.getItem("access_token"),
        assets: tempAssets,
      })
      .then((response) => {
        if (response.status === 200) {
          getMyStocks(dispatch);
          setIsSaved(true);
          setTimeout(() => {
            setIsSaved(false);
          }, 1000);
        } else setIsSaved(false);
      });
  };
  const noData = (): JSX.Element => {
    return <td colSpan={6}>자산 정보가 없습니다</td>;
  };
  useEffect(() => {
    if (tempAssets.length > 0) {
      var total = 0;
      var period = 0;
      for (var i = 0; i < tempAssets.length; i++) {
        total += tempAssets[i].amount;
        if (tempAssets[i].investmentPeriod > period)
          period = tempAssets[i].investmentPeriod;
      }
      setAmountSum(total ? total : 0);
      setPeriod(period);
    } else {
      setAmountSum(0);
      setPeriod(0);
    }
  }, [tempAssets]);
  return (
    <div
      style={{
        position: "absolute",
        width: "40vw",
        height: "70vh",
        top: "7rem",
        left: "3rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          fontSize: "1rem",
          padding: "10px",
          height: "65vh",
          overflowY: "auto",
        }}
      >
        {isAddBtnClicked ? (
          <SearchTF
            tempAssets={tempAssets}
            setTempAssets={setTempAssets}
          ></SearchTF>
        ) : (
          ""
        )}
        <AiFillPlusCircle
          size="40"
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "0",
            top: "0",
          }}
          onClick={() => {
            addBtnToggle();
          }}
        ></AiFillPlusCircle>
        <Table striped size="sm" responsive="sm">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>종목명</th>
              <th style={{ width: "40%" }}>금액(원)</th>
              <th style={{ width: "30%" }}>투자기간(m)</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "scroll" }}>
            {tempAssets.length > 0 ? (
              tempAssets.map((item: Iasset, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <th>
                    <div>
                      <Form.Control
                        type="number"
                        size="sm"
                        placeholder={item.amount.toString()}
                        id="amountField"
                        defaultValue={item.amount}
                        onChange={(e: any) => {
                          inputChanged(item.code, e);
                        }}
                      ></Form.Control>
                    </div>
                  </th>
                  <th>
                    <Form.Control
                      type="number"
                      size="sm"
                      placeholder={item.investmentPeriod.toString()}
                      id="investmentPeriodField"
                      onChange={(e: any) => {
                        inputChanged(item.code, e);
                      }}
                    ></Form.Control>
                  </th>
                  <th>
                    <AiFillDelete
                      onClick={() => {
                        deleteAsset(item.code);
                      }}
                    ></AiFillDelete>
                  </th>
                </tr>
              ))
            ) : (
              <tr>{noData()}</tr>
            )}
          </tbody>
        </Table>
      </div>
      <div
        style={{
          backgroundColor: "rgba(53, 162, 235, 0.8)",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          padding: "10px",
          height: "3rem",
          maxHeight: "3rem",
          margin: "10px 0",
          color: "white",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <p>종목 수 {tempAssets.length}</p>
        <p>투자금액 {amountSum} 원</p>
        <p>투자기간 {period} 개월</p>
        {isSaved ? (
          <AiFillCheckSquare size={25} color="black"></AiFillCheckSquare>
        ) : (
          <button
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
            onClick={() => {
              saveBtnClicked();
            }}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Portfolio_Table;
