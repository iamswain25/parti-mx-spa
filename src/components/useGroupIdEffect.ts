import React from "react";
import { useStore } from "../store/store";
export default function useGroupIdEffect(id?: number) {
  const [{ group_id }, dispatch] = useStore();
  React.useEffect(() => {
    if (id && group_id !== id) {
      dispatch({ type: "SET_GROUP", group_id: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return null;
}
