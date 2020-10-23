import React from "react";
import { Button } from "@material-ui/core";
import { csvDownloadAll } from "../helpers/csvDownload";
import { useGroupId } from "../store/useGlobalState";
export default function Report() {
  const [groupId] = useGroupId();
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
