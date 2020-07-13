import React from "react";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function useErrorEffect(error: any) {
  const [, setError] = useGlobalState(keys.ERROR);
  React.useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);
  return null;
}
