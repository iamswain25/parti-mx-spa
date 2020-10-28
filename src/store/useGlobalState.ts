import { createGlobalState } from "react-hooks-global-state";
export const initialState = {
  loginModal: false,
  error: null,
  success: null,
  currentUser: undefined,
  groupId: "home",
  boardId: null,
  sort: 0,
  role: undefined,
  board: undefined,
};
interface GlobalType {
  success: any;
  groupId: string;
  boardId: string | null;
  error: any;
  role?: "organizer" | "member" | "user" | null;
  loginModal: boolean;
  currentUser?: firebase.User | null;
  sort: number;
  board?: {
    id: string;
    type: "suggestion" | "notice" | "event" | "vote";
  };
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
export function useBoard() {
  return useGlobalState("board");
}
