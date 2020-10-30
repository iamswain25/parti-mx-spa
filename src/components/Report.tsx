import React from "react";
import { Button } from "@material-ui/core";
import { csvDownloadAll } from "../helpers/csvDownload";
import { useLocation } from "react-router-dom";

export default function Report() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const groupId = Number(params.get("group_id"));
  if (!groupId) return null;
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
