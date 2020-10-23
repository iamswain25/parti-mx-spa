import { createGlobalState } from "react-hooks-global-state";
import { UserStatus } from "../types";
const initialState = {
  showLoginModal: false,
  error: null,
  success: null,
  currentUser: null,
  groupId: "home",
  sort: 0,
  permission: undefined,
  refetch: {},
  // loading: true,
};
interface GlobalType {
  success: any;
  groupId: string;
  error: any;
  permission: UserStatus;
  showLoginModal: boolean;
  currentUser: firebase.User | null;
  sort: number;
  refetch: object;
  // loading: boolean;
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
  USER = "currentUser",
}
export function useCurrentUser() {
  return useGlobalState("currentUser");
}
export function useGroupId() {
  return useGlobalState("groupId");
}
