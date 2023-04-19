import Profile from "./Profile";
import MyAssetList from "./MyAssetList";
import PortfolioTable from "./PortfolioTable";
import Performance from "./Performance";
function Portfolio() {
  return (
    <div>
      <Profile></Profile>
      <MyAssetList></MyAssetList>
      <PortfolioTable></PortfolioTable>
      <Performance></Performance>
    </div>
  );
}
export default Portfolio;
