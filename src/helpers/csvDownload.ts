import { Parser, transforms } from "json2csv";
import { client } from "../config/ApolloSetup";
import { queryReportAll } from "../graphql/query";
// import { userGroupStatusList } from "./options";
// function getStatus(status: string) {
//   return userGroupStatusList.find((u) => u.value === status)?.label;
// }
export function csvDownloadAll(group_id: number) {
  client
    .query({ query: queryReportAll, variables: { group_id } })
    .then((result) => {
      const fields = [
        "title",
        "board.title",
        "created_at",
        "comments.body",
        "comments.user.name",
        "comments.user.email",
        "comments.user.groups[0].status",
        "comments.re.body",
        "comments.re.user.name",
        "comments.re.user.email",
        "comments.re.user.groups[0].status",
        "link",
      ];
      const opts = {
        fields,
        transforms: [
          transforms.unwind({
            paths: ["comments", "comments.re"],
            blankOut: true,
          }),
          // flatten(),
        ],
      };

      try {
        const parser = new Parser(opts);

        const posts = result.data?.mx_posts.map((p: any) => {
          return {
            ...p,
            link: "https://youthwagle.kr/post/" + p.id,
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
