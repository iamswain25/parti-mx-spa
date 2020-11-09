import React from "react";
import { firestore } from "../config/firebase";
import { Group } from "../types";
import { useGroupId } from "./useGlobalState";
export default function useGroup(): [Group] {
  const [groupId] = useGroupId();
  const [group, setGroup] = React.useState<Group>({} as Group);
  React.useEffect(() => {
    return firestore
      .collection("groups")
      .doc(groupId)
      .onSnapshot((doc) => {
        const item = { id: doc.id, ...(doc.data() as any) };
        setGroup(item);
      });
  }, [groupId]);
  return [group];
}
