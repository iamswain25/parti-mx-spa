import SecureStorage from "../config/SecureStorage";
import createReducer from "../store/createReducer";
export const PERSIST_KEY = "coop-parti-demos";
export const initialState = {
  isInit: false,
  group_id: null,
  board_id: null,
  user_id: null,
  loading: false,
};
export type State = typeof initialState;
export type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_GROUP"; group_id: number }
  | { type: "SET_USER"; user_id: number | null }
  | { type: "LOGOUT" }
  | { type: "APP_UPDATE" }
  | { type: "APP_REFRESH" };
function persistSecureStore(state: State, payload: any) {
  const jsonStr = JSON.stringify({ ...state, ...payload });
  SecureStorage.setItem(PERSIST_KEY, jsonStr);
  return { ...state, ...payload };
}
export const reducer = createReducer<State, Action>(initialState, {
  ["APP_REFRESH"]: function (state, payload) {
    SecureStorage.removeItem(PERSIST_KEY);
    return initialState;
  },
  ["APP_UPDATE"]: function (state, payload) {
    SecureStorage.removeItem(PERSIST_KEY);
    return { ...initialState, loading: true };
  },
  ["LOGOUT"]: function (state, payload) {
    return persistSecureStore(state, initialState);
  },
  ["SET_GROUP"]: persistSecureStore,
  ["SET_USER"]: persistSecureStore,
});
