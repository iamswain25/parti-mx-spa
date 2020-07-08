import SecureStorage from "../config/SecureStorage";
import createReducer from "../store/createReducer";
export const PERSIST_KEY = "coop-parti-demos";
export const initialState = {
  isInit: false,
  group_id: 34,
  user_id: null,
  loading: false,
  error: null,
};
export type State = typeof initialState;
export type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_GROUP"; group_id: number }
  | { type: "SET_USER"; user_id: number | null }
  | { type: "SET_ERROR"; error: any }
  | { type: "LOGOUT" };
function persistSecureStore(state: State, payload: any) {
  const jsonStr = JSON.stringify({ ...state, ...payload });
  SecureStorage.setItem(PERSIST_KEY, jsonStr);
  return { ...state, ...payload };
}
export const reducer = createReducer<State, Action>(initialState, {
  LOGOUT: function (state, payload) {
    return persistSecureStore(state, initialState);
  },
  SET_GROUP: persistSecureStore,
  SET_USER: persistSecureStore,
});
