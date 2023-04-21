import Profile from "./Profile";
import MyAssetList from "./MyAssetList";
import PortfolioTable from "./PortfolioTable";
import Performance from "./Performance";
import Visitor from "./Visitor";
function Portfolio() {
  return (
    <div>
      <Profile></Profile>
      <MyAssetList></MyAssetList>
      <PortfolioTable></PortfolioTable>
      <Performance></Performance>
      <Visitor></Visitor>
    </div>
  );
}
export default Portfolio;
