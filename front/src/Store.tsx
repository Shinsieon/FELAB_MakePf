import {
  createAction,
  createReducer,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import Dashboard from "./Components/Dashboard";
import Portfolio from "./Components/Portfolio";

const setScreenToDashboard = createAction("DashBoard");
const setScreenToPortfolio = createAction("Portfolio");
export const screenChanger = {
  setScreenToDashboard,
  setScreenToPortfolio,
};
const scrReducer = createReducer(<Dashboard />, (builder) => {
  builder
    .addCase(setScreenToDashboard, (state) => {
      console.log("here~");
      state = <Dashboard />;
    })
    .addCase(setScreenToPortfolio, (state) => {
      console.log("here~ss");
      state = <Portfolio />;
    });
});
export const scrStore = configureStore({
  reducer: scrReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
// interface Iasset {
//   stock: string;
//   weight: number;
//   amount: number;
// }
// const assetReducer = createReducer([], {});
// export const assetStore = createStore(assetReducer);
