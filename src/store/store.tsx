import React, { ComponentProps } from "react";
import SecureStorage from "../config/SecureStorage";
import { initialState, reducer, Action, State, PERSIST_KEY } from "./reducer";
import { auth, getUserId2 } from "../config/firebase";

export const StoreContext = React.createContext<
  [State, (input: Action) => void]
>([initialState, () => {}]);
function authCheck(dispatch: React.Dispatch<Action>) {
  let didInit = false;
  return new Promise((res) => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        return getUserId2(user).then((user_id) => {
          if (user_id) {
            if (didInit) {
              dispatch({ type: "SET_USER", user_id });
            }
            didInit = true;
            res(user_id);
          } else {
            res(null);
          }
        });
      } else {
        if (didInit) {
          dispatch({ type: "SET_USER", user_id: null });
        }
        didInit = true;
        res(null);
      }
    });
  });
}
export const StoreProvider = (props: ComponentProps<any>) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);
  const init = React.useCallback(async function init() {
    console.log("init store");
    try {
      const [storeJSON, user_id] = await Promise.all([
        SecureStorage.getItem(PERSIST_KEY),
        authCheck(dispatch),
      ]);
      console.log(storeJSON, user_id);
      if (storeJSON) {
        dispatch({
          type: "CHANGE_ALL",
          ...initialState,
          ...JSON.parse(storeJSON),
          user_id,
          group_id: 101,
          isInit: true,
          loading: false,
        });
      } else {
        const data = JSON.stringify(initialState);
        console.log(data);
        SecureStorage.setItem(PERSIST_KEY, data);
        dispatch({
          type: "CHANGE_ALL",
          ...initialState,
          isInit: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => React.useContext(StoreContext);
