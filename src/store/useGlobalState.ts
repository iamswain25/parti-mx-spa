import { createGlobalState } from "react-hooks-global-state";
import { UserStatus } from "../types";
const initialState = {
  showLoginModal: false,
  error: null,
  success: null,
  loading: true,
  sort: 0,
  permission: undefined,
};
interface GlobalType {
  success: any;
  error: any;
  permission: UserStatus;
  showLoginModal: boolean;
  loading: boolean;
  sort: number;
}
export const { useGlobalState } = createGlobalState<GlobalType>(initialState);
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
  PERMISSION = "permission",
}
