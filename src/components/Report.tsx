import React from "react";
import { Button } from "@material-ui/core";
import { csvDownload2 } from "../helpers/csvDownload";
import { useParams } from "react-router-dom";
export default function Report() {
  const { group_id, board_id } = useParams<{
    group_id: string;
    board_id: string;
  }>();

  return (
    <section>
      <div>
        <h2>댓글, 좋아요, 통계 다운로드</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            csvDownload2({
              group_id,
              board_id,
            });
          }}
        >
          download csv
        </Button>
      </div>
    </section>
  );
}
