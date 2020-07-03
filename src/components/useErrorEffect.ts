import React from "react";
import { useStore } from "../store/store";
export default function useErrorEffect(error: any) {
  const [, dispatch] = useStore();
  React.useEffect(() => {
    if (error) {
      dispatch({ type: "SET_ERROR", error });
    }
  }, [error, dispatch]);
  return null;
}
