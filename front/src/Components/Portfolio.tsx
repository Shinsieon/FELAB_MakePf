import Profile from "./Profile";
import PortfolioTable from "./PortfolioTable";
import Performance from "./Performance";
import Visitor from "./Visitor";
function Portfolio() {
  return (
    <div>
      <Profile></Profile>
      <PortfolioTable></PortfolioTable>
      <Performance></Performance>
      <Visitor></Visitor>
    </div>
  );
}
export default Portfolio;
