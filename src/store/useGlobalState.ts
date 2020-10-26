import { createGlobalState } from "react-hooks-global-state";
import { UserStatus } from "../types";
export const initialState = {
  showLoginModal: false,
  error: null,
  success: null,
  currentUser: undefined,
  groupId: "home",
  boardId: null,
  sort: 0,
  permission: undefined,
  refetch: {},
  // loading: true,
};
interface GlobalType {
  success: any;
  groupId: string;
  boardId: string | null;
  error: any;
  permission: UserStatus;
  showLoginModal: boolean;
  currentUser: firebase.User | null | undefined;
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
  BOARDID = "boardId",
  USER = "currentUser",
}
export function useCurrentUser() {
  return useGlobalState("currentUser");
}
export function useGroupId() {
  return useGlobalState("groupId");
}
export function useBoardId() {
  return useGlobalState("boardId");
}
export function useSuccess() {
  return useGlobalState("success");
}
export function useError() {
  return useGlobalState("error");
}
