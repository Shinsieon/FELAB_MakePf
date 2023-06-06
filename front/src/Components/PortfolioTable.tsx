//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Iasset } from "./Dashboard";
import { getUserAssets } from "./Dashboard";
import {
  AiFillDelete,
  AiFillCheckSquare,
  AiFillPlusCircle,
} from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import fetchApi from "../httpFetch";

import SearchTF from "./SearchTF";
import { getUserInfo } from "../Cookie";
function PortfolioTable() {
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
  const saveBtnClicked = async () => {
    if (tempAssets.filter((item) => item.amount <= 0).length > 0) {
      alert("투자금액이 0원인 자산이 있습니다.");
      return;
    }
    let result = await fetchApi("saveUserAsset", "POST", {
      userInfo: getUserInfo(),
      assets: tempAssets,
    });
    console.log(result);
    if (result.success) {
      getUserAssets(dispatch);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 1000);
    } else setIsSaved(false);
  };
  useEffect(() => {
    setTempAssets(assets);
  }, [assets]);
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
    <div className="w-full h-full p-2 bg-white rounded-xl">
      {isAddBtnClicked ? (
        <div className="h-[10%] flex">
          <SearchTF
            tempAssets={tempAssets}
            setTempAssets={setTempAssets}
          ></SearchTF>
        </div>
      ) : (
        <div></div>
      )}
      <AiFillPlusCircle
        size="40"
        className="cursor-pointer absolute right-0 -top-5"
        onClick={() => {
          addBtnToggle();
        }}
      ></AiFillPlusCircle>
      <div className="h-[70%] overflow-y-auto">
        <Table size="sm" className="mt-2 ">
          <thead>
            <tr>
              <th className="w-[40%]">종목명</th>
              <th className="w-[30%]">금액(원)</th>
              <th className="w-[30%]">투자기간(m)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
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
              <tr>
                <th colSpan={6} className="text-center bg-white h-[10px]">
                  자산 정보가 없습니다.
                </th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="absolute bottom-5 h-[10%] w-[97%] flex justify-center">
        <BottomSumBar
          tempAssets={tempAssets}
          amountSum={amountSum}
          isSaved={isSaved}
          handleSaveClicked={saveBtnClicked}
        />
      </div>
    </div>
  );
}
function BottomSumBar({
  tempAssets,
  amountSum,
  isSaved,
  handleSaveClicked,
}: {
  tempAssets: Iasset[];
  amountSum: number;
  isSaved: boolean;
  handleSaveClicked: Function;
}) {
  return (
    <div className="mx-2 text-white bg-gray-800 font-medium rounded-lg text-sm px-1 py-2 dark:bg-gray-800 flex justify-evenly w-full dark:border-gray-700">
      <p>Assets {tempAssets.length}</p>
      <p>Total Amount {amountSum} 원</p>
      {isSaved ? (
        <AiFillCheckSquare size={25} color="black"></AiFillCheckSquare>
      ) : (
        <button
          type="button"
          className="w-[3rem] h-[1.5rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-3"
          onClick={() => {
            handleSaveClicked();
          }}
        >
          Save
        </button>
      )}
    </div>
  );
}
export default PortfolioTable;
