import React from "react";
import { useRole } from "../store/useGlobalState";
import { UserStatus } from "../types";
export default function usePermEffect(perm?: any) {
  const [, setRole] = useRole();
  React.useEffect(() => {
    setRole(perm);
  }, [perm, setRole]);
  return null;
}
