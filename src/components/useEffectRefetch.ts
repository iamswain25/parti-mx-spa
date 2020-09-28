import React from "react";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function useEffectRefetch(refetch?: any) {
  const [obj, setRefetch] = useGlobalState(keys.REFETCH);
  React.useEffect(() => {
    refetch && refetch();
  }, [obj, refetch]);
  function getRefetch() {
    setRefetch({});
  }
  return getRefetch;
}
