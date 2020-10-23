import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalState, keys } from "./useGlobalState";
export default function useGroupId() {
  const { group_id } = useParams<{ group_id: string }>();
  const groupState = useGlobalState(keys.GROUPID);
  React.useEffect(() => {
    if (group_id && group_id !== groupState[0]) {
      groupState[1](group_id);
    }
  }, [group_id, groupState]);
  return groupState;
}
