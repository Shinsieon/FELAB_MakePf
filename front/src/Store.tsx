import { configureStore, createAction } from "@reduxjs/toolkit";
import Dashboard from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";
import { createStore, combineReducers } from "redux";

const SET_DASHBOARD = createAction("DASHOBOARD");
const SET_PORTFOLIO = createAction("PORTFOLIO");
export const screenChanger = {
  SET_DASHBOARD,
  SET_PORTFOLIO,
};
const scrReducer = (state = <Dashboard />, action: any) => {
  switch (action.type) {
    case SET_DASHBOARD.type:
      return <Dashboard />;
    case SET_PORTFOLIO.type:
      return <Portfolio />;
    default:
      return <Dashboard />;
  }
};

export type Iasset = {
  code: string;
  stock: string;
  weight: number;
  amount: number;
  investmentPeriod: number;
};
const ADD_ASSET = createAction("ADD_ASSET");
const DELETE_ASSET = createAction("DELETE_ASSET");

export const assetChanger = {
  ADD_ASSET,
  DELETE_ASSET,
};

const assetReducer = (state: Iasset[] = [], action: any) => {
  switch (action.type) {
    case ADD_ASSET.type:
      return [
        {
          code: action.code,
          stock: action.name,
          weight: action.weight,
          amount: action.amount,
          investmentPeriod: action.investmentPeriod,
        },
        ...state,
      ];
    default:
      return state;
  }
};

const TEMP_ADD_ASSET = createAction("TEMP_ADD_ASSET");
const TEMP_DELETE_ASSET = createAction("TEMP_DELETE_ASSET");

export const TEMP_assetChanger = {
  TEMP_ADD_ASSET,
  TEMP_DELETE_ASSET,
};
const tempAssetReducer = (state: Iasset[] = [], action: any) => {
  switch (action.type) {
    case TEMP_ADD_ASSET.type:
      console.log(action);
      return [
        {
          stock: action.name,
          weight: action.weight,
          amount: action.amount,
          investmentPeriod: action.investmentPeriod,
        },
        ...state,
      ];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  assetReducer,
  scrReducer,
  tempAssetReducer,
});
export const store = createStore(rootReducer);

export type scrState = ReturnType<typeof scrReducer>;
export type assetState = ReturnType<typeof assetReducer>;

// const assetReducer = createReducer([], {});
// export const assetStore = createStore(assetReducer);
