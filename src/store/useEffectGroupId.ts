import React from "react";
import { useParams } from "react-router-dom";
import { useGroupId } from "./useGlobalState";
export default function useEffectGroupId() {
  const { group_id } = useParams<{
    group_id: string;
  }>();
  const groupState = useGroupId();
  React.useEffect(() => {
    const [groupId, setGroupId] = groupState;
    if (group_id && group_id !== groupId) {
      setGroupId(group_id);
    }
  }, [groupState, group_id]);
  return groupState;
}
