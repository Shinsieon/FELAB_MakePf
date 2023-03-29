import { createStore } from "redux";
import Dashboard from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";

const DASHBOARD = "DashBoard";
const PORTFOLIO = "Portfolio";

const scrReducer = (state = <Dashboard />, action: any) => {
  switch (action.type) {
    case DASHBOARD:
      return <Dashboard />;
    case PORTFOLIO:
      return <Portfolio />;
    default:
      return <Dashboard />;
  }
};
export const scrStore = createStore(scrReducer);
