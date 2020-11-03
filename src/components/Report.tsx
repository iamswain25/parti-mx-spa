import React from "react";
import { Button } from "@material-ui/core";
import { csvDownloadAll } from "../helpers/csvDownload";
import { useParams } from "react-router-dom";
import useGroupIdEffect from "./useGroupIdEffect";

export default function Report() {
  const { group_id } = useParams<{ group_id: string }>();
  const groupId = Number(group_id);
  useGroupIdEffect(groupId);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => csvDownloadAll(groupId)}
      >
        download csv
      </Button>
    </div>
  );
}
