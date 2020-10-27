import { storage } from "../config/firebase";
import { File } from "../types";

export async function downloadFileDirectly(file: File) {
  const url = await storage.ref(file.path).getDownloadURL();
  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function () {
    const blob = xhr.response;
    return saveFile(blob, file.name);
  };
  xhr.open("GET", url);
  xhr.send();
}

export function saveFile(blob: Blob, filename: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
