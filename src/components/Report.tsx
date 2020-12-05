import React from "react";
import { Button } from "@material-ui/core";
import { csvDownloadAll } from "../helpers/csvDownload";
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
    <div>
      <h1>가입회원 리스트 다운로드</h1>
      <div>
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
          download csv
        </Button>
      </div>
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
    </div>
  );
}
