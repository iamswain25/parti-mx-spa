import React from "react";
import { Button } from "@material-ui/core";
import {
  csvDownload2,
  csvDownload3,
  csvDownloadAll,
} from "../helpers/csvDownload";
import { useGroupId } from "../store/useGlobalState";
import firebase from "firebase";
export default function Report() {
  const [groupId] = useGroupId();
  const [date, setDate] = React.useState(
    new Date().toISOString().substr(0, 16)
  );
  const [limit, setLimit] = React.useState(1);
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setDate(event.target.value);
  }
  return (
    <section>
      <div>
        <div>
          start after
          <input type="datetime-local" value={date} onChange={changeHandler} />
        </div>
        <div>
          limit
          <input
            type="number"
            value={limit}
            onChange={(event) => {
              const value = event.target.value;
              const number = Number(value);
              if (number > 1000) {
                setLimit(1000);
              } else {
                setLimit(number);
              }
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const time = new Date(date);
            const seconds = time.getTime() / 1000;
            const startAfter = new firebase.firestore.Timestamp(seconds, 0);
            console.log(startAfter, limit);
            csvDownloadAll({
              group_id: groupId,
              startAfter,
              limit,
            });
          }}
        >
          가입회원 리스트 다운로드
        </Button>
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            csvDownload2({
              group_id: groupId,
              board_id: "aA7LUOKOSJ0fo6cHzy56",
            });
          }}
        >
          댓글, 좋아요, 통계 다운로드
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            csvDownload3({
              group_id: groupId,
              board_id: "aA7LUOKOSJ0fo6cHzy56",
            });
          }}
        >
          우수사례 전시 내용 이미지 빼고 텍스트
        </Button>
      </div>
    </section>
  );
}
