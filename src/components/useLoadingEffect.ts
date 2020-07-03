import React from "react";
import { useStore } from "../store/store";
export default function useLoadingEffect(loading?: boolean) {
  const [, dispatch] = useStore();
  React.useEffect(() => {
    if (typeof loading === "boolean") {
      dispatch({ type: "SET_LOADING", loading });
    }
  }, [loading, dispatch]);
  return null;
}
