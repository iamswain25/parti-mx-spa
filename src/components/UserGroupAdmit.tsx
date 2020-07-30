import React from "react";
import { Button } from "@material-ui/core";
import { UserGroup } from "../types";

export default function UserGroupAdmit({
  userGroup,
  update,
}: {
  userGroup: UserGroup;
  update: any;
}) {
  const { group_id, user_id } = userGroup;
  function reject() {
    update({
      variables: { group_id, user_id, status: "exit" },
    });
  }
  function admit() {
    update({
      variables: { group_id, user_id, status: "participant" },
    });
  }
  return (
    <div
      style={{
        display: "grid",
        gridGap: "10px",
        gridAutoFlow: "column",
      }}
    >
      <Button
        disableElevation
        color="primary"
        variant="outlined"
        children="거절"
        onClick={reject}
      />
      <Button
        disableElevation
        color="primary"
        variant="contained"
        children="승인"
        onClick={admit}
      />
    </div>
  );
}
