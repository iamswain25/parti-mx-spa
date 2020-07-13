import React from "react";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function useLoadingEffect(loading?: boolean) {
  const [, setLoading] = useGlobalState(keys.LOADING);
  React.useEffect(() => {
    if (typeof loading === "boolean") {
      setLoading(loading);
    }
  }, [loading, setLoading]);
  return null;
}
