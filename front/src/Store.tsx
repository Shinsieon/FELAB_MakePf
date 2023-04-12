import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import Dashboard, { Iasset } from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";
import { createStore, combineReducers } from "redux";

const SET_DASHBOARD = "screenReducer/DASHBOARD";
const SET_PORTFOLIO = "screenReducer/PORTFOLIO";
export const screenChanger = {
  SET_DASHBOARD,
  SET_PORTFOLIO,
};
const scrReducer = (state = <Dashboard />, action: any) => {
  switch (action.type) {
    case SET_DASHBOARD:
      return <Dashboard />;
    case SET_PORTFOLIO:
      return <Portfolio />;
    default:
      return state;
  }
};

const ADD_ASSET = "assetReducer/ADD_ASSET";
const DELETE_ASSET = "assetReducer/DELETE_ASSET";

export const assetChanger = {
  ADD_ASSET,
  DELETE_ASSET,
};

const assetReducer = (state: Iasset[] = [], payload: any) => {
  switch (payload.type) {
    case ADD_ASSET:
      if (state.filter((item) => item.code === payload.code).length === 0) {
        return [
          {
            code: payload.code,
            stock: payload.stock,
            weight: payload.weight,
            amount: payload.amount,
            investmentPeriod: payload.investmentPeriod,
          },
          ...state,
        ];
      } else return state;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  assetReducer,
  scrReducer,
});
export const store = createStore(rootReducer);

export type scrState = ReturnType<typeof scrReducer>;
export type assetState = ReturnType<typeof assetReducer>;

// const assetReducer = createReducer([], {});
// export const assetStore = createStore(assetReducer);
