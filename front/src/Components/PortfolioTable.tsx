//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Iasset } from "./Dashboard";
import { assetChanger } from "../Store";
import { AiFillDelete } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
function Portfolio_Table() {
  const assets = useSelector((state: any) => state.assetReducer);
  const dispatch = useDispatch();
  const deleteAsset = (code: string) => {
    console.log(code);
    dispatch({ type: assetChanger.DELETE_ASSET, code: code });
  };
  const noData = (): JSX.Element => {
    return <td colSpan={6}>자산 정보가 없습니다</td>;
  };
  return (
    <div
      style={{
        position: "absolute",
        width: "45vw",
        height: "35vh",
        top: "8rem",
        left: "30vw",
        backgroundColor: "white",
        borderRadius: "1rem",
        fontSize: "1rem",
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <Table striped size="sm" responsive="sm">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>종목명</th>
            <th style={{ width: "20%" }}>비중</th>
            <th style={{ width: "30%" }}>금액</th>
            <th style={{ width: "20%" }}>투자기간</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
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
                  <Form.Control type="number" size="sm"></Form.Control>
                </th>
                <th>
                  <Form.Control
                    placeholder="개월수로 입력해주세요"
                    type="number"
                    size="sm"
                  ></Form.Control>
                </th>
                <th>
                  <AiFillDelete
                    onClick={() => {
                      deleteAsset(item.code);
                    }}
                  >
                    x
                  </AiFillDelete>
                </th>
              </tr>
            ))
          ) : (
            <tr>{noData()}</tr>
          )}
        </tbody>
      </Table>
      <Button variant="dark">저장</Button>
    </div>
  );
}

export default Portfolio_Table;
