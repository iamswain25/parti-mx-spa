import SecureStorage from "../config/SecureStorage";
import createReducer from "../store/createReducer";
export const PERSIST_KEY = "seoul-city-architecture";
export const initialState = {
  isInit: false,
  group_id: 1,
  // group_title: null,
  user_id: null,
};
export type State = typeof initialState;
export type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_GROUP"; group_id: number }
  // | { type: "SET_GROUP_AND_TITLE"; group_id: number; group_title: string }
  | { type: "SET_USER"; user_id: number | null }
  | { type: "LOGOUT" };
function persistSecureStore(state: State, payload: any) {
  const newState = { ...state, ...payload };
  const { group_id } = newState;
  const jsonStr = JSON.stringify({ group_id });
  SecureStorage.setItem(PERSIST_KEY, jsonStr);
  return newState;
}
export const reducer = createReducer<State, Action>(initialState, {
  LOGOUT: function (state, payload) {
    SecureStorage.removeItem(PERSIST_KEY);
    return initialState;
  },
  SET_GROUP: persistSecureStore,
  // SET_GROUP_AND_TITLE: persistSecureStore,
});
