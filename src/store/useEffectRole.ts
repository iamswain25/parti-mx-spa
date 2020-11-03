import React from "react";
import { firestore } from "../config/firebase";
import { useCurrentUser, useGroupId, useRole } from "./useGlobalState";
export default function useEffectRole() {
  const [role, setRole] = useRole();
  const [currentUser] = useCurrentUser();
  const [groupId] = useGroupId();
  React.useEffect(() => {
    if (currentUser) {
      return firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          setRole(doc.get("role") ?? "anonymous");
        });
    } else if (currentUser !== undefined) {
      setRole("anonymous");
    }
  }, [setRole, currentUser, groupId]);
  return [role];
}
