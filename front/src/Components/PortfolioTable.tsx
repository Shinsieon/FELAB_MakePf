//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Iasset } from "./Dashboard";
import { getMyStocks } from "./Dashboard";
import { assetChanger } from "../Store";
import { AiFillDelete } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

import SearchTF from "./SearchTF";
function Portfolio_Table() {
  const assets = useSelector((state: any) => state.assetReducer);
  const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);
  const [amountSum, setAmountSum] = useState(0);
  const [period, setPeriod] = useState(0);

  const dispatch = useDispatch();
  const addBtnToggle = () => {
    setIsAddBtnClicked((prev) => !prev);
  };
  const deleteAsset = (code: string) => {
    dispatch({ type: assetChanger.DELETE_ASSET, code: code });
  };
  const inputChanged = (code: string, e: any) => {
    e.target.value = e.target.value === "" ? 0 : parseInt(e.target.value);
    switch (e.target.id) {
      case "amountField":
        dispatch({
          type: assetChanger.MODIFY_AMOUNT_ASSET,
          code: code,
          amount: e.target.value,
        });
        break;

      case "investmentPeriodField":
        dispatch({
          type: assetChanger.MODIFY_INVESTMENTPERIOD_ASSET,
          code: code,
          investmentPeriod: e.target.value,
        });
        break;
    }
  };
  const saveBtnClicked = () => {
    if (assets.length === 0) return;
    axios
      .post("http://localhost:8000/saveUserAsset", {
        email: localStorage.getItem("userMail"),
        userToken: localStorage.getItem("access_token"),
        assets: assets,
      })
      .then((response) => {
        getMyStocks(dispatch);
      });
  };
  const noData = (): JSX.Element => {
    return <td colSpan={6}>자산 정보가 없습니다</td>;
  };
  useEffect(() => {
    if (assets.length > 0) {
      var total = 0;
      var period = 0;
      for (var i = 0; i < assets.length; i++) {
        total += parseInt(assets[i].amount);
        if (assets[i].investmentPeriod > period)
          period = assets[i].investmentPeriod;
      }
      setAmountSum(total ? total : 0);
      setPeriod(period);
    } else {
      setAmountSum(0);
      setPeriod(0);
    }
  }, [assets, amountSum]);
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
        {isAddBtnClicked ? <SearchTF></SearchTF> : ""}
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
            {assets.length > 0 ? (
              assets.map((item: Iasset) => (
                <tr key={item.code.toString()}>
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
        <p>종목 수 {assets.length}</p>
        <p>투자금액 {amountSum} 원</p>
        <p>투자기간 {period} 개월</p>
        <Button
          size="sm"
          variant="dark"
          onClick={() => {
            saveBtnClicked();
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
}

export default Portfolio_Table;
