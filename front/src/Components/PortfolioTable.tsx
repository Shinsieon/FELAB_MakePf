//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Iasset } from "./Dashboard";
import { assetChanger } from "../Store";
import { AiFillDelete } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { store } from "../Store";
function Portfolio_Table() {
  const assets = useSelector((state: any) => state.assetReducer);
  const [amountSum, setAmountSum] = useState(0);

  const dispatch = useDispatch();
  const deleteAsset = (code: string) => {
    dispatch({ type: assetChanger.DELETE_ASSET, code: code });
  };
  const amountChanged = (code: string, e: any) => {
    switch (e.target.id) {
      case "amountField":
        dispatch({
          type: assetChanger.MODIFY_AMOUNT_ASSET,
          code: code,
          amount: e.target.value,
        });
        break;
      case "weightField":
        dispatch({
          type: assetChanger.MODIFY_AMOUNT_ASSET,
          code: code,
          weight: e.target.value,
        });
        break;
      case "investmentPeriodField":
        dispatch({
          type: assetChanger.MODIFY_AMOUNT_ASSET,
          code: code,
          investmentPeriod: e.target.value,
        });
        break;
    }
  };
  const noData = (): JSX.Element => {
    return <td colSpan={6}>자산 정보가 없습니다</td>;
  };
  useEffect(() => {
    if (assets.length > 0) {
      var total = 0;
      for (var i = 0; i < assets.length; i++) {
        total += parseInt(assets[i].amount);
      }
      setAmountSum(total ? total : 0);
      console.log(amountSum);
    }
  }, [assets, amountSum]);
  return (
    <div
      style={{
        position: "absolute",
        width: "60vw",
        height: "35vh",
        top: "8rem",
        left: "32vw",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "1rem",
          fontSize: "1rem",
          padding: "10px",
          height: "35vh",
          overflowY: "auto",
        }}
      >
        <Table striped size="sm" responsive="sm">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>종목명</th>
              <th style={{ width: "20%" }}>비중</th>
              <th style={{ width: "30%" }}>금액(원)</th>
              <th style={{ width: "20%" }}>투자기간(개월)</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ overflowY: "scroll" }}>
            {assets.length > 0 ? (
              assets.map((item: Iasset) => (
                <tr key={item.code.toString()}>
                  <td>{item.stock}</td>
                  <td>
                    <Form.Range
                      onChange={(e) => console.log(e)}
                      min="1"
                      max="100"
                    ></Form.Range>
                  </td>
                  <th>
                    <div>
                      <Form.Control
                        type="number"
                        size="sm"
                        placeholder={item.amount.toString()}
                        id="amountField"
                        onChange={(e: any) => {
                          amountChanged(item.code, e);
                        }}
                      ></Form.Control>
                    </div>
                  </th>
                  <th>
                    <Form.Control
                      placeholder="개월수로 입력해주세요"
                      type="number"
                      size="sm"
                      value={item.investmentPeriod}
                      id="periodField"
                      onChange={() => {}}
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
      <Button
        variant="dark"
        style={{ position: "absolute", bottom: "10px", left: "10px" }}
      >
        저장
      </Button>
      <div
        style={{
          backgroundColor: "rgba(53, 162, 235, 0.8)",
          borderRadius: "0.5rem",
          fontSize: "1rem",
          padding: "10px",
          height: "7vh",
          margin: "10px 0",
          color: "white",
          display: "flex",
          flexDirection: "revert",
        }}
      >
        <h5>총 투자금액 {amountSum} 원</h5>
      </div>
    </div>
  );
}

export default Portfolio_Table;
