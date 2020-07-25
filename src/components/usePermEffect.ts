import React from "react";
import { useGlobalState, keys } from "../store/useGlobalState";
import { UserStatus } from "../types";
export default function usePermEffect(perm?: UserStatus) {
  const [, setPerm] = useGlobalState(keys.PERMISSION);
  React.useEffect(() => {
    setPerm(perm);
  }, [perm, setPerm]);
  return null;
}
