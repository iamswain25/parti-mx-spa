import { createGlobalState } from "react-hooks-global-state";
import { Board, Role } from "../types";
export const initialState = {
  loginModal: false,
  error: null,
  success: null,
  currentUser: undefined,
  groupId: "home",
  boardId: undefined,
  sort: 0,
  role: undefined,
  boards: undefined,
};
interface GlobalType {
  success: any;
  groupId: string;
  boardId?: string;
  error: any;
  role?: Role;
  loginModal: boolean;
  currentUser?: firebase.User | null;
  sort: number;
  boards?: Board[];
}
export const { useGlobalState } = createGlobalState<GlobalType>(initialState);
export enum keys {
  SHOW_LOGIN_MODAL = "loginModal",
  ERROR = "error",
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
export function useLoginModal() {
  return useGlobalState("loginModal");
}
export function useRole() {
  return useGlobalState("role");
}
export function useSort() {
  return useGlobalState("sort");
}
export function useBoards() {
  return useGlobalState("boards");
}
