import React from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../store/store";

export default function useParseGroupId() {
  const [{ isInit }, dispatch] = useStore();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const groupId = params.get("group_id");
  // console.log(groupId, search);
  React.useEffect(() => {
    if (groupId && isInit) {
      const group_id = Number(groupId);
      dispatch({ type: "SET_GROUP", group_id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, isInit]);
}
