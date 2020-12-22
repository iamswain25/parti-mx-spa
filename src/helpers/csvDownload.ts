import { Parser } from "json2csv";
import { firestore } from "../config/firebase";
async function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}
export function csvDownloadAll({
  group_id,
  limit,
  startAfter,
}: {
  group_id: string;
  limit?: number;
  startAfter?: firebase.firestore.Timestamp;
}) {
  let query = firestore
    .collection("groups")
    .doc(group_id)
    .collection("users")
    .orderBy("created_at", "asc");
  if (startAfter) {
    query = query.startAfter(startAfter);
  }
  if (limit) {
    query = query.limit(limit);
  }
  query
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.id))
    .then((idArr) =>
      Promise.all(
        idArr.map(async (id, i) => {
          await delay(i * 10);
          return firestore.collection("users").doc(id).get();
        })
      )
    )
    .then((snapshots) =>
      snapshots.map((snapshot) => {
        const {
          created_at,
          updated_at,
          deleted_at,
          term_privacy,
          term_service,
          ...rest
        } = snapshot.data() as any;
        return {
          id: snapshot.id,
          created_at: created_at?.toDate()?.toISOString(),
          updated_at: updated_at?.toDate()?.toISOString(),
          deleted_at: deleted_at?.toDate()?.toISOString(),
          term_privacy: term_privacy?.toDate()?.toISOString(),
          term_service: term_service?.toDate()?.toISOString(),
          ...rest,
        };
      })
    )
    .then((result) => {
      const fields = [
        "id",
        "created_at",
        "updated_at",
        "email",
        "name",
        "photo_url",
        "deleted_at",
        "term_privacy",
        "term_service",
      ];
      const opts = {
        fields,
      };

      makeFile(opts, result);
    });
}
export function csvDownload2({
  group_id,
  board_id,
}: {
  group_id: string;
  board_id: string;
}) {
  let query = firestore
    .collection("posts")
    .where("group_id", "==", group_id)
    .where("board_id", "==", board_id);

  query
    .get()
    .then((snapshot) => snapshot.docs)
    .then((posts) =>
      Promise.all(
        posts.map(async (post) => {
          return {
            id: post.id,
            link: `https://eve.ggmaeul.or.kr/post/${post.id}`,
            ...post.data(),
          };
        })
      )
    )
    .then((result) => {
      const fields = [
        "id",
        "title",
        "body",
        "link",
        "count_like",
        "count_comment",
      ];
      const opts = {
        fields,
      };
      makeFile(opts, result);
    });
}

function makeFile(opts: any, result: any) {
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(result);
    var csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const exportFilename = new Date().toLocaleString() + ".csv";
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(csvData, exportFilename);
    } else {
      //In FF link must be added to DOM to be clicked
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(csvData);
      link.setAttribute("download", exportFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (err) {
    console.error(err);
  }
}
export function csvDownloadAllUsers({ group_id }: { group_id: string }) {
  let query = firestore
    .collection("users")
    .where("email", "!=", null)
    .orderBy("email", "asc");
  query
    .get()
    .then((snapshot) => snapshot.docs)
    .then((docs) =>
      docs.map((doc) => {
        const { created_at, name, area, address, email } = doc.data() as any;
        return {
          id: doc.id,
          created_at: created_at?.toDate()?.toISOString(),
          name,
          area,
          address,
          email,
        };
      })
    )
    .then((result) => {
      const fields = ["id", "created_at", "email", "name", "area", "address"];
      const opts = {
        fields,
      };

      makeFile(opts, result);
    });
}
