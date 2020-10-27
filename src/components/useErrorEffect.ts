import React from "react";
import { useError } from "../store/useGlobalState";
export default function useErrorEffect(error: any) {
  const [, setError] = useError();
  React.useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);
  return null;
}
