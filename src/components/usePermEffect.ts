import React from "react";
import { usePermission } from "../store/useGlobalState";
import { UserStatus } from "../types";
export default function usePermEffect(perm?: UserStatus) {
  const [, setPerm] = usePermission();
  React.useEffect(() => {
    setPerm(perm);
  }, [perm, setPerm]);
  return null;
}
