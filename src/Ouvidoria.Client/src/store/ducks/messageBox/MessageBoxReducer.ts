import { Reducer } from "redux";
import { IMessageBoxState, MessageBoxTypes } from "./MessageBoxTypes";

const INITIAL_STATE: IMessageBoxState = {
  open: false,
  message: ""
};

const reducer: Reducer = (state: IMessageBoxState = INITIAL_STATE, action) => {
  switch (action.type) {
    case MessageBoxTypes.Show:
      return { open: true, message: action.payload.message };
    case MessageBoxTypes.Hide:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
