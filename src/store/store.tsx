import React, { ComponentProps } from "react";
import SecureStorage from "../config/SecureStorage";
import { initialState, reducer, Action, State, PERSIST_KEY } from "./reducer";

export const StoreContext = React.createContext<
  [State, (input: Action) => void]
>([initialState, () => {}]);
export const StoreProvider = (props: ComponentProps<any>) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);
  async function init() {
    console.log("init");
    try {
      const storeJSON = await SecureStorage.getItem(PERSIST_KEY);
      console.log(storeJSON);
      if (storeJSON) {
        dispatch({
          type: "CHANGE_ALL",
          ...initialState,
          ...JSON.parse(storeJSON),
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
  }
  React.useEffect(() => {
    init();
  }, []);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => React.useContext(StoreContext);
