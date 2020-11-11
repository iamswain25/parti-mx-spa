import React from "react";
import { Select, FormControl } from "@material-ui/core";
import { User } from "../types";
import { boardPermissionList } from "../helpers/options";
import { useGroupId } from "../store/useGlobalState";
import { firestore } from "../config/firebase";

export default function UserGroupStatus({ user }: { user: User }) {
  const { id, role } = user;
  const [groupId] = useGroupId();
  async function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const { value } = event.target;
    if (value !== role) {
      return firestore
        .collection("groups")
        .doc(groupId)
        .collection("users")
        .doc(id)
        .update({ role: value });
    }
  }
  return (
    <FormControl variant="outlined" margin="dense">
      <Select native defaultValue={role} onChange={handleChange}>
        {boardPermissionList.map((l, i) => (
          <option value={l.value} key={i}>
            {l.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
