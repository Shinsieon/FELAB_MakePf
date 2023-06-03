import { useSelector } from "react-redux";
import PortfolioTable from "./PortfolioTable";

function DashboardAssets() {
  return (
    <div className="absolute top-[25vh] h-[60vh] left-12 md:w-1/2 flex bg-white rounded">
      <PortfolioTable />
    </div>
  );
}

export default DashboardAssets;
