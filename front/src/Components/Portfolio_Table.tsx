import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
function Portfolio_Table() {
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
        style={{ fontSize: "1rem", width: "90%", margin: "1rem" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>종목명</th>
            <th>비중</th>
            <th>금액</th>
            <th>투자기간</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <th>1개월</th>
            <th>x</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Portfolio_Table;
