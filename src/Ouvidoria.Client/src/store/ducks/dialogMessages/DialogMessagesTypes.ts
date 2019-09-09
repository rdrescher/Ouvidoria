export enum DialogMessagesTypes {
  Open = "@dialogMessages/Open",
  Close = "@dialogMessages/Close"
}

export interface IDialogMessagesState {
  readonly isOpen: boolean;
  readonly title: string;
  readonly messages: string[];
}
