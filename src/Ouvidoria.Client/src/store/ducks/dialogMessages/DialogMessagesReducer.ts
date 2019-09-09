import { Reducer } from "redux";
import {
  DialogMessagesTypes,
  IDialogMessagesState
} from "./DialogMessagesTypes";

const initialState: IDialogMessagesState = {
  isOpen: false,
  title: "",
  messages: []
};

const reducer: Reducer = (
  state: IDialogMessagesState = initialState,
  action
) => {
  switch (action.type) {
    case DialogMessagesTypes.Open:
      return {
        isOpen: true,
        messages: action.payload.messages,
        title: action.payload.title
      };
    case DialogMessagesTypes.Close:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
