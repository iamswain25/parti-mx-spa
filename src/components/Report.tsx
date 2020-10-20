import React from "react";
import { Button } from "@material-ui/core";
import { csvDownloadAll } from "../helpers/csvDownload";
import { useStore } from "../store/store";

export default function Report() {
  const [{ group_id }] = useStore();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => csvDownloadAll(group_id)}
      >
        download csv
      </Button>
    </div>
  );
}
