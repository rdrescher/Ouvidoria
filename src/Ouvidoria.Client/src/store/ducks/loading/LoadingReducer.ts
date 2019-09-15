import { Reducer } from "redux";
import { ILoadingState, LoadingTypes } from "./LoadingTypes";

const initialState: ILoadingState = {
  loading: false
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LoadingTypes.SetLoading:
      return { loading: true };
    case LoadingTypes.SetLoaded:
      return { loading: false };
    default:
      return state;
  }
};

export default reducer;
