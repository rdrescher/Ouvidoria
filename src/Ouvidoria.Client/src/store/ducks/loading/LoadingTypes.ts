export enum LoadingTypes {
  SetLoading = "@Loading/SetLoading",
  SetLoaded = "@Loading/SetLoaded"
}

export interface ILoadingState {
  loading: boolean;
}