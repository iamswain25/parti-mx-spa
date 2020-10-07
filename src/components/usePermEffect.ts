import React from "react";
import { useGlobalState, keys } from "../store/useGlobalState";
import { UserStatus } from "../types";
export default function usePermEffect(perm?: UserStatus) {
  const [p, setPerm] = useGlobalState(keys.PERMISSION);
  React.useEffect(() => {
    if (!perm) return;
    setPerm(perm);
  }, [perm, setPerm]);
  return p;
}
