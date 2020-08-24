export function downloadFileDirectly(uri: string, name: string) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function (event) {
    const blob = xhr.response;
    return saveFile(blob, name);
  };
  xhr.open("GET", uri);
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
