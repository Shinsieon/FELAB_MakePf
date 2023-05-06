//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
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
import configData from "../config.json";

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
    if (tempAssets.length === 0) {
      alert("자산 정보가 없습니다");
      return;
    }
    if (tempAssets.filter((item) => item.amount <= 0).length > 0)
      alert("투자금액이 0원인 자산이 있습니다.");
    axios
      .post(configData.LOCAL_IP + ":8000/saveUserAsset", {
        email: localStorage.getItem("userEmail"),
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
    return (
      <td colSpan={6} className="text-center">
        자산 정보가 없습니다
      </td>
    );
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
    <div className="absolute w-[40vw] h-[60vh] top-28 left-16">
      <div className="bg-white rounded-xl p-3 md:h-full overflow-auto">
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
                      size="25"
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
      <div className="bg-sky-500 opacity-90 rounded-xl p-3 h-14 flex justify-evenly text-white mt-3">
        <p>종목 수 {tempAssets.length}</p>
        <p>투자금액 {amountSum} 원</p>
        <p>투자기간 {period} 개월</p>
        {isSaved ? (
          <AiFillCheckSquare size={25} color="black"></AiFillCheckSquare>
        ) : (
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold px-4 border border-gray-400 rounded shadow"
            onClick={() => {
              saveBtnClicked();
            }}
          >
            Save!
          </button>
        )}
      </div>
    </div>
  );
}

export default Portfolio_Table;
