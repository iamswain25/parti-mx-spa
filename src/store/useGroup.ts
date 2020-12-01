import React from "react";
import { firestore } from "../config/firebase";
import { Group } from "../types";
import { useGroupId } from "./useGlobalState";
export default function useGroup(): [Group | undefined | null] {
  const [groupId] = useGroupId();
  const [group, setGroup] = React.useState<Group | undefined | null>(undefined);
  React.useEffect(() => {
    return firestore
      .collection("groups")
      .doc(groupId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const item = { id: doc.id, ...(doc.data() as any) };
            setGroup(item);
          } else {
            setGroup(null);
          }
        },
        (error) => {
          console.warn("useGroup", error);
        }
      );
  }, [groupId]);
  return [group];
}
