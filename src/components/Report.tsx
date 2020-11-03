import React from "react";
import { Button } from "@material-ui/core";
import { csvDownloadAll } from "../helpers/csvDownload";
import { useParams } from "react-router-dom";

export default function Report() {
  const { group_id } = useParams<{ group_id: string }>();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => csvDownloadAll(Number(group_id))}
      >
        download csv
      </Button>
    </div>
  );
}
