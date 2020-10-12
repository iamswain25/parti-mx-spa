import { Parser, transforms } from "json2csv";
import { client } from "../config/ApolloSetup";
import { queryReportAll } from "../graphql/query";
export function csvDownloadAll() {
  client.query({ query: queryReportAll }).then((result) => {
    const tagsStats = result.data?.mx_posts?.reduce((prev: any, curr: any) => {
      curr.tags.forEach((tag: string) => {
        prev[tag] ? prev[tag]++ : (prev[tag] = 1);
      });
      return prev;
    }, {});
    return console.log(tagsStats);
    const fields = [
      "id",
      "title",
      "created_at",
      "tags",
      "files.uri",
      "files.name",
      "files.type",
      "files.uploadDate",
      "metadata.address",
      "user.metadata.local",
      "user.metadata.region",
      "user.metadata.country",
      "user.email",
      "user.name",
    ];
    const opts = {
      fields,
      transforms: [
        transforms.unwind({ paths: ["files"], blankOut: true }),
        transforms.flatten(),
      ],
    };

    try {
      const parser = new Parser(opts);
      const csv = parser.parse(result.data?.mx_posts);
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
