import React from "react";
import { Select, FormControl } from "@material-ui/core";
import { UserGroup } from "../types";
import { userGroupStatusList } from "../helpers/options";

export default function UserGroupStatus({
  userGroup,
  update,
}: {
  userGroup: UserGroup;
  update: any;
}) {
  const { status } = userGroup;
  async function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    const { value } = event.target;
    const { group_id, user_id } = userGroup;
    await update({
      variables: { group_id, user_id, status: value },
    });
  }
  return (
    <FormControl variant="outlined" margin="dense">
      <Select native defaultValue={status} onChange={handleChange}>
        {userGroupStatusList.map((l, i) => (
          <option value={l.value} key={i}>
            {l.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
