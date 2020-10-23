import React from "react";
import { useParams } from "react-router-dom";
import { useGroupId } from "./useGlobalState";
let counter = 0;
export default function useEffectGroupId() {
  const { group_id } = useParams<{ group_id: string }>();
  const groupState = useGroupId();
  React.useEffect(() => {
    console.log(counter++);
    if (group_id && group_id !== groupState[0]) {
      groupState[1](group_id);
    }
  }, [group_id, groupState]);
  return groupState;
}
