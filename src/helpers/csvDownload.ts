import { Parser } from "json2csv";
import { client } from "../config/ApolloSetup";
import { queryReportAll } from "../graphql/query";
export function csvDownloadAll(group_id: number) {
  client
    .query({ query: queryReportAll, variables: { group_id } })
    .then((result) => {
      const fields = [
        "id",
        "title",
        "board.title",
        "created_at",
        "user.email",
        "user.name",
        "link",
      ];
      const opts = {
        fields,
      };

      try {
        const parser = new Parser(opts);
        const posts = result.data?.mx_posts.map((p: any) => {
          return {
            ...p,
            link: "https://parti.mx/post/" + p.id,
            created_at: new Date(p.created_at).toLocaleString(),
          };
        });
        const csv = parser.parse(posts);
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
    });
}
