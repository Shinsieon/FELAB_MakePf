import { createStore } from "redux";
import Dashboard from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";

const DASHBOARD = "DashBoard";
const PORTFOLIO = "Portfolio";

const reducer = (state = <Dashboard />, action: any) => {
  switch (action.type) {
    case DASHBOARD:
      return <Dashboard />;
    case PORTFOLIO:
      return <Portfolio />;
    default:
      return <Dashboard />;
  }
};
const Store = createStore(reducer);

export default Store;
