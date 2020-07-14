import { createGlobalState } from "react-hooks-global-state";
const initialState = {
  showLoginModal: false,
  error: null,
  loading: true,
  sort: 0,
};
export const { useGlobalState } = createGlobalState(initialState);
// const SHOW_LOGIN_MODAL = "showLoginModal";
// export const keys: { SHOW_LOGIN_MODAL: "showLoginModal" } = {
//   SHOW_LOGIN_MODAL,
// };
export enum keys {
  SHOW_LOGIN_MODAL = "showLoginModal",
  ERROR = "error",
  LOADING = "loading",
  SORT = "sort",
}
