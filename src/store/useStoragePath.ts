import React from "react";
import { storage } from "../config/firebase";

export default function useStoragePath(path?: string) {
  const [url, setUrl] = React.useState<string | undefined>();
  React.useEffect(() => {
    // console.log(path);
    if (path) {
      if (path?.startsWith("/") || path?.startsWith("blob:")) {
        setUrl(path);
      } else {
        storage.ref(path).getDownloadURL().then(setUrl);
      }
    }
  }, [path, setUrl]);
  return url;
}
