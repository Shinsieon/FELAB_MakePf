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
const SET_ASSET = "assetReducer/SET_ASSET";
const ADD_ASSET = "assetReducer/ADD_ASSET";
const DELETE_ASSET = "assetReducer/DELETE_ASSET";
const MODIFY_AMOUNT_ASSET = "assetReducer/MODIFY_AMOUNT_ASSET";
const MODIFY_WEIGHT_ASSET = "assetReducer/MODIFY_WEIGHT_ASSET";
const MODIFY_INVESTMENTPERIOD_ASSET =
  "assetReducer/MODIFY_INVESTMENTPERIOD_ASSET";

export const assetChanger = {
  SET_ASSET,
  ADD_ASSET,
  DELETE_ASSET,
  MODIFY_AMOUNT_ASSET,
  MODIFY_WEIGHT_ASSET,
  MODIFY_INVESTMENTPERIOD_ASSET,
};

export const assetReducer = (state: Iasset[] = [], payload: any) => {
  var newState = [...state];
  switch (payload.type) {
    case SET_ASSET:
      return [...payload];
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
    case DELETE_ASSET:
      return state.filter((item) => item.code !== payload.code);
    case MODIFY_AMOUNT_ASSET:
      var index = newState.findIndex((item) => item.code === payload.code);
      newState[index].amount = payload.amount;
      return newState;
    case MODIFY_WEIGHT_ASSET:
      var index = newState.findIndex((item) => item.code === payload.code);
      newState[index].weight = payload.weight;
      return newState;
    case MODIFY_INVESTMENTPERIOD_ASSET:
      var index = newState.findIndex((item) => item.code === payload.code);
      newState[index].investmentPeriod = payload.investmentPeriod;
      return newState;
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
