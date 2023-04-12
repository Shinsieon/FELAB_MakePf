//import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Iasset } from "./Dashboard";

function Portfolio_Table() {
  const assets = useSelector((state: any) => state.assetReducer);
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
      }}
    >
      <Table
        striped
        size="sm"
        responsive="sm"
        style={{
          fontSize: "1rem",
          width: "95%",
          margin: "1rem",
          border: "none",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>종목명</th>
            <th>비중</th>
            <th>금액</th>
            <th>투자기간</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((item: Iasset, key: number) => (
              <tr
                key={item.code.toString()}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  height: "2rem",
                }}
              >
                <td>{item.stock}</td>
                <td>
                  <Form.Range
                    onChange={(e) => console.log(e)}
                    min="1"
                    max="100"
                  ></Form.Range>
                </td>
                <th>
                  <Form.Control type="number"></Form.Control>
                </th>
                <th>
                  <Form.Control
                    placeholder="개월수로 입력해주세요"
                    type="number"
                  ></Form.Control>
                </th>
                <th>
                  <button>x</button>
                </th>
              </tr>
            ))
          ) : (
            <tr
              style={{
                height: "2rem",
              }}
            >
              {noData()}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Portfolio_Table;
