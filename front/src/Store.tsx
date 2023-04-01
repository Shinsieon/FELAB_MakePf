import {
  createAction,
  createReducer,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import Dashboard from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";
import { createStore } from "redux";

const SET_DASHBOARD = createAction("DASHOBOARD");
const SET_PORTFOLIO = createAction("PORTFOLIO");
export const screenChanger = {
  SET_DASHBOARD,
  SET_PORTFOLIO,
};

const scrReducer = (state = <Dashboard />, action: any) => {
  console.log(action);
  switch (action.type) {
    case SET_DASHBOARD.type:
      return <Dashboard />;
    case SET_PORTFOLIO.type:
      return <Portfolio />;
    default:
      return <Dashboard />;
  }
};
export const scrStore = createStore(scrReducer);
export type scrState = ReturnType<typeof scrReducer>;
// interface Iasset {
//   stock: string;
//   weight: number;
//   amount: number;
// }
// const assetReducer = createReducer([], {});
// export const assetStore = createStore(assetReducer);
