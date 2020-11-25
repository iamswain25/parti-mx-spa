import React from "react";
import { storage } from "../config/firebase";

export default function useStoragePath(path?: string) {
  const [url, setUrl] = React.useState<string | undefined>();
  React.useEffect(() => {
    // console.log(path);
    if (path) {
      console.log(path);
      if (
        path?.startsWith("/") ||
        path?.startsWith("blob:") ||
        path?.startsWith("https://") ||
        path?.startsWith("http://") ||
        path?.startsWith("data:image/")
      ) {
        setUrl(path);
      } else {
        storage.ref(path).getDownloadURL().then(setUrl);
      }
    }
  }, [path, setUrl]);
  return url;
}
