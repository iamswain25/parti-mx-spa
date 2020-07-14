import { createGlobalState } from "react-hooks-global-state";
const initialState = {
  showLoginModal: false,
  error: null,
  success: null,
  loading: true,
  sort: 0,
};
export const { useGlobalState } = createGlobalState<
  typeof initialState & { success: any; error: any }
>(initialState);
// const SHOW_LOGIN_MODAL = "showLoginModal";
// export const keys: { SHOW_LOGIN_MODAL: "showLoginModal" } = {
//   SHOW_LOGIN_MODAL,
// };
export enum keys {
  SHOW_LOGIN_MODAL = "showLoginModal",
  ERROR = "error",
  LOADING = "loading",
  SORT = "sort",
  SUCCESS = "success",
}
