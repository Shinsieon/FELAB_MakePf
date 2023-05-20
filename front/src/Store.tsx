import Dashboard, { Iasset } from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

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

const TOKEN_TIME_OUT = 600 * 1000;

const SET_ASSET = "assetReducer/SET_ASSET";
export const assetChanger = {
  SET_ASSET,
};
export const assetReducer = (state: Iasset[] = [], payload: any) => {
  switch (payload.type) {
    case SET_ASSET:
      return [...payload.asset];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  assetReducer,
  scrReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type scrState = ReturnType<typeof scrReducer>;
export type assetState = ReturnType<typeof assetReducer>;

// const assetReducer = createReducer([], {});
// export const assetStore = createStore(assetReducer);
