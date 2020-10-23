import { createGlobalState } from "react-hooks-global-state";
import { UserStatus } from "../types";
const initialState = {
  showLoginModal: false,
  error: null,
  success: null,
  // loading: true,
  groupId: "home",
  sort: 0,
  permission: undefined,
  refetch: {},
};
interface GlobalType {
  success: any;
  groupId: string;
  error: any;
  permission: UserStatus;
  showLoginModal: boolean;
  // loading: boolean;
  sort: number;
  refetch: object;
}
export const { useGlobalState } = createGlobalState<GlobalType>(initialState);
export enum keys {
  SHOW_LOGIN_MODAL = "showLoginModal",
  ERROR = "error",
  // LOADING = "loading",
  SORT = "sort",
  SUCCESS = "success",
  PERMISSION = "permission",
  REFETCH = "refetch",
  GROUPID = "groupId",
}
